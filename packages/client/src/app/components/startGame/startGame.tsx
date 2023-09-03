import React, { FC } from 'react';
import Progressbar from '../common/progressbar/progressbar';

const StartGame: FC = () => (
    <div>
        <h1>Get Ready</h1>
        <Progressbar value={56} text="Loading" />
    </div>
);

export default StartGame;
