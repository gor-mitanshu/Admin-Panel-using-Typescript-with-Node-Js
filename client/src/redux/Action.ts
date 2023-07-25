import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionTypes } from "./types/authTypes";

interface LoginRequestPayload {
  email: string;
  password: string;
}

export const login =
  (payload: LoginRequestPayload) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:9558/api/login",
        payload
      );
      console.log(response);
      const { token } = response.data.result;
      localStorage.setItem("auth", token);
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: token });
    } catch (error: any) {
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("auth");
  dispatch({ type: AuthActionTypes.LOGOUT });
};
