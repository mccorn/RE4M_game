import React, { FC, useState } from 'react';

import Button from '@/app/components/common/button/button';
import LazyForm from '@/app/components/lazy/lazyForm/lazyForm';

import './index.scss';

type TProfileData = {
    login: string;
    displayName: string;
    firstName: string;
    secondName: string;
    email: string;
    phone: string;

    // oldPassword: string,
    // newPassword: string,
};

type TProfilePageProps = {
    data?: TProfileData;
};

const Profile: FC<TProfilePageProps> = ({ data }) => {
    const [login, setLogin] = useState(data?.login);
    const [displayName, setDisplayName] = useState(data?.displayName);
    const [firstName, setFirstName] = useState(data?.firstName);
    const [secondName, setSecondName] = useState(data?.secondName);
    const [email, setEmail] = useState(data?.email);
    const [phone, setPhone] = useState(data?.phone);

    const handleSubmitForm = () => {
        console.log({
            login,
            first_name: firstName,
            second_name: secondName,
            email,
            displayName,
            // password,
            phone,
        });
    };

    return (
        <div className="formWrapper onOneLine">
            <LazyForm
                inputs={[
                    { name: 'login', value: login, handler: setLogin },
                    { name: 'displayName', value: displayName, handler: setDisplayName },
                    { name: 'firstName', value: firstName, handler: setFirstName },
                    { name: 'secondName', value: secondName, handler: setSecondName },
                    { name: 'email', value: email, handler: setEmail },
                    { name: 'phone', value: phone, handler: setPhone },

                    // { name: 'password', handler: setSecondName },
                    // { name: 'password', handler: setSecondName },
                ]}>
                <Button text="Save" click={handleSubmitForm} />
            </LazyForm>
        </div>
    );
};

export default Profile;
