import React from 'react';
import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';

import App from './src/app/components/app/App';

function render() {
    return renderToString(
        <React.StrictMode>
            <ErrorBoundary fallback={<>Something went wrong</>}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default { render };
