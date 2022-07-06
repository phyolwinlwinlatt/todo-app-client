import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
};
const todoStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setTodoStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setTodoStatus } = todoStatusSlice.actions;
export default todoStatusSlice.reducer;
