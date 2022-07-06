import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//api
import { filterTodos, getAllTodos } from "../api/todo";
//components
import AddToDo from "../components/todo/AddToDo";
import TodoList from "../components/todo/TodoList";
//icons
import { PlusCircleIcon } from "../icons";
//store
import { setTodoStatus } from "../store/slices/todoStatusSlice";
import { setUser } from "../store/slices/userSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenAddToDo, setIsOpenAddToDo] = useState(false);
  const [todos, setTodos] = useState([]);
  //store
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.status);

  const fetchAllTodos = async () => {
    try {
      const {
        data: { success, data },
      } = await getAllTodos();
      if (success) {
        setTodos(data);
      }
    } catch (error) {}
  };

  const fetchFilteredTodos = async () => {
    try {
      const params = {
        complete: status === "complete",
      };
      const {
        data: { success, data },
      } = await filterTodos(params);
      if (success) {
        setTodos(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      navigate("signin");
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (status === "all") {
        fetchAllTodos();
      } else {
        fetchFilteredTodos();
      }
    }
  }, [status]);

  if (!user) return null;

  return (
    <div className="h-screen max-h-screen bg-main-pink bg-opacity-70">
      <div className="max-w-7xl mx-auto h-full flex flex-col space-y-4 max-h-screen bg-main-black">
        <div className="bg-main-black-opacity h-12 px-4 shadow-md flex items-center justify-between">
          <h1 className="text-main-pink-hover font-bold drop-shadow-sm uppercase">
            Todo App
          </h1>
          <button
            onClick={() => {
              dispatch(setUser(null));
              navigate("/signin");
            }}
            className="ml-auto mr-4 focus:ring-0 focus:outline-none underline text-white"
          >
            Sign Out
          </button>
          <div className="w-8 h-8 rounded-full bg-white text-main-pink flex items-center justify-center border border-main-black border-opacity-30">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>
        <div className="flex-1 flex flex-col space-y-4 overflow-hidden w-full mx-auto max-w-4xl">
          <div className="py-3 text-white flex items-center space-x-2">
            {/* <input
              type="date"
              name="date"
              id="date"
              className="bg-main-black cursor-pointer rounded-md border border-main-black-opacity ring-1 ring-main-black-opacity focus:ring-0 focus:outline-none"
            /> */}
            <div className="border-2 border-main-black-opacity px-4 py-2 space-x-3 flex items-center rounded-md cursor-pointer">
              <input
                id="all"
                type="radio"
                name="types"
                checked={status === "all"}
                value="all"
                onChange={(e) => dispatch(setTodoStatus(e.target.value))}
                className="ring-0 focus:ring-0 focus:outline-none bg-main-pink text-main-pink cursor-pointer"
              />
              <label htmlFor="all" className="cursor-pointer">
                All
              </label>
            </div>
            <div className="border-2 border-main-black-opacity px-4 py-2 space-x-3 flex items-center rounded-md cursor-pointer">
              <input
                id="completed"
                type="radio"
                name="types"
                checked={status === "complete"}
                value="complete"
                onChange={(e) => dispatch(setTodoStatus(e.target.value))}
                className="ring-0 focus:ring-0 focus:outline-none outline-none bg-main-pink text-main-pink cursor-pointer"
              />
              <label htmlFor="completed" className="cursor-pointer">
                Completed
              </label>
            </div>
            <div className="border-2 border-main-black-opacity px-4 py-2 space-x-3 flex items-center rounded-md cursor-pointer">
              <input
                id="uncomplete"
                type="radio"
                name="types"
                checked={status === "uncomplete"}
                value="uncomplete"
                onChange={(e) => dispatch(setTodoStatus(e.target.value))}
                className="ring-0 focus:ring-0 focus:outline-none outline-none bg-main-pink text-main-pink cursor-pointer"
              />
              <label htmlFor="uncomplete" className="cursor-pointer">
                Uncomplete
              </label>
            </div>
          </div>
          <button
            onClick={() => setIsOpenAddToDo(true)}
            className="px-4 py-3 rounded-lg shadow-lg border-2 border-main-black-opacity text-white flex items-center space-x-2 focus:ring-0 focus:outline-none"
          >
            <PlusCircleIcon className="h-5 w-5 text-main-pink" />
            <span className="text-sm font-normal">Add a Task</span>
          </button>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <TodoList
              todos={todos}
              fetchAllTodos={fetchAllTodos}
              fetchFilteredTodos={fetchFilteredTodos}
            />
          </div>
        </div>
      </div>
      <AddToDo
        isOpen={isOpenAddToDo}
        setIsOpen={setIsOpenAddToDo}
        fetchAllTodos={fetchAllTodos}
        fetchFilteredTodos={fetchFilteredTodos}
      />
    </div>
  );
}
