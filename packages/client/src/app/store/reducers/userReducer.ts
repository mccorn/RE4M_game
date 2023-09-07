/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
    login: string;
    avatar: string | null;
    email: string;
}

const initialState = null as UserState | null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, { payload }: { payload: UserState }) => payload,
        signOut: () => null,
    },
});

export const { signIn, signOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
