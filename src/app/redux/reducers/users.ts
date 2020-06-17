import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    AUTHENTICATION_FAILED,
} from '../actions/types';

export interface User {
    authenticated: boolean;
    credentials: object;
    loading: boolean;
}

const initialState: any = {
    authenticated: false,
    user: {},
    loading: false,
    authError: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                user: {userName: action.payload.userName},
                authenticated: true,
                authError: null
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case AUTHENTICATION_FAILED:
            return {
                ...state,
                authenticated: false,
                authError: action.payload.error
            }
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload,
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
