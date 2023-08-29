import GameObjectAnimator from './objectAnimator';
import params from './gameParameters';
import state from './mockGameState';
import { ShipType } from './gameTypes';

// todo move it in some control module ?
const ControlKeys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    PAUSE: 'Enter',
    FIRE: 'A',
};

export type TDirection = 'Up' | 'Down' | 'Left' | 'Right';

class GameEngine {
    context: CanvasRenderingContext2D;

    bgImage = new Image();

    requestId: number | null = null;

    animator: GameObjectAnimator;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.bgImage.src = params.BACKGROUND_IMAGE;
        this.animator = new GameObjectAnimator(this.context, this.renderGameField);
    }

    public renderGameField = () => {
        this.context.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        this.context.drawImage(this.bgImage, 0, 0, params.WIDTH, params.HEIGHT);
    };

    public load = () => {
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('START GAME', 150, 200);
    };

    public start = () => {
        // console.log('state');
        // console.log(state);
        this.requestId = window.requestAnimationFrame(this.animator.startMainLoop);
    };

    public pause = () => {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
        } else {
            // console.log('request id is null');
        }
    };

    public finish = () => {
        this.renderGameField();
        this.context.font = 'bold 48px serif';
        this.context.fillStyle = '#fff';
        this.context.fillText('GAME FINISHED', 150, 200);
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

        console.log(this.animator);

        const player = state.find(ship => +ship.type === ShipType.Player);
        // todo index?
        player?.updateState(0, direction);
    };
}

export default GameEngine;
