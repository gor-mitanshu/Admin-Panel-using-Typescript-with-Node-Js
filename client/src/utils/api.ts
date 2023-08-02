import axios from "axios";
import { logout } from "redux/Action";
import { store } from "redux/Store";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch<any>(logout());
      //  window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
