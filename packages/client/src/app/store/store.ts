import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { gameReducer } from './slices/gameSlice';

export const reducer = { user: userReducer, game: gameReducer };

declare global {
    interface Window {
        __PRELOADED_STATE__?: object;
    }
}

export const store = configureStore({
    reducer,
    // eslint-disable-next-line no-underscore-dangle
    preloadedState: window.__PRELOADED_STATE__,
});

// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
