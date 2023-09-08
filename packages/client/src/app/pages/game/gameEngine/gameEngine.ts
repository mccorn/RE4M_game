import GameObjectAnimator from './objectAnimator';
import params from './parameters/gameParameters';
import state from './store/mockGameState';
import { GameShot, ShotType } from './types/gameTypes';
import Trajectory from './types/trajectory';

export type TDirection =
    | 'Up'
    | 'Down'
    | 'Left'
    | 'Right'
    | 'UpLeft'
    | 'UpRight'
    | 'DownLeft'
    | 'DownRight';

class GameEngine {
    // eslint-disable-next-line no-use-before-define
    private static instance?: GameEngine;

    context: CanvasRenderingContext2D;

    bgImage = new Image();

    requestId: number | null = null;

    animator: GameObjectAnimator;

    private constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.bgImage.src = params.BACKGROUND_IMAGE;
        this.animator = new GameObjectAnimator(
            this.context,
            this.renderGameField,
            this.finish,
            this.levelEnd
        );
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

    public load = () => {
        this.bgImage.onload = () => {
            this.renderGameField();
            this.context.font = 'bold 48px serif';
            this.context.fillStyle = '#fff';
            this.context.fillText('START GAME', 140, 200);
        };
    };

    public levelEnd = () => {
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('LEVEL FINISHED', 100, 200);
    };

    public start = () => {
        state.startLevel();
        console.log('ships');
        console.log(state.ships);
        this.animator.resetToStart();
        this.animator.start();
    };

    private cancelAnimation = () => {
        this.animator.stop();
    };

    public pause = () => {
        this.cancelAnimation();
    };

    public resume = () => {
        this.animator.start();
    };

    public finish = () => {
        this.cancelAnimation();
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('GAME FINISHED', 150, 200);
    };

    // eslint-disable-next-line class-methods-use-this
    public getPlayerCoordinates = () => {
        const player = state.getPlayer();
        return { x: player.state.coordinates.x, y: player.state.coordinates.y };
    };

    // eslint-disable-next-line class-methods-use-this
    public setDirectionForPlayer = (direction: TDirection) => {
        const player = state.getPlayer();
        // todo index not used
        player?.updateState(0, false, direction); // todo shouldChangeFrame can be overwritten
    };

    public playerShot = () => {
        const player = state.getPlayer();
        if (player) {
            const { coordinates } = player.state;
            state.shots.push(
                new GameShot(
                    ShotType.Player,
                    new Trajectory([
                        { x: coordinates.x, y: coordinates.y },
                        { x: coordinates.x, y: -20 }, // todo set show false in the end
                    ]),
                    this.animator.mainLoopIndex // todo do we need to move this ??
                )
            );
        }
    };
}

export default GameEngine;
