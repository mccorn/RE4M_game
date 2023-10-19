import React, { FC, useEffect, useState } from 'react';
import Progressbar from '@/app/components/common/progressbar/progressbar';
import style from './startgame.module.scss';
import { someFunction } from '@/const/types';

type StartGameProps = {
    onLoad?: someFunction;
};

const StartGame: FC<StartGameProps> = ({ onLoad }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (value >= 100) {
                if (onLoad) onLoad();
                clearInterval(interval);
                return;
            }
            setValue(Math.min(value + 3, 100));
        }, 30);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div>
            <div className={style.startGameBackground}>
                <h1 className={style.startGameBackground_title}>Get Ready</h1>
                <div className={style.startGameBackground_footer}>
                    <Progressbar value={value} text="Loading" />
                </div>
                <img
                    className={style.startGameBackground_battleCruiser}
                    src="/src/assets/images/battle-cruiser.png"
                    alt="battle cruiser"
                />
            </div>
        </div>
    );
};

export default StartGame;
