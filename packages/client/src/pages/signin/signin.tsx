import React, { FC, useState } from 'react';
import Form from '@/components/common/form/form';
import Input from '@/components/common/input/input';
import Button from '@/components/common/button/button';

const Signin: FC = () => {
    const [login, changeLogin] = useState('');
    const [password, changePassword] = useState('');

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeLogin(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePassword(event.target.value);
    };

    const handleSubmitForm = () => {
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
