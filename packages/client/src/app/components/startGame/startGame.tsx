/* eslint-disable no-plusplus */
import React, { FC, useEffect, useState } from 'react';
import Progressbar from '../common/progressbar/progressbar';

const StartGame: FC = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (value >= 100) {
                clearInterval(interval);
                return;
            }
            setValue(value + 1);
        }, 30);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div>
            <h1>Get Ready</h1>
            <Progressbar value={value} text="Loading" />
        </div>
    );
};

export default StartGame;
