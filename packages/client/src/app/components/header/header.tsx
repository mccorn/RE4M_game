import React, { FC, MouseEventHandler, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@/app/components/common/button/button';
import UserInfo from '@/app/components/userInfo/userInfo';
import Logo from '@/assets/images/trace.svg';
import { RoutePaths as Paths, RoutePaths } from '@/app/router/router';
import style from './header.module.scss';
import AuthAPI from '@/app/api/AuthAPI';
import TUser from '@/const/dataTypes/dataTypes';
import { signOut } from '@/app/store/slices/userSlice';
import Notificator from '../app/Notificator';
import themeAPI from '@/app/api/ThemeAPI';

// todo move this to redux later
type THeaderProps = {
    isAuthorized?: boolean;
};

const Header: FC<THeaderProps> = () => {
    const user = useSelector(state => (state as { user: unknown }).user) as TUser;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout: MouseEventHandler = () => {
        AuthAPI.logout().then(() => {
            Notificator.send('Good luck, captain. See you soon.');
            navigate(RoutePaths.SIGNIN);
            dispatch(signOut());
        });
    };

    const calculateLinkClass = (isActive: boolean) => {
        const activeClass = isActive ? style.header__link_active : '';
        return classNames(style.header__link, activeClass);
    };

    const onClickColorModeButton = async () => {
        themeAPI.switch();
    };

    return (
        <div className={style.header}>
            <Link to={Paths.LANDING}>
                <div className={classNames(style.header__logoWrapper)}>
                    <img className={style.header__logo} src={Logo} alt="Home" />

                    <h3 className={style.header__title}>Black Star</h3>
                </div>
            </Link>

            <div className={style.header__navigation}>
                <Button buttonStyle="icon" size="small" click={onClickColorModeButton}>
                    <img className={style.header__changeColorMode} alt="change color mode" />
                </Button>
                <nav className={style.header__links}>
                    <NavLink
                        to={Paths.GAME}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Game
                    </NavLink>
                    {!user && (
                        <NavLink
                            to={Paths.SIGNIN}
                            className={({ isActive }) => calculateLinkClass(isActive)}>
                            Login
                        </NavLink>
                    )}

                    {user && (
                        <>
                            <NavLink
                                to={Paths.FORUM__URL}
                                className={({ isActive }) => calculateLinkClass(isActive)}>
                                Forum
                            </NavLink>
                            <NavLink
                                to={Paths.LEADERBOARD}
                                className={({ isActive }) => calculateLinkClass(isActive)}>
                                Leaderboard
                            </NavLink>
                        </>
                    )}
                </nav>

                {user && (
                    <>
                        <UserInfo user={user} />
                        <Button
                            size="medium"
                            text="Logout"
                            click={logout}
                            buttonStyle="withoutBackGround"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
