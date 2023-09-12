import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../../router/router';
import './App.css';
import AuthAPI from '@/app/api/AuthAPI';

const App = () => {
    useEffect(() => {
        AuthAPI.getUser();
    }, []);
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
