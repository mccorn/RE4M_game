import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/app/components/app/App';

function render() {
    return renderToString(<App />);
}

export default { render };
