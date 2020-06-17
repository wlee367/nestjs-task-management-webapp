import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import userReducer from './users';

export interface StoreState {
    todos: any;
    user: any;
}

export const reducers = combineReducers<StoreState|any>({
    todos: todosReducer,
    user: userReducer,
});
