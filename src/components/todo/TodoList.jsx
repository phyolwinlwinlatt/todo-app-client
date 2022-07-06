import TodoItem from "./TodoItem";

export default function TodoList({ todos, fetchFilteredTodos, fetchAllTodos }) {
  return (
    <div className="space-y-2">
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={index}
          fetchFilteredTodos={fetchFilteredTodos}
          fetchAllTodos={fetchAllTodos}
        />
      ))}
    </div>
  );
}
