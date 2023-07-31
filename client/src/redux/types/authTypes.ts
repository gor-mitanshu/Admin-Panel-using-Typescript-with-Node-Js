export const enum AuthActionTypes {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILURE = "GET_USER_FAILURE",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE",
}
export interface User {
  _id?: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role?: string;
  createdAt?: any;
  updatedAt?: any;
}
export interface AuthState {
  token: string | null;
  error: string | null;
}

export interface UserState {
  user: User | null;
  error: string | null;
}
