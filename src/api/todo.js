import service from "./service";

export const getAllTodos = () =>
  service({
    method: "GET",
    url: `todos`,
  });

export const filterTodos = (params) =>
  service({
    method: "GET",
    url: `todos`,
    params: params,
  });

export const addTodo = (body) =>
  service({
    method: "POST",
    url: `todos`,
    data: JSON.stringify(body),
  });

export const updateTodo = (todoId, body) =>
  service({
    method: "PUT",
    url: `todos/${todoId}`,
    data: JSON.stringify(body),
  });

export const deleteTodo = (todoId) =>
  service({
    method: "DELETE",
    url: `todos/${todoId}`,
  });
