import axios from "axios";
import { store } from "../store/index";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const service = axios.create({
  baseURL: serverUrl,
  "Content-Type": "application/json",
});

service.interceptors.request.use((config) => {
  config.headers = {
    "Content-Type": "application/json",
    userId: store.getState().user.user?._id,
  };
  return config;
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response) {
      const {
        data: { message },
      } = error.response;
      store.dispatch({
        type: "alert/setShowFailAlert",
        payload: {
          isShowAlert: true,
          failMessage: message,
          alertType: "fail",
        },
      });
      return Promise.reject(error);
    }
  }
);

export default service;
