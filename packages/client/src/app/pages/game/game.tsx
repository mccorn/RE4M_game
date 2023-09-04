import React, { FC, useEffect, useRef, useState } from 'react';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine from './gameEngine/gameEngine';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    let gameEngine: GameEngine | null = null;

    const [paused, setIsPaused] = useState(false);

    const onKeyDown = (event: KeyboardEvent) => {
        gameEngine && gameEngine.gameControlPressed(event);
    };

    const checkGameEngine = () => {
        if (!gameEngine) {
            const context = (ref.current as HTMLCanvasElement).getContext('2d');
            if (context) {
                gameEngine = new GameEngine(context);
            } else {
                console.log('no context found');
            }
        }
    };

    const startGame = () => {
        /* todo remove evetything on game end
        if (gameEnded) {
            window.removeEventListener('keydown', onKeyDown);
        } */

        gameEngine && gameEngine.start();
        window.addEventListener('keydown', onKeyDown);
    };

    const pauseGame = () => {
        if (paused) {
            console.log('in resume');
            console.log(gameEngine);
            checkGameEngine();
            gameEngine && gameEngine.resume();
            setIsPaused(false);
        } else {
            console.log('in pause');
            console.log(gameEngine);
            checkGameEngine();
            gameEngine && gameEngine.pause();
            setIsPaused(true);
        }
    };

    useEffect(() => {
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            // Создается несколько экземпляров gameEngine, не уверен как это влияет на работу
            gameEngine = new GameEngine(context);
            gameEngine.load();
        } else {
            console.log('no context found');
        }
    }, []);

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
