import React, { FC, useEffect, useRef } from 'react';
import style from './game.module.scss';
import Button from '@/components/common/button/button';
import params from './gameEngine/gameParameters';
import GameEngine from './gameEngine/gameEngine';

// todo!
/* enum GameState {
    WaitForStart,
    Started,
    Paused,
    Finished,
} */

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    let gameEngine: GameEngine | null = null;
    const onKeyDown = (event: KeyboardEvent) => {
        // console.log('key pressed');
        // console.log(event);
        gameEngine && gameEngine.gameControlPressed(event);
    };

    const startGame = () => {
        /* const gameEnded = false;
        if (gameEnded) {
            window.removeEventListener('keydown', onKeyDown);
        } */

        gameEngine && gameEngine.start();
        window.addEventListener('keydown', onKeyDown);
    };

    const pauseGame = () => {
        gameEngine && gameEngine.pause();
    };

    const endGame = () => {
        gameEngine && gameEngine.finish();
    };

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            // console.log('context found');
            gameEngine = new GameEngine(context);
            gameEngine.load(); // todo reload page bug
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
