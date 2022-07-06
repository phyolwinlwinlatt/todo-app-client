import { configureStore } from "@reduxjs/toolkit";
//reducers
import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import todoStatusReducer from "./slices/todoStatusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    status: todoStatusReducer,
  },
});
