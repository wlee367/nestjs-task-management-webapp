import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import PostsService from "../api/TasksService";

export interface Todo {
  title: string;
  description: string;
  id: string;
  status: string;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface FetchTodoByIdAction {
  type: ActionTypes.fetchTodoById;
  payload: Todo;
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export interface MoveTodoAction {
  type: ActionTypes.moveTodos;
  todos: object;
  columns: object;
}

export interface CreateTodoAction {
  type: ActionTypes.createTodo;
  title: string;
  description: string;
  id: string;
  status: string;
}

export interface ToggleModalAction {
  type: ActionTypes.toggleModal;
}

let PostService = new PostsService();

export const createTodo = (title: string, description: string) => {
  return async (dispatch: Dispatch) => {
    PostService.createTask(title, description).then((response) => {
      const data = response.data;
      const description = data.description;
      const id = data.id;
      const status = data.status;
      const title = data.title;

      dispatch<CreateTodoAction>({
        type: ActionTypes.createTodo,
        title: title,
        status: status,
        id: id,
        description: description,
      });
    });
  };
};

export const moveTodo = (
  todos: object,
  columns: object,
  shouldSaveToDb: boolean,
  destinationId: string,
  itemId: string
) => {
  return async (dispatch: Dispatch) => {
    // if shouldSaveToDb is true - fire off an api to update
    if (shouldSaveToDb) {
      PostService.updateTask(itemId, destinationId).then((response) => {
        dispatch<MoveTodoAction>({
          type: ActionTypes.moveTodos,
          todos: todos,
          columns: columns,
        });
      });
    } else {
      dispatch<MoveTodoAction>({
        type: ActionTypes.moveTodos,
        todos: todos,
        columns: columns,
      });
    }
  };
};

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    PostService.getAllTasks().then((response) => {
      dispatch<FetchTodosAction>({
        type: ActionTypes.fetchTodos,
        payload: response.data,
      });
    });
  };
};

export const fetchTodoById = (taskId: string) => {
  return async (dispatch: Dispatch) => {
    PostService.getTaskById(taskId).then((response) => {
      dispatch<FetchTodoByIdAction>({
        type: ActionTypes.fetchTodoById,
        payload: response.data,
      });
    });
  };
};

export const ToggleModal = () => {
  return {
    type: ActionTypes.toggleModal,
  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id,
  };
};
