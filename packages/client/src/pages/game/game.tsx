import React, { FC, useEffect, useRef } from 'react';
import style from './game.module.scss';
import Button from '@/components/common/button/button';
import { GameFieldParameters as params } from './gameEngine/gameTypes';
import GameEngine from './gameEngine/gameEngine';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    let gameEngine: GameEngine | null = null;

    const startGame = () => {
        if (gameEngine) {
            gameEngine.drawStartGameState();
        }
    };

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            gameEngine = new GameEngine(context);
            gameEngine.drawInitialGameState();
        } else {
            console.log('no context found');
        }
    }, []);

    return (
        <div className={style.game}>
            <div className={style.game__header}>Play game online</div>
            <div>
                <canvas ref={ref} id="gameCanvas" width={params.WIDTH} height={params.HEIGHT}>
                    the game should be here
                </canvas>
            </div>
            <div>
                <Button text="Start game" size="medium" click={startGame} />
            </div>
        </div>
    );
};
export default Game;
