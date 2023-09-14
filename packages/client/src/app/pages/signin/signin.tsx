import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Form from '@/app/components/common/form/form';
import Button from '@/app/components/common/button/button';
import Input from '@/app/components/common/input/input';
import { signIn } from '@/app/store/slices/userSlice';
import AuthAPI from '@/app/api/AuthAPI';
import { TResponse } from '@/const/types';
import utils from '@/utils';
import { RoutePaths } from '@/app/router/router';
import style from './signin.module.scss';

const Signin: FC = () => {
    const dispatch = useDispatch();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmitForm = () => {
        AuthAPI.login({
            login,
            password,
        })
            .then(response => {
                const status = (response as TResponse)?.status;
                // eslint-disable-next-line no-alert
                if (status === 200) {
                    // alert((response as TResponse)?.status);
                    return AuthAPI.getAuthUser();
                }

                return null;
            })
            .then(response => {
                const responseData = utils.safeGetData(response, true);
                dispatch(signIn(responseData));
            });
    };

    return (
        <div className="formWrapper">
            <Form className="column withGap">
                <Input
                    value={login}
                    onChange={handleChangeLogin}
                    name="login"
                    label="login"
                    placeholder="login"
                    className="column"
                />

                <Input
                    value={password}
                    onChange={handleChangePassword}
                    name="password"
                    label="password"
                    placeholder="password"
                    className="column"
                />

                <Button text="Signin" click={handleSubmitForm} />

                <NavLink to={RoutePaths.SIGNUP} className={style.link}>
                    Signup
                </NavLink>
            </Form>
        </div>
    );
};

export default Signin;
