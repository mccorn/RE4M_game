import {
    DrawableGameObject,
    DrawableObjectParams,
    GameShip,
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

class GameObjectAnimator {
    context: CanvasRenderingContext2D;

    frameCount = 0;

    mainLoopIndex = 0;

    currentLevelLength = gameParams.FIRST_LEVEL_LENGTH;

    drawBackground: () => void;

    requestId: number;

    FRAME_CHANGE_SPEED = 5; // 1 per 5 frames image changes

    constructor(ctx: CanvasRenderingContext2D, drawBackground: () => void) {
        this.context = ctx;
        this.drawBackground = drawBackground;
        this.requestId = -1;
    }

    private drawFrame = (
        object: DrawableGameObject,
        params: DrawableObjectParams,
        spriteX: number
    ) => {
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

    private drawChangingFrame = (object: DrawableGameObject) => {
        const params = object.isShip
            ? ShipTypesParameterValues[object.type]
            : ShotParametersValues[object.type as ShotType];
        const sx = params.width * object.state.frameIndex;
        this.drawFrame(object, params, sx);
    };

    private drawBaseFrame = (ship: GameShip) => {
        const shipParams = ShipTypesParameterValues[ship.type];
        this.drawFrame(ship, shipParams, 0);
    };

    private drawShip = (ship: GameShip) => {
        const shipState = ship.state as TShipState;
        if (+shipState.liveState === LiveState.Exploiding) {
            this.drawChangingFrame(ship); // todo move all logic to draw changing frame
        } else if (+shipState.liveState === LiveState.Flying) {
            this.drawBaseFrame(ship);
        }
    };

    public resetToStart = () => {
        // reset speed bug!!!
        this.frameCount = 0;
        this.mainLoopIndex = 0;
    };

    public startMainLoop = () => {
        this.frameCount++;

        /* draw background */
        this.drawBackground();

        const shouldChangeFrame = this.frameCount === this.FRAME_CHANGE_SPEED;
        /* draw all ships: enemies and player */
        state.ships.forEach(ship => {
            const shipState = ship.state as TShipState;
            if (+shipState.liveState !== LiveState.Dead) {
                ship.updateState(this.mainLoopIndex, shouldChangeFrame);
                this.drawShip(ship);
            }
        });
        /* draw all shots */
        state.shots.forEach(shot => {
            if ((shot.state as TShotState).show) {
                shot.updateState(this.mainLoopIndex, shouldChangeFrame);
                this.drawChangingFrame(shot);
            }
        });

        CollisionManager.collisionDetection();

        if (shouldChangeFrame) {
            this.frameCount = 0;
        }
        this.mainLoopIndex++; // do we need to replace this with time?

        if (this.mainLoopIndex === this.currentLevelLength) {
            console.log('in cancel first');
            window.cancelAnimationFrame(this.requestId);
        }
        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };
}

export default GameObjectAnimator;
