import React from 'react';
import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './src/app/store/store';

import App from './src/app/components/ssrApp/App';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
    reducer,
    preloadedState: {
        user: null,
    },
});

export function render(req: Request) {
    return renderToString(
        <React.StrictMode>
            <ErrorBoundary fallback={<>Something went wrong</>}>
                <Provider store={store}>
                    <App url={req.url} />
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}
