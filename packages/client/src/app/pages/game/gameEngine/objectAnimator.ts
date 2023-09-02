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
    context: CanvasRenderingContext2D;

    frameCount = 0;

    mainLoopIndex = 0;

    currentLevelLength = gameParams.FIRST_LEVEL_LENGTH;

    requestId = -1;

    IMAGE_CHANGE_SPEED = 5; // 1 per 5 frames image changes

    drawBackground: () => void;

    drawGameEnd: () => void;

    drawLevelEnd: () => void;

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
        // reset speed bug!!!
        this.frameCount = 0;
        this.mainLoopIndex = 0;
        this.requestId = -1;
    };

    public startMainLoop = () => {
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
            // console.log('game ends');
            window.cancelAnimationFrame(this.requestId);
            this.drawGameEnd();
        }

        if (this.mainLoopIndex === this.currentLevelLength) {
            console.log('level ends');
            window.cancelAnimationFrame(this.requestId);
            // todo send to gameEngine - level ended
        }

        this.mainLoopIndex++; // do we need to replace this with time?

        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };
}

export default GameObjectAnimator;
