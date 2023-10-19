import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../../router/router';
import notificator from './Notificator';
import './App.css';

const App = () => {
    const [hydrated, setHydrated] = React.useState(false);

    useEffect(() => {
        notificator.init();
    }, [notificator]);

    React.useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
