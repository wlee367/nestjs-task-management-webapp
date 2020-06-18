import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes, Action } from './types';
import PostsService from '../api/TasksService';
import { stringify } from 'querystring';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface FetchTodosAction {
    type: ActionTypes.fetchTodos;
    payload: Todo[];
}

export interface DeleteTodoAction {
    type: ActionTypes.deleteTodo;
    payload: number;
}

export interface MoveTodoAction {
    type: ActionTypes.moveTodos;
    todos: object,
    columns: object
}

export interface CreateTodoAction {
    type: ActionTypes.createTodo;
    title: string,
    description: string,
    id: string, 
    status: string,
}

const url = 'http://jsonplaceholder.typicode.com/todos';

let PostService = new PostsService();

export const createTodo = (title: string, description: string) => {
    return async(dispatch: Dispatch) => {
        PostService.createTask(title, description).then((response) => {
            console.log(response)
            const data = response.data;
            const description = data.description
            const id = data.id;
            const status = data.status;
            const title = data.title;
        
            dispatch<CreateTodoAction>({
                type: ActionTypes.createTodo,
                title: title,
                status: status,
                id: id,
                description: description
            })
        })
    }
}

export const moveTodo = (todos: object, columns: object, shouldSaveToDb: boolean) => {
    return async(dispatch: Dispatch) => {

        // if shouldSaveToDb is true - fire off an api to update
        

        dispatch<MoveTodoAction>({
            type: ActionTypes.moveTodos,
            todos: todos,
            columns: columns,
        })
    }
}

export const fetchTodos = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<Todo[]>(url);

        dispatch<FetchTodosAction>({
            type: ActionTypes.fetchTodos,
            payload: response.data,
        });
    };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id,
    };
};
