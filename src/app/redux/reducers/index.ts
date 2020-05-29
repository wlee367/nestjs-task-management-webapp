import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import userReducer from './users';
import { Todo } from '../actions';

export interface StoreState {
    todos: Todo[];
    user: any;
}

export const reducers = combineReducers<StoreState>({
    todos: todosReducer,
    user: userReducer,
});
