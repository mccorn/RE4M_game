import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom/client';
import App from './app/components/app/App';
import './styles/main.css';
import './styles/grid.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<>Something went wrong</>}>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
