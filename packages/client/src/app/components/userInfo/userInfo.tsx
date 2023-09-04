import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './userInfo.module.scss';
import { RoutePaths } from '@/app/router/router';
import calculateAvatarUrl from '@/app/helpers/avatarHelper';
import TUser from '@/const/dataTypes/dataTypes';

type TUserInfoProps = {
    user: TUser;
};

const UserInfo: FC<TUserInfoProps> = ({ user }) => {
    const userDisplayName = user?.displayName ? user.displayName : user.login;

    return (
        <div className={style.user}>
            <div className={style.user__avatar}>
                <Link to={RoutePaths.PROFILE}>
                    <img
                        className={style['user__avatar-image']}
                        alt="user avatar"
                        src={calculateAvatarUrl(user.avatar as string)}
                    />
                </Link>
            </div>
            <div className={style.user__info}>
                <div className={style.user__name}>{userDisplayName}</div>
                <div className={style.user__email}>{user.email}</div>
            </div>
        </div>
    );
};

export default UserInfo;