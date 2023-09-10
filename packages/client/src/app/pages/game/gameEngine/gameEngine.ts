import GameAnimator from './gameAnimator';
import params from './parameters/gameParameters';
import mockRedux from './store/mockRedux';
import { GameShot } from './types/gameTypes';
import { ShotType, TPoint } from './types/commonTypes';
import { GlobalGameState } from './types/objectState';
import { approximatelyEqual } from '@/utils';

export type TDirection =
    | 'Up'
    | 'Down'
    | 'Left'
    | 'Right'
    | 'UpLeft'
    | 'UpRight'
    | 'DownLeft'
    | 'DownRight';

export enum Direction {
    'Up' = 'Up',
    'Down' = 'Down',
    'Left' = 'Left',
    'Right' = 'Right',
    'UpLeft' = 'UpLeft',
    'UpRight' = 'UpRight',
    'DownLeft' = 'DownLeft',
    'DownRight' = 'DownRight',
}

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
        mockRedux.startLevel();
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

    // eslint-disable-next-line class-methods-use-this
    public getPlayerCoordinates = () => {
        const { player } = mockRedux;
        return { x: player.getState().getCoordinates().x, y: player.getState().getCoordinates().y };
    };

    // eslint-disable-next-line class-methods-use-this
    private setDirectionForPlayer = (direction: TDirection) => {
        const { player } = mockRedux;
        // todo index not used
        player?.updateState(false, direction); // todo shouldChangeFrame can be overwritten
    };

    private interval: ReturnType<typeof setInterval> | null = null;

    public setTargetedCoordinatesForPlayer = ({ x: mouseX, y: mouseY }: TPoint) => {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            const { x: playerX, y: playerY } = this.getPlayerCoordinates();
            if (
                approximatelyEqual(playerX, mouseX, 2) &&
                approximatelyEqual(playerY, mouseY, 2) &&
                this.interval
            ) {
                clearInterval(this.interval);
                return;
            }

            let direction = '';
            if (mouseY < playerY) {
                direction += Direction.Up;
            }
            if (mouseY > playerY) {
                direction += Direction.Down;
            }
            if (mouseX > playerX) {
                direction += Direction.Right;
            }
            if (mouseX < playerX) {
                direction += Direction.Left;
            }

            this.setDirectionForPlayer(direction as TDirection);
        }, 0);
    };

    public processNewGameState = () => {
        const gameState = mockRedux.getState();
        switch (gameState) {
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

    public playerShot = () => {
        const { player } = mockRedux;
        const coordinates = player.getState().getCoordinates();
        mockRedux.shots.push(
            new GameShot(ShotType.Player, coordinates, this.animator.mainLoopIndex)
        );
    };
}

export default GameEngine;
