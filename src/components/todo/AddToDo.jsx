import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
//api
import { addTodo } from "../../api/todo";
//shared
import SharedDialog from "../../shared/Dialog";
//store
import { setShowSuccessAlert } from "../../store/slices/alertSlice";

export default function AddToDo({
  isOpen,
  setIsOpen,
  fetchAllTodos,
  fetchFilteredTodos,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  //store
  const { status } = useSelector((state) => state.status);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        title,
        date: moment(date).format("MM-DD-YYYY"),
      };
      const {
        data: { success },
      } = await addTodo(body);
      if (success) {
        dispatch(
          setShowSuccessAlert({
            isShowAlert: true,
            successMessage: "Create Success!",
            alertType: "success",
          })
        );
        if (status === "all") {
          fetchAllTodos();
        } else {
          fetchFilteredTodos();
        }
      }
    } catch (error) {
    } finally {
      setIsOpen(false);
      setTitle("");
      setDate(moment(new Date()).format("YYYY-MM-DD"));
    }
  };

  return (
    <SharedDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add New Todo Item"
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm text-black font-normal">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
            className="w-full bg-main-black bg-opacity-20 px-4 py-1 border-none focus:ring-0 focus:outline-none rounded-sm caret-black text-black"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="date" className="text-sm text-black font-normal">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) =>
              moment(setDate(e.target.value)).format("YYYY-MM-DD")
            }
            autoComplete="off"
            className="w-full bg-main-black bg-opacity-20 py-1 border-none focus:ring-0 focus:outline-none rounded-sm caret-black text-black"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 mt-8 text-black bg-main-black bg-opacity-20 inline-flex items-center justify-center rounded-sm px-5 py-3 text-xs space-x-2 focus:outline-none focus:ring-0"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 mt-8 bg-main-pink hover:bg-main-pink-hover inline-flex items-center justify-center rounded-sm px-5 py-3 text-xs space-x-2 focus:outline-none focus:ring-0"
          >
            Add New Item
          </button>
        </div>
      </form>
    </SharedDialog>
  );
}
