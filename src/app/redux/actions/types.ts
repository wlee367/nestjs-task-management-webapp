import {
  FetchTodosAction,
  DeleteTodoAction,
  MoveTodoAction,
  CreateTodoAction,
  FetchTodoByIdAction,
  ToggleModalAction,
} from "./todos";
import { FetchActivityAction } from "./activity";
import { CreateCommentAction } from "./comment";

export enum ActionTypes {
  fetchTodos,
  deleteTodo,
  moveTodos,
  createTodo,
  fetchTodoById,
  toggleModal,
}

export type Action =
  | FetchTodosAction
  | DeleteTodoAction
  | MoveTodoAction
  | CreateTodoAction
  | FetchTodoByIdAction
  | ToggleModalAction
  | CreateCommentAction;

export type ActivityAction = FetchActivityAction;

//user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = `SET_UNAUTHENTICATED`;
export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";
//UI reducer types
export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
