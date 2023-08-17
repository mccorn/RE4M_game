import React, { FC } from 'react';
import style from './header.module.scss';
import { Button } from '../common/button/button';

const Header: FC = () => (
    <div className={style.header}>
        <div className={style.header__logo}>
            <a href="/landing">Game logo will be there</a>
        </div>

        <div className={style.header__navigation}>
            <div className={style.links}>
                <a href="/game">Game</a>
                <a href="/forum">Forum</a>
                <a href="leaderboard/1">Leaderboard</a>
                <a href="/profile">Profile</a>
            </div>

            <div className={style['header__user-info']}>User info will be here</div>

            <Button size="medium" text="Logout" />
        </div>
    </div>
);

export default Header;
