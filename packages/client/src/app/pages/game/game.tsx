import React, { FC, useEffect, useRef, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/gameEngine';
import { GlobalGameState } from './gameEngine/types/objectState';
import { RootState } from '@/app/store/store';
import GameOver from '@/app/components/gameOver/gameOver';
import StartGame from '../startGame/startGame';
import mockRedux from './gameEngine/store/gameState';
import AnimatedBackground from '@/app/components/animatedBackground/animatedBackground';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [paused, setIsPaused] = useState(false);
    const { gameState: state, score } = useSelector((rootState: RootState) => rootState.game);
    let shootInterval: ReturnType<typeof setInterval> | null = null;
    let component;

    const onKeyDown = (event: KeyboardEvent) => {
        GameEngine.getInstance().gameControlPressed(event);
    };

    const startGame = () => {
        // GameEngine.getInstance().setGameState(GlobalGameState.LevelLoading);
        // Временно включаю сразу состояние начало игры из-за бага, к зачету починим
        GameEngine.getInstance().setGameState(GlobalGameState.LevelStarted);

        shootInterval = setInterval(() => {
            console.log('ddd');
            GameEngine.getInstance().playerShot();
        }, 500);
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

    const handleMouseMove = (ev: SyntheticEvent) => {
        if (
            mockRedux.getState() !== GlobalGameState.LevelStarted &&
            mockRedux.getState() !== GlobalGameState.Resumed
        ) {
            return;
        }
        const halfShipHeight = 35;
        const halfShipWidth = 30;
        const mouseX =
            (ev.nativeEvent as MouseEvent).clientX -
            (ev.target as HTMLElement).offsetLeft -
            halfShipHeight;
        const mouseY =
            (ev.nativeEvent as MouseEvent).clientY -
            (ev.target as HTMLElement).offsetTop -
            halfShipWidth;
        const gameEngine = GameEngine.getInstance();

        gameEngine.setTargetedCoordinatesForPlayer({ x: mouseX, y: mouseY });
    };

    useEffect(() => {
        if (state === GlobalGameState.LevelStarted || state === GlobalGameState.Resumed) {
            window.addEventListener('keydown', onKeyDown);
            shootInterval = setInterval(() => {
                GameEngine.getInstance().playerShot();
            }, 500);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            if (shootInterval) {
                clearInterval(shootInterval);
            }
        };
    }, [state]);

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            const gameEngine = GameEngine.getInstance(context);
            gameEngine.setGameState(GlobalGameState.Loaded);
        } else {
            console.log('no context found');
        }
    }, []);

    if (state === GlobalGameState.Ended) {
        component = <GameOver score={score} />;
    } else if (state === GlobalGameState.LevelLoading) {
        component = <StartGame />;
    } else {
        component = (
            <main>
                <div className={style.game__canvasWrapper}>
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
            </main>
        );
    }

    return (
        <div className={style.game}>
            <AnimatedBackground noInvert />
            {component}

            {/* <div className={style.game__buttons}>
                <Button text="Start game" size="medium" click={startGame} />

                <Button text="Pause game" size="medium" click={pauseGame} />
            </div> */}
        </div>
    );
};
export default Game;
