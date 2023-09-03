import React, { FC } from 'react';
import GameOver from '@/app/components/gameOver/gameOver';
import mockGameScore from '@/const/mocks/mockGameScore';

const Landing: FC = () => {
    const { score } = mockGameScore;

    return (
        <div>
            <GameOver score={score} />
        </div>
    );
};

export default Landing;
