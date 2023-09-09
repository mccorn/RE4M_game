import React, { FC, useEffect, useRef, useState } from 'react';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/gameEngine';
import gameState from './gameEngine/store/gameState';
import { GlobalGameState } from './gameEngine/types/objectState';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [paused, setIsPaused] = useState(false);

    const onKeyDown = (event: KeyboardEvent) => {
        GameEngine.getInstance().gameControlPressed(event);
    };

    const startGame = () => {
        gameState.setState(GlobalGameState.LevelStarted);
    };

    const pauseGame = () => {
        if (paused) {
            gameState.setState(GlobalGameState.Resumed);
            setIsPaused(false);
        } else {
            gameState.setState(GlobalGameState.Paused);
            setIsPaused(true);
        }
    };

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            GameEngine.getInstance(context);
            gameState.setState(GlobalGameState.Loaded);
        } else {
            console.log('no context found');
        }

        if (gameState.isGameRunning) {
            window.addEventListener('keydown', onKeyDown);
        } else {
            window.removeEventListener('keydown', onKeyDown);
        }

        return function cleanup() {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [gameState.isGameRunning]);

    return (
        <div className={style.game}>
            <div className={style.game__header}>Play game online</div>
            <div className={style.game__controls}>
                Game controls: Arrow buttons to move. A button to fire
            </div>
            <div>
                <canvas
                    ref={ref}
                    width={params.WIDTH}
                    height={params.HEIGHT}
                    className={style.game__canvas}>
                    the game should be here
                </canvas>
            </div>
            <div className={style.game__buttons}>
                <Button text="Start game" size="medium" click={startGame} />

                <Button text="Pause game" size="medium" click={pauseGame} />
            </div>
        </div>
    );
};
export default Game;
