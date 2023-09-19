import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/components/app/App';
import './styles/main.css';
import './styles/grid.scss';
import { store } from './app/store/store';

const mainComponent = (
    <React.StrictMode>
        <ErrorBoundary fallback={<>Something went wrong</>}>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, mainComponent);

export default { mainComponent };
