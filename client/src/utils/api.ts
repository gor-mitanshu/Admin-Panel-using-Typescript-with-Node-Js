import axios from "axios";
import { logout } from "redux/Action";
import { store } from "redux/Store";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === "Token has Expired" ||
        error.response.data.message === "Invalid token specified" ||
        error.message === "Invalid token specified" ||
        error.response.data.message === "InvalidTokenError")
    ) {
      store.dispatch<any>(logout());
    }
  }
);

export default api;
