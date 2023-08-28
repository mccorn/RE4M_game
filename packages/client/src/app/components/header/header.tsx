import React, { FC, MouseEventHandler, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@/app/components/common/button/button';
import UserInfo from '@/app/components/userInfo/userInfo';
import Logo from '@/assets/images/logo.svg';
import Moon from '@/assets/images/moon.svg';
import Sun from '@/assets/images/sun.svg';
import { RoutePaths as Paths } from '@/app/router/router';
import mockUser from '@/const/mocks/mockUser';
import style from './header.module.scss';
import AuthAPI from '@/app/api/AuthAPI';

// todo move this to redux later
type THeaderProps = {
    isAuthorized?: boolean;
};

const Header: FC<THeaderProps> = ({ isAuthorized }) => {
    const [imageForChangeColorMode, setimageForChangeColorMode] = useState(Moon);

    const logout: MouseEventHandler = () => {
        AuthAPI.logout();

        // AuthAPI.logout()
        //  .then(() => alert('success logout'))
        // .catch((err) => console.log(err));
    };

    const calculateLinkClass = (isActive: boolean) => {
        const activeClass = isActive ? style.header__link_active : '';
        return classNames(style.header__link, activeClass);
    };

    const changeColorMode = () => {
        if (imageForChangeColorMode === Moon) {
            setimageForChangeColorMode(Sun);

            document.documentElement.style.setProperty('--backgroundColor', '#000218');

            document.documentElement.style.setProperty('--backgroundColorSecondary', '#344756');

            document.documentElement.style.setProperty('--backgroundInput', '#D2D2D2');

            document.documentElement.style.setProperty('--buttonBackgroundColor', '#595B82');
        } else {
            setimageForChangeColorMode(Moon);

            document.documentElement.style.setProperty('--backgroundColor', '#009797');

            document.documentElement.style.setProperty('--backgroundColorSecondary', '#95b1b0');

            document.documentElement.style.setProperty('--backgroundInput', '#fff');

            document.documentElement.style.setProperty('--buttonBackgroundColor', '#324b4b');
        }
    };

    return (
        <div className={style.header}>
            <div>
                <Link to={Paths.LANDING}>
                    <img className={style.header__logo} src={Logo} alt="Home" />
                </Link>
            </div>

            <div className={style.header__navigation}>
                <Button buttonStyle="withoutBackGround" size="small" click={changeColorMode}>
                    <img
                        className={style.header__changeColorMode}
                        src={imageForChangeColorMode}
                        alt="change color mode"
                    />
                </Button>
                <nav className={style.header__links}>
                    <NavLink
                        to={Paths.GAME}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Game
                    </NavLink>
                    {isAuthorized && (
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

                {isAuthorized && <UserInfo user={mockUser} />}

                <Button size="medium" text="Logout" click={logout} />
            </div>
        </div>
    );
};

export default Header;
