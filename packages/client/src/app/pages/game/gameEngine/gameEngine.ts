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
    // eslint-disable-next-line no-use-before-define
    static instance: GameEngine | undefined;

    context: CanvasRenderingContext2D;

    bgImage = new Image();

    requestId: number | null = null;

    animator: GameObjectAnimator;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.bgImage.src = params.BACKGROUND_IMAGE;
        this.animator = new GameObjectAnimator(
            this.context,
            this.renderGameField,
            this.finish,
            this.levelEnd
        );

        if (GameEngine.instance) {
            // такой синглтон костыльно правит баг с паузой
            // eslint-disable-next-line no-constructor-return
            return GameEngine.instance;
        }

        GameEngine.instance = this;
    }

    private renderGameField = () => {
        this.context.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        this.context.drawImage(this.bgImage, 0, 0, params.WIDTH, params.HEIGHT);

        // temp for testing
        /* this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 600);
        this.context.moveTo(400, 0);
        this.context.lineTo(400, 600);
        this.context.moveTo(300, 0);
        this.context.lineTo(300, 600);
        this.context.moveTo(200, 0);
        this.context.lineTo(200, 600);
        this.context.moveTo(100, 0);
        this.context.lineTo(100, 600);
        this.context.moveTo(0, 100);
        this.context.lineTo(600, 100);
        this.context.moveTo(0, 200);
        this.context.lineTo(600, 200);
        this.context.moveTo(0, 300);
        this.context.lineTo(600, 300);
        this.context.moveTo(0, 400);
        this.context.lineTo(600, 400);
        this.context.moveTo(0, 500);
        this.context.lineTo(600, 500);
        this.context.stroke(); */
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
        state.startLevel(GameLevelList.Level1);
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
        console.log('game engine resume');
        this.animator.start();
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
