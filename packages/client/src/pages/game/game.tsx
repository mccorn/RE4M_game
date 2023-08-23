import React, { FC, useEffect, useRef, useState } from 'react';
import style from './game.module.scss';
import Button from '@/components/common/button/button';
import { GameFieldParameters as params } from './gameEngine/gameTypes';
import GameEngine from './gameEngine/gameEngine';

enum GameState {
    WaitForStart,
    Started,
    Paused,
    Finished,
}

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    let gameEngine: GameEngine | null = null;

    // todo move to redux, make one state
    const [gameState, setGameState] = useState<GameState>(GameState.WaitForStart);

    // const startGame = () => gameEngine && gameEngine.startGame();

    const onKeyDown = (event: KeyboardEvent) => {
        console.log('key pressed');
        console.log(event);
        gameEngine && gameEngine.gameControlPressed(event);
    };

    const startGame = () => {
        gameEngine && gameEngine.startGame();

        window.addEventListener('keydown', onKeyDown);
        const gameEnded = false;
        if (gameEnded) {
            window.removeEventListener('keydown', onKeyDown);
        }
    };

    const pauseGame = () => {
        setGameState(gameState === GameState.Paused ? GameState.Started : GameState.Paused);
        gameEngine && gameEngine.pauseGame();
    };

    const endGame = () => gameEngine && gameEngine.endGame();

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            gameEngine = new GameEngine(context);
            gameEngine.loadGame();
        } else {
            console.log('no context found');
        }
    }, []);

    return (
        <div className={style.game}>
            <div className={style.game__header}>Play game online</div>
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

                <Button text="End game" size="medium" click={endGame} />
            </div>
        </div>
    );
};
export default Game;
