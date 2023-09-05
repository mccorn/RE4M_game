import {
    DrawableGameObject,
    LiveState,
    ShipTypesParameterValues,
    ShotParametersValues,
    ShotType,
    TShipState,
    TShotState,
} from './types/gameTypes';
import gameParams from './parameters/gameParameters';
import state from './store/mockGameState';
import CollisionManager from './collisionManager';
import { ShipType } from './types/commonTypes';

class GameObjectAnimator {
    private context: CanvasRenderingContext2D;

    private frameCount = 0;

    public mainLoopIndex = 0;

    private currentLevelLength = gameParams.FIRST_LEVEL_LENGTH;

    private requestId = -1;

    private IMAGE_CHANGE_SPEED = 5; // 1 per 5 frames image changes

    private isStopped = false;

    private drawBackground: () => void;

    private drawGameEnd: () => void;

    private drawLevelEnd: () => void;

    constructor(
        ctx: CanvasRenderingContext2D,
        drawBackground: () => void,
        drawGameEnd: () => void,
        drawLevelEnd: () => void
    ) {
        this.context = ctx;
        this.drawBackground = drawBackground;
        this.drawGameEnd = drawGameEnd;
        this.drawLevelEnd = drawLevelEnd;
    }

    private drawFrame = (object: DrawableGameObject) => {
        const params = object.isShip
            ? ShipTypesParameterValues[object.type]
            : ShotParametersValues[object.type as ShotType];
        const spriteX = params.width * object.state.frameIndex;
        this.context.drawImage(
            object.image,
            spriteX,
            0,
            params.width,
            params.height,
            object.state.coordinates.x,
            object.state.coordinates.y,
            params.width,
            params.height
        );
    };

    public resetToStart = () => {
        window.cancelAnimationFrame(this.requestId);
        this.frameCount = 0;
        this.mainLoopIndex = 0;
        this.requestId = -1;
    };

    public start = () => {
        this.isStopped = false;
        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };

    public stop = () => {
        this.isStopped = true;
        window.cancelAnimationFrame(this.requestId);
    };

    private startMainLoop = () => {
        if (this.isStopped) {
            window.cancelAnimationFrame(this.requestId);
            return;
        }

        this.drawBackground();

        this.frameCount++;

        const shouldChangeFrame = this.frameCount === this.IMAGE_CHANGE_SPEED;
        /* draw all ships: enemies and player */
        state.ships.forEach(ship => {
            const liveState = +(ship.state as TShipState).liveState;
            if (liveState !== LiveState.Dead) {
                ship.updateState(this.mainLoopIndex, shouldChangeFrame);
                if (liveState !== LiveState.WaitForStart) {
                    this.drawFrame(ship);
                }
            }
        });
        /* draw all shots */
        state.shots.forEach(shot => {
            if ((shot.state as TShotState).show) {
                shot.updateState(this.mainLoopIndex, shouldChangeFrame);
                this.drawFrame(shot);
            }
        });

        if (shouldChangeFrame) {
            this.frameCount = 0;
        }

        /* detect if any ship is hit */
        CollisionManager.collisionDetection();

        /* set end game or end level by player dead or level time end */
        const playerShip = state.ships.find(ship => +ship.type === ShipType.Player);
        if (+(playerShip?.state as TShipState).liveState === LiveState.Dead) {
            console.log('game ends');
            this.isStopped = true;
            window.cancelAnimationFrame(this.requestId);
            this.drawGameEnd();
        }

        if (this.mainLoopIndex === this.currentLevelLength) {
            console.log('level ends');
            this.isStopped = true;
            window.cancelAnimationFrame(this.requestId);
            this.drawLevelEnd();
        }

        this.mainLoopIndex++; // do we need to replace this with time?

        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };
}

export default GameObjectAnimator;
