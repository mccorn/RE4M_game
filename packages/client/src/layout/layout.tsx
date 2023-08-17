import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import style from './layout.module.scss';

// todo move this to redux later
type TLayoutProps = {
    isAuthorized?: boolean;
};

const Layout: FC<TLayoutProps> = ({ isAuthorized = true }) => (
    <div className={style.wrapper}>
        <Header isAuthorized={isAuthorized} />
        <Outlet />
    </div>
);

export default Layout;
