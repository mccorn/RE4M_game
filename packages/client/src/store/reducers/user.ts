/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
}

const initialState = null as UserState | null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, { payload }: { payload: UserState }) => ({
            ...payload,
        }),
        signOut: () => null,
    },
});

export const { signIn } = userSlice.actions;
export const userReducer = userSlice.reducer;
