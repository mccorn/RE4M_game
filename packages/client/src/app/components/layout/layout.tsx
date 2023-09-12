import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';
import Header from '@/app/components/header/header';

const Layout: FC = () => (
    <div className={style.wrapper}>
        <Header />
        <Outlet />
    </div>
);

export default Layout;
