import React, { FC, useState } from 'react';
import Input from '@/components/common/input/input';
import Form from '@/components/common/form/form';
import Button from '@/components/common/button/button';

type SignupUserData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

type SignupProps = {
    data: SignupUserData;
};

const Signup: FC<SignupProps> = () => {
    const [firstName, changeFirstName] = useState('');
    const [secondName, changeSecondName] = useState('');
    const [login, changeLogin] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [phone, changePhone] = useState('');

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeFirstName(event.target.value);
    };

    const handleChangeSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeSecondName(event.target.value);
    };

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeLogin(event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePassword(event.target.value);
    };

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePhone(event.target.value);
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
        <div>
            <Form className="column">
                <Input
                    value={firstName}
                    onChange={handleChangeFirstName}
                    label="first_name"
                    placeholder="first_name"
                    inputStyle="normal"
                />
                <Input
                    value={secondName}
                    onChange={handleChangeSecondName}
                    label="second_name"
                    placeholder="second_name"
                />
                <Input
                    value={login}
                    onChange={handleChangeLogin}
                    label="login"
                    placeholder="login"
                />
                <Input
                    value={email}
                    onChange={handleChangeEmail}
                    label="email"
                    placeholder="email"
                />
                <Input
                    value={password}
                    onChange={handleChangePassword}
                    label="password"
                    placeholder="password"
                />
                <Input
                    value={phone}
                    onChange={handleChangePhone}
                    label="phone"
                    placeholder="phone"
                />

                <Button text="Signup" click={handleSubmitForm} />
            </Form>
        </div>
    );
};

export default Signup;
