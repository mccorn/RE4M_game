import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '@/app/components/common/form/form';
import Button from '@/app/components/common/button/button';
import Input from '@/app/components/common/input/input';
import mockUser from '@/const/mocks/mockUser';
import { signIn } from '@/app/store/reducers/user';

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
        const user = {
            ...mockUser,
            login,
        };
        dispatch(signIn(user));
        console.log({
            login,
            password,
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
