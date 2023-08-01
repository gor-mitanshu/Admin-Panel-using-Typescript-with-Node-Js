import { combineReducers } from "redux";
import { AuthState, UserState } from "./types/authTypes";
import { LoginAuthReducer, UserReducer } from "../redux/Reducer";

export interface RootState {
  LoginAuthReducer: AuthState;
  UserReducer: UserState;
}

const rootReducer = combineReducers({
  LoginAuthReducer,
  UserReducer,
});

export default rootReducer;
