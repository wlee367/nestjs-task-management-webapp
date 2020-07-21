import { combineReducers } from "redux";
import { todosReducer } from "./todos";
import userReducer from "./users";
import { activityReducer } from "./activity";

export interface StoreState {
  todos: any;
  user: any;
  userActivity: any;
}

export const reducers = combineReducers<StoreState | any>({
  todos: todosReducer,
  user: userReducer,
  userActivity: activityReducer,
});
