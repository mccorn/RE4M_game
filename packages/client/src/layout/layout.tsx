import React, { FC } from 'react';
import Game from '../pages/game/game';
import Header from '../components/header/header';

const Layout: FC = () => (
    <div className="wrapper">
        <Header />
        <Game />
    </div>
);

export default Layout;
