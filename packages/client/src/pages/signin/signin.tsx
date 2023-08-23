import React, { FC } from 'react';
import AuthAPI from '@/api/AuthAPI';

AuthAPI.login({
    login: 'user10login',
    password: 'user10_Passw0rd',
});

setTimeout(() => {
    console.log('logout');
    AuthAPI.logout();
}, 1000);

setTimeout(() => {
    console.log('login');
    AuthAPI.login({
        login: 'user10login',
        password: 'user10_Passw0rd',
    });
}, 3000);

const Signin: FC = () => <div>Signin stub</div>;

export default Signin;
