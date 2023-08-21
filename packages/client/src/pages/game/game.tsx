import React, { FC } from 'react';
import style from './game.module.scss';
import Button from '@/components/common/button/button';

const Game: FC = () => (
    <>
        <div className={style.game}>Game stub</div>
        <div>
            <Button text="large" size="large" />
            <Button text="medium" size="medium" />
            <Button text="small" size="small" />
        </div>
    </>
);
export default Game;
