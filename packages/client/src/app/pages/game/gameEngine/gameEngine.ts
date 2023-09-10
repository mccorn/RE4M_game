import GameAnimator from './gameAnimator';
import params from './parameters/gameParameters';
import gameState from './store/gameState';
import { GameShot } from './types/gameTypes';
import { ShotType } from './types/commonTypes';
import { GlobalGameState } from './types/objectState';

// todo move it in some control module ?
const ControlKeys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    PAUSE: 'Enter',
    SHOOT: 'a',
};

export type TDirection = 'Up' | 'Down' | 'Left' | 'Right';

class GameEngine {
    // eslint-disable-next-line no-use-before-define
    private static instance?: GameEngine;

    private context: CanvasRenderingContext2D;

    private bgImage = new Image();

    private animator: GameAnimator;

    private constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.bgImage.src = params.BACKGROUND_IMAGE;
        this.animator = new GameAnimator(this.context, this.renderGameField);
    }

    public static getInstance = (ctx?: CanvasRenderingContext2D) => {
        if (!GameEngine.instance && ctx) {
            GameEngine.instance = new GameEngine(ctx);
        }

        if (GameEngine.instance) {
            return GameEngine.instance;
        }

        throw new Error('no context provided for gameEngine');
    };

    private renderGameField = () => {
        this.context.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        this.context.drawImage(this.bgImage, 0, 0, params.WIDTH, params.HEIGHT);
    };

    private load = () => {
        this.bgImage.onload = () => {
            this.renderGameField();
            this.context.font = 'bold 48px serif';
            this.context.fillStyle = '#fff';
            this.context.fillText('START GAME', 140, 200);
        };
    };

    private levelEnd = () => {
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('LEVEL FINISHED', 100, 200);
    };

    private start = () => {
        gameState.startLevel();
        this.animator.reset();
        this.animator.start();
    };

    private cancelAnimation = () => {
        this.animator.stop();
    };

    private pause = () => {
        this.cancelAnimation();
    };

    private resume = () => {
        this.animator.start();
    };

    private finish = () => {
        this.cancelAnimation();
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('GAME FINISHED', 150, 200);
    };

    private processNewGameState = () => {
        const state = gameState.getState();
        switch (state) {
            case GlobalGameState.Loaded:
                this.load();
                break;
            case GlobalGameState.LevelStarted:
                this.start();
                break;
            case GlobalGameState.Paused:
                this.pause();
                break;
            case GlobalGameState.Resumed:
                this.resume();
                break;
            case GlobalGameState.LevelEnded:
                this.levelEnd();
                break;
            case GlobalGameState.Ended:
                this.finish();
                break;
        }
    };

    public setGameState = (state: GlobalGameState) => {
        console.log('in set state');
        console.log(gameState.getState());
        gameState.setState(state);
        console.log(gameState.getState());
        this.processNewGameState();
    };

    public gameControlPressed = (event: KeyboardEvent) => {
        let direction: TDirection | undefined;
        if (event.key === ControlKeys.UP) {
            direction = 'Up';
        } else if (event.key === ControlKeys.DOWN) {
            direction = 'Down';
        } else if (event.key === ControlKeys.LEFT) {
            direction = 'Left';
        } else if (event.key === ControlKeys.RIGHT) {
            direction = 'Right';
        }
        const { player } = gameState;
        if (direction) {
            player.updateState(false, direction);
        }

        if (event.key === ControlKeys.SHOOT) {
            console.log(event.key);
            console.log('add shot');
            const coordinates = player.getState().getCoordinates();
            gameState.shots.push(
                new GameShot(ShotType.Player, coordinates, this.animator.mainLoopIndex)
            );
        }
    };
}

export default GameEngine;
