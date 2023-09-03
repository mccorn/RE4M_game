import React, { FC } from 'react';
import style from './gameOver.module.scss';
import { TGameScore } from '@/const/dataTypes/dataTypes';

const GameOver: FC<TGameScore> = ({ score }) => (
    <div className={style.gameOver}>
        <h1 className={style.gameOver_title}>Game Over</h1>
        <div>{score}</div>
        <img
            className={style.landingBackground_battleCruiser}
            src="/src/assets/images/battle-cruiser.png"
            alt="battle cruiser"
        />
    </div>
);

export default GameOver;
