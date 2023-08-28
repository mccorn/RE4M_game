import React, { FC, useState } from 'react';
import Input from '@/app/components/common/input/input';
import Form from '@/app/components/common/form/form';
import Button from '@/app/components/common/button/button';
import './index.scss';

const Signup: FC = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleChangeSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondName(event.target.value);
    };

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleSubmitForm = () => {
        console.log({
            first_name: firstName,
            second_name: secondName,
            login,
            email,
            password,
            phone,
        });
    };

    return (
        <div className="formWrapper">
            <Form className="column withGap">
                <Input
                    value={firstName}
                    onChange={handleChangeFirstName}
                    name="first_name"
                    label="first_name"
                    placeholder="first_name"
                    inputStyle="normal"
                />
                <Input
                    value={secondName}
                    onChange={handleChangeSecondName}
                    name="second_name"
                    label="second_name"
                    placeholder="second_name"
                />
                <Input
                    value={login}
                    onChange={handleChangeLogin}
                    name="login"
                    label="login"
                    placeholder="login"
                />
                <Input
                    value={email}
                    onChange={handleChangeEmail}
                    name="email"
                    label="email"
                    placeholder="email"
                />
                <Input
                    value={password}
                    onChange={handleChangePassword}
                    name="password"
                    label="password"
                    placeholder="password"
                />
                <Input
                    value={phone}
                    onChange={handleChangePhone}
                    name="phone"
                    label="phone"
                    placeholder="phone"
                />

                <Button text="Signup" click={handleSubmitForm} />
            </Form>
        </div>
    );
};

export default Signup;
