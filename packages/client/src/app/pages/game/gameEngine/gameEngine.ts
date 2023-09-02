import GameObjectAnimator from './objectAnimator';
import params from './parameters/gameParameters';
import state from './store/mockGameState';
import { GameShot, ShotType } from './types/gameTypes';
import { ShipType } from './types/commonTypes';
import { GameLevelList } from './parameters/gameLevels';
import Trajectory from './types/trajectory';

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

        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 600);
        this.context.moveTo(250, 0);
        this.context.lineTo(250, 600);
        this.context.moveTo(100, 0);
        this.context.lineTo(100, 600);
        this.context.stroke();
    };

    public load = () => {
        this.bgImage.onload = () => {
            this.renderGameField();
            this.context.font = 'bold 48px serif';
            this.context.fillStyle = '#fff';
            this.context.fillText('START GAME', 150, 200);
        };
    };

    public start = () => {
        state.startLevel(GameLevelList.Level1);
        console.log('ships');
        console.log(state.ships);
        this.animator.resetToStart();
        this.animator.requestId = window.requestAnimationFrame(this.animator.startMainLoop);
    };

    private cancelAnimation = () => {
        if (this.animator.requestId) {
            console.log('in cancel animation');
            window.cancelAnimationFrame(this.animator.requestId);
        } else {
            console.log('request id is null');
        }
    };

    public pause = () => {
        this.cancelAnimation();
    };

    public resume = () => {
        console.log('game engine resume');
        this.animator.requestId = window.requestAnimationFrame(this.animator.startMainLoop);
        console.log('game engine resume 2');
    };

    public finish = () => {
        this.cancelAnimation();
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
        if (direction) {
            // console.log('in player move');
            const player = state.ships.find(ship => +ship.type === ShipType.Player);
            // todo index not used
            player?.updateState(0, false, direction); // todo shouldChangeFrame can be overwritten
        }

        if (event.key === ControlKeys.SHOOT) {
            console.log(event.key);
            const player = state.ships.find(ship => +ship.type === ShipType.Player);
            if (player) {
                console.log('add shot');
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
        }
    };
}

export default GameEngine;
