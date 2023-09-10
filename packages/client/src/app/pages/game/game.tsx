import React, { FC, useEffect, useRef, useState } from 'react';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/gameEngine';
import { GlobalGameState } from './gameEngine/types/objectState';
import gameState from './gameEngine/store/gameState';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [paused, setIsPaused] = useState(false);
    const [game, setGame] = useState<GameEngine | null>(null);

    const onKeyDown = (event: KeyboardEvent) => {
        GameEngine.getInstance().gameControlPressed(event);
    };

    const startGame = () => {
        GameEngine.getInstance().setGameState(GlobalGameState.LevelStarted);
        // todo move to useEffect
        window.addEventListener('keydown', onKeyDown);
    };

    const pauseGame = () => {
        if (paused) {
            GameEngine.getInstance().setGameState(GlobalGameState.Resumed);
            setIsPaused(false);
        } else {
            GameEngine.getInstance().setGameState(GlobalGameState.Paused);
            setIsPaused(true);
        }
    };

    useEffect(() => {
        /* console.log('in useEffect'); */
        console.log('game isRunning is now');
        console.log(gameState.isGameRunning);

        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            const gameEngine = GameEngine.getInstance(context);
            gameEngine.setGameState(GlobalGameState.Loaded);
            console.log(game);
            setGame(gameEngine);
        } else {
            console.log('no context found');
        }

        /* setInterval(() => {
            console.log('in set interval');
            console.log('game isRunning is now');
            console.log(gameState.isGameRunning);
        }, 1000); */
    }, []);

    /* useEffect(() => {
        if (gameEngine) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            if (gameEngine) {
                window.removeEventListener('keydown', onKeyDown);
            }
        };
    }, [gameEngine]); */

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
