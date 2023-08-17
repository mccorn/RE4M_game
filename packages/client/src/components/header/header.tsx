import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import style from './header.module.scss';
import Button from '../common/button/button';
import { RoutePaths as Paths } from '../../router/router';
import Logo from '@/assets/images/logo.svg';

// todo move this to redux later
type THeaderProps = {
    isAuthorized?: boolean;
};

const Header: FC<THeaderProps> = () => {
    const logout: MouseEventHandler = () => alert('logout will be here');

    const calculateLinkClass = (isActive: boolean) =>
        classNames(style.header__link, { header__link_active: isActive });

    return (
        <div className={style.header}>
            <div>
                <NavLink to={Paths.LANDING}>
                    <img className={style.header__logo} src={Logo} alt="Home" />
                </NavLink>
            </div>

            <div className={style.header__navigation}>
                <nav className={style.header__links}>
                    <NavLink
                        to={Paths.GAME}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Game
                    </NavLink>
                    <NavLink
                        to={Paths.FORUM}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Forum
                    </NavLink>
                    <NavLink
                        to={Paths.LEADERBOARD}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Leaderboard
                    </NavLink>
                    <NavLink
                        to={Paths.PROFILE}
                        className={({ isActive }) => calculateLinkClass(isActive)}>
                        Profile
                    </NavLink>
                </nav>

                <div className={style['header__user-info']}>User info will be here</div>

                <Button size="medium" text="Logout" click={logout} />
            </div>
        </div>
    );
};

export default Header;
