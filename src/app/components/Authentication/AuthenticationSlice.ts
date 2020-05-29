import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';

interface AuthenticationState {
    username: string | null;
}

const initialState: AuthenticationState = {
    username: null,
};

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<AuthenticationState>) => {
            state.username = action.payload.username;
        },
        clearUserName: (state) => {
            state.username = null;
        },
    },
});

export const { setUserName, clearUserName } = slice.actions;

export const loginUser = (username: string, password: any): AppThunk => (
    dispatch
) => {};
