import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
//api
import { deleteTodo, updateTodo } from "../../api/todo";
//icons
import { DeleteIcon } from "../../icons";
//store
import { setShowSuccessAlert } from "../../store/slices/alertSlice";

export default function TodoItem({ todo, fetchAllTodos, fetchFilteredTodos }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.status);

  const deleteItem = async (id) => {
    try {
      const { status } = await deleteTodo(id);
      if (status === 204) {
        dispatch(
          setShowSuccessAlert({
            isShowAlert: true,
            successMessage: "Delete Success!",
            alertType: "success",
          })
        );
        if (status === "all") {
          fetchAllTodos();
        } else {
          fetchFilteredTodos();
        }
      }
    } catch (error) {}
  };

  const toggleComplete = async (value) => {
    const body = {
      complete: value,
    };
    const {
      data: { success },
    } = await updateTodo(todo._id, body);
    if (success) {
      if (status === "all") {
        fetchAllTodos();
      } else {
        fetchFilteredTodos();
      }
    }
  };

  return (
    <div className="rounded-lg bg-main-black-opacity border-none py-3 px-4 text-white flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={todo.complete}
        value={todo.complete}
        onChange={(e) => toggleComplete(!todo.complete)}
        className="mr-3 ring-0 focus:ring-0 focus:outline-none bg-main-pink text-main-pink rounded-sm cursor-pointer"
      />
      <div>
        <label>{todo.title}</label>
        <p className="text-xs font-light text-yellow-600">
          {moment(todo.date).format("DD-MM-YYYY")}
        </p>
      </div>
      <button
        onClick={() => deleteItem(todo._id)}
        className="ml-auto focus:ring-0 focus:outline-none"
      >
        <DeleteIcon className="h-5 w-5 text-red-600" />
      </button>
    </div>
  );
}
