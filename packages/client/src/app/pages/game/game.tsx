import React, { FC, useEffect, useRef, useState, SyntheticEvent } from 'react';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/gameEngine';
import mockRedux from './gameEngine/store/mockRedux';
import { GlobalGameState } from './gameEngine/types/objectState';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [paused, setIsPaused] = useState(false);
    let shootInterval: ReturnType<typeof setInterval> | null = null;

    const startGame = () => {
        /* todo remove evetything on game end
        if (gameEnded) {
            window.removeEventListener('keydown', onKeyDown);
        } */
        shootInterval = setInterval(() => {
            GameEngine.getInstance().playerShot();
        }, 500);
        mockRedux.setState(GlobalGameState.LevelStarted);
    };

    const pauseGame = () => {
        if (paused) {
            mockRedux.setState(GlobalGameState.Resumed);
            setIsPaused(false);
        } else {
            mockRedux.setState(GlobalGameState.Paused);
            setIsPaused(true);
        }
    };

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            GameEngine.getInstance(context);
            mockRedux.setState(GlobalGameState.Loaded);
        } else {
            console.log('no context found');
        }

        return () => {
            if (shootInterval) {
                clearInterval(shootInterval);
            }
        };
    }, []);

    const handleMouseMove = (ev: SyntheticEvent) => {
        if (
            mockRedux.getState() !== GlobalGameState.LevelStarted &&
            mockRedux.getState() !== GlobalGameState.Resumed
        ) {
            return;
        }
        const mouseX =
            (ev.nativeEvent as MouseEvent).clientX - (ev.target as HTMLElement).offsetLeft - 35;
        const mouseY =
            (ev.nativeEvent as MouseEvent).clientY - (ev.target as HTMLElement).offsetTop - 30;
        const gameEngine = GameEngine.getInstance();

        gameEngine.setTargetedCoordinatesForPlayer({ x: mouseX, y: mouseY });
    };

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
                    onMouseMove={handleMouseMove}
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
