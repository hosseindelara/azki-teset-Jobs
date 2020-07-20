import { combineReducers } from "redux";
import { LoginReducer } from "./LoginReducer";
import { FromState } from "./StateForm";
import { usenameReducer } from "./UserName";

export const reducers = combineReducers({
    login: LoginReducer,
    State: FromState,
    username: usenameReducer
})