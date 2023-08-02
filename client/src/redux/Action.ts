import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionTypes, User } from "./types/authTypes";
import api from "utils/api";

interface LoginRequestPayload {
  email: string;
  password: string;
}

export const login =
  (payload: LoginRequestPayload) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/login`,
        payload
      );
      const { token } = response.data.result;
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: token });
      return response;
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error.response.data.message,
      });
      throw error;
    }
  };

export const getUser = () => async (dispatch: Dispatch, getState: any) => {
  try {
    const token = getState().LoginAuthReducer.token;
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await api.get(`${process.env.REACT_APP_API}/api/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (
      !!response &&
      !!response.data.success === true &&
      response.status === 200
    ) {
      dispatch({
        type: AuthActionTypes.GET_USER_SUCCESS,
        payload: response.data.user,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: AuthActionTypes.GET_USER_FAILURE,
      payload: "Error fetching user data.",
    });
  }
};

export const updateUser =
  (updatedUserData: User) => async (dispatch: Dispatch, getState: any) => {
    try {
      const token = getState().LoginAuthReducer.token;
      if (!token) {
        throw new Error("Token not found");
      }
      await api.put(
        `${process.env.REACT_APP_API}/api/updateuser/${updatedUserData._id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: AuthActionTypes.UPDATE_USER_SUCCESS,
        payload: updatedUserData,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: AuthActionTypes.UPDATE_USER_FAILURE,
        payload: "Error updating user data.",
      });
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT });
};
