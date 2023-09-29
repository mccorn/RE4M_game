import React, { FC, useEffect, useRef, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/core/gameEngine';
import { GAME_EVENTS, GlobalGameState } from './gameEngine/store/objectState';
import { RootState } from '@/app/store/store';
import GameOver from '@/app/components/gameOver/gameOver';
import StartGame from '../startGame/startGame';
import AnimatedBackground from '@/app/components/animatedBackground/animatedBackground';
import Controller from './controller';

const DEMO_ENEMIES_COUNT = 11; // TODO: автоматизировать процессы игры

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [gameController, setGameController] = useState(new Controller());
    const [counter, setCounter] = useState(0);
    const { gameState: state, score } = useSelector((rootState: RootState) => rootState.game);

    let component;

    const startGame = () => {
        gameController.startGame();
    };

    const pauseGame = () => {
        gameController.setPause(true);
    };

    const resumeGame = () => {
        gameController.setPause(false);
    };

    const handleMouseMove = (ev: SyntheticEvent) => {
        if (gameController.isEnable()) gameController.handleMouseMove(ev);
    };

    useEffect(() => {
        if (state === GlobalGameState.LevelStarted || state === GlobalGameState.Resumed) {
            gameController.resumeGame();
        }

        if (state === GlobalGameState.Ended) {
            gameController.stopGame();
        }
    }, [state]);

    const increment = () => {
        setCounter(counter + 1);
    };

    window.addEventListener(GAME_EVENTS.objectIsDead, increment);

    useEffect(() => {
        if (counter === DEMO_ENEMIES_COUNT) {
            gameController.stopGame();
        }
    }, [counter]);

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            const gameEngine = GameEngine.getInstance(context);
            const newController = new Controller(gameEngine);

            newController.setGameState(GlobalGameState.Loaded);
            setGameController(newController);
        } else {
            throw new Error('no context found');
        }

        return () => {
            window.removeEventListener(GAME_EVENTS.objectIsDead, increment);
            gameController.stopGame();
        };
    }, []);

    if (state === GlobalGameState.Ended) {
        component = (
            <GameOver score={score} isWin={counter === DEMO_ENEMIES_COUNT} kills={counter} />
        );
    } else if (state === GlobalGameState.LevelLoading) {
        component = <StartGame />;
    } else {
        component = (
            <main className={classNames({ [style.default]: state === GlobalGameState.Loaded })}>
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
                    {state === GlobalGameState.Loaded && (
                        <Button text="Start game" size="medium" click={startGame} />
                    )}
                    {state === GlobalGameState.Paused && (
                        <Button text="Resume game" size="medium" click={resumeGame} />
                    )}
                    {(state === GlobalGameState.LevelStarted ||
                        state === GlobalGameState.Resumed) && (
                        <Button text="Pause game" size="medium" click={pauseGame} />
                    )}
                </div>
            </main>
        );
    }

    return (
        <div className={style.game}>
            <AnimatedBackground noInvert />
            {component}
        </div>
    );
};
export default Game;
