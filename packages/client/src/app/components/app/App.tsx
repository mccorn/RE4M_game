import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Router from '../../router/router';
import notificator from './Notificator';
import './App.css';
import AuthAPI from '@/app/api/AuthAPI';
import { TResponse } from '@/const/types';
import utils from '@/utils';
import { signIn } from '@/app/store/slices/userSlice';

const App = () => {
    const [hydrated, setHydrated] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        AuthAPI.getAuthUser().then((response: TResponse | unknown) => {
            if ((response as TResponse).status === 200) {
                const responseData = utils.safeGetData(response);
                dispatch(signIn(responseData));
            }
        });
    }, []);

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
