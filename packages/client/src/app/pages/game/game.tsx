import React, { FC, useEffect, useRef, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { RootState } from '@/app/store/store';

import AnimatedBackground from '@/app/components/animatedBackground/animatedBackground';
import GameOver, { SCORE_COEFFICIENT } from '@/app/components/gameOver/gameOver';
import Button from '@/app/components/common/button/button';

import StartGame from '@/app/pages/startGame/startGame';

import { GlobalGameState } from '@/gameEngine/store/objectState';
import GameEngine from '@/gameEngine/core/gameEngine';
import params from '@/gameEngine/parameters/gameParameters';

import style from './game.module.scss';

import Controller from './controller';
import AuthAPI from '@/app/api/AuthAPI';
import utils from '@/utils';
import { TResponse } from '@/const/types';
import LeaderboardAPI from '@/app/api/LeaderboardAPI';
import TUser from '@/const/dataTypes/dataTypes';

const Game: FC = () => {
    const user = useSelector(state => (state as { user: unknown }).user) as TUser;
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [gameController] = useState(new Controller());
    const [counter, setCounter] = useState(0);
    const [statusWin, setStatusWin] = useState(false);
    const { gameState: state, score } = useSelector((rootState: RootState) => rootState.game);

    const handleLoadEnd = () => {
        gameController.setGameState(GlobalGameState.Loaded);
    };

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
        if (state === GlobalGameState.Ended) {
            gameController.stopGame();

            const kills = gameController.getCounter();
            if (user) {
                const { login } = user;

                LeaderboardAPI.addUserToLeaderboard(login, (kills || 0) * SCORE_COEFFICIENT);
            }

            setCounter(kills);
            setStatusWin(gameController.getStatusWin());
        }
    }, [state]);

    useEffect(() => {
        gameController.setGameState(GlobalGameState.LevelLoading);

        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            const gameEngine = GameEngine.getInstance(context);
            gameController.setEngine(gameEngine);
        } else {
            throw new Error('no context found');
        }

        return () => {
            gameController.stopGame();
        };
    }, []);

    return (
        <div className={style.game}>
            <AnimatedBackground noInvert />
            <main
                className={classNames(
                    { [style.default]: state <= 1 || state === 6 },
                    { [style.ended]: state === 6 }
                )}>
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

                {state === GlobalGameState.Ended && (
                    <GameOver score={score} isWin={statusWin} kills={counter} />
                )}

                {state <= 1 && <StartGame onLoad={handleLoadEnd} />}

                <div className={style.game__buttons}>
                    {state === GlobalGameState.Loaded && (
                        <Button text="Start game" size="medium" click={startGame} />
                    )}
                    {state === GlobalGameState.Paused && (
                        <Button text="Resume game" size="medium" click={resumeGame} />
                    )}
                    {gameController.isEnable() && (
                        <Button text="Pause game" size="medium" click={pauseGame} />
                    )}
                    {state === GlobalGameState.Ended && (
                        <Button text="Restart" click={() => location.reload()} />
                    )}
                </div>
            </main>
        </div>
    );
};
export default Game;
