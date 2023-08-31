import React, { FC, useState } from 'react';

import Form from '@/app/components/common/form/form';
import Button from '@/app/components/common/button/button';
import Input from '@/app/components/common/input/input';
import AuthAPI from '@/app/api/AuthAPI';
import { TResponse } from '@/const/types';

const Signin: FC = () => {
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
        }).then(response => {
            // eslint-disable-next-line no-alert
            alert((response as TResponse)?.status);
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
                />

                <Input
                    value={password}
                    onChange={handleChangePassword}
                    name="password"
                    label="password"
                    placeholder="password"
                />

                <Button text="Signin" click={handleSubmitForm} />
            </Form>
        </div>
    );
};

export default Signin;
