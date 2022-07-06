import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowAlert: false,
  alertMessage: "",
  alertType: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowSuccessAlert: (state, action) => {
      const { isShowAlert, successMessage, alertType } = action.payload;
      state.isShowAlert = isShowAlert;
      state.alertMessage = successMessage;
      state.alertType = alertType;
    },
    setShowFailAlert: (state, action) => {
      const { isShowAlert, failMessage, alertType } = action.payload;
      state.isShowAlert = isShowAlert;
      state.alertMessage = failMessage;
      state.alertType = alertType;
    },
    resetAlert: (state) => {
      state.isShowAlert = false;
      state.alertMessage = "";
    },
  },
});

export const { setShowSuccessAlert, setShowFailAlert, resetAlert } =
  alertSlice.actions;
export default alertSlice.reducer;
