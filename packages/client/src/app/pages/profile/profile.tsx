import React, { FC, useState } from 'react';

import Button from '@/app/components/common/button/button';
import Form from '@/app/components/common/form/form';
import Input from '@/app/components/common/input/input';

import './index.scss';
import { someFunction } from '@/const/types';

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;

type TInputHandler = (event: ChangeInputEvent, callback: someFunction) => unknown;

const Profile: FC = () => {
    const [login, setLogin] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange: TInputHandler = (event, callback) => {
        callback(event.target.value);
    };

    const handleSubmitForm = () => {
        console.log({
            login,
            first_name: firstName,
            second_name: secondName,
            email,
            // password,
            phone,
        });
    };

    return (
        <div className="formWrapper onOneLine">
            <Form className="column withGap">
                <Input
                    value={login}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setLogin)}
                    name="login"
                    label="login"
                    placeholder="login"
                    inputStyle="normal"
                />

                <Input
                    value={displayName}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setDisplayName)}
                    name="display_name"
                    label="display_name"
                    placeholder="display_name"
                    inputStyle="normal"
                />

                <Input
                    value={firstName}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setFirstName)}
                    name="first_name"
                    label="first_name"
                    placeholder="first_name"
                    inputStyle="normal"
                />

                <Input
                    value={secondName}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setSecondName)}
                    name="secondName"
                    label="secondName"
                    placeholder="secondName"
                    inputStyle="normal"
                />

                <Input
                    value={email}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setEmail)}
                    name="email"
                    label="email"
                    placeholder="email"
                    inputStyle="normal"
                />

                <Input
                    value={phone}
                    className="onOneLine"
                    onChange={e => handleChange(e as ChangeInputEvent, setPhone)}
                    name="phone"
                    label="phone"
                    placeholder="phone"
                    inputStyle="normal"
                />

                <Button text="Save" click={handleSubmitForm} />
            </Form>
        </div>
    );
};

export default Profile;
