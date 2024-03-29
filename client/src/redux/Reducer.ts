import { AuthActionTypes, AuthState, UserState } from "./types/authTypes";

const initialLoginState: AuthState = {
  token: null,
  error: null,
};
export const LoginAuthReducer = (
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

const initialUserState: UserState = {
  user: null,
  error: null,
};

export const UserReducer = (
  state = initialUserState,
  action: any
): UserState => {
  switch (action.type) {
    case AuthActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case AuthActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case AuthActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case AuthActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
