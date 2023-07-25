import { AuthActionTypes } from "./types/authTypes";
import { combineReducers } from "redux";

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialLoginState = {
  token: localStorage.getItem("auth"),
  error: null,
};
const LoginAuthReducer = (
  state = initialLoginState,
  action: any
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  LoginAuthReducer,
});
export default rootReducer;
