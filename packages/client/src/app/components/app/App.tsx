import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../../router/router';
import notificator from './Notificator';
import './App.css';

const App = () => {
    useEffect(() => {
        notificator.init();
    }, [notificator]);

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
