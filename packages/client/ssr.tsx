import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';

// import App from './src/app/components/app/App';
import Router from './src/app/router/router';

// eslint-disable-next-line import/prefer-default-export
export function render({ url }) {
    return renderToString(
        <React.StrictMode>
            <Provider store={store}>
                <StaticRouter location={url}>
                    <Router />
                </StaticRouter>
            </Provider>
        </React.StrictMode>
    );
}
