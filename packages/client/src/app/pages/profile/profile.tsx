import React, { FC, useEffect, useState } from 'react';

import Button from '@/app/components/common/button/button';
import LazyForm from '@/app/components/lazy/lazyForm/lazyForm';

import './index.scss';
import UserAPI from '@/app/api/UserAPI';
import AuthAPI from '@/app/api/AuthAPI';
import { TResponse } from '@/const/types';
import utils from '@/utils';

type TProfileData = {
    login: string;
    displayName: string;
    firstName: string;
    secondName: string;
    email: string;
    phone: string;
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

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        AuthAPI.getAuthUser().then((response: TResponse | unknown) => {
            const responseData = utils.safeGetData(response);

            setLogin(responseData.login);
            setDisplayName(responseData.display_name);
            setFirstName(responseData.first_name);
            setSecondName(responseData.second_name);
            setEmail(responseData.email);
            setPhone(responseData.phone);
        });
    }, []);

    const handleSubmitForm = () => {
        UserAPI.update({
            login,
            first_name: firstName,
            second_name: secondName,
            email,
            display_name: displayName,
            phone,
        }).then(response => {
            // eslint-disable-next-line no-alert
            alert((response as TResponse)?.status);
        });
    };

    const handleSubmitPassword = () => {
        UserAPI.updatePassword({
            oldPassword,
            newPassword,
        }).then(response => {
            // eslint-disable-next-line no-alert
            alert((response as TResponse)?.status);
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
                ]}>
                <Button text="Save" click={handleSubmitForm} />
            </LazyForm>

            <div className="row stretch" />
            <div className="row stretch" />

            <LazyForm
                inputs={[
                    { name: 'oldPassword', value: oldPassword, handler: setOldPassword },
                    { name: 'newPassword', value: newPassword, handler: setNewPassword },
                ]}>
                <Button text="Change password" click={handleSubmitPassword} />
            </LazyForm>
        </div>
    );
};

export default Profile;
