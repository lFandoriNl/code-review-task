import { combineReducers } from "redux";
import todosReducer from "./modules/TodoList/store";

export const rootReducer = combineReducers({
  todosReducer,
});
