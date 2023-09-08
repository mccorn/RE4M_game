import {
    DrawableGameObject,
    GameShip,
    GameShot,
    LiveState,
    ShipTypesParameterValues,
    ShotParametersValues,
    ShotType,
} from './types/gameTypes';
import state from './store/mockGameState';
import CollisionManager from './collisionManager';

class GameObjectAnimator {
    private context: CanvasRenderingContext2D;

    private frameCount = 0;

    public mainLoopIndex = 0;

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

    private updateStateAndDrawShip = (ship: GameShip, shouldChangeFrame: boolean) => {
        // todo better name ???
        // common shouldBeUpdated for all updatable and drawable!!!
        if (ship.shouldBeUpdated()) {
            ship.updateState(this.mainLoopIndex, shouldChangeFrame);
            const { liveState } = ship.getState();
            if (liveState !== LiveState.WaitForStart) {
                this.drawFrame(ship);
            }
        }
    };

    private updateStateAndDrawShot = (shot: GameShot, shouldChangeFrame: boolean) => {
        if (shot.isVisible()) {
            shot.updateState(this.mainLoopIndex, shouldChangeFrame);
            this.drawFrame(shot);
        }
    };

    private startMainLoop = () => {
        if (this.isStopped) {
            window.cancelAnimationFrame(this.requestId);
            return;
        }

        this.drawBackground();

        this.frameCount++;

        const shouldChangeFrame = this.frameCount === this.IMAGE_CHANGE_SPEED;

        /* draw player */
        const { player } = state;
        this.updateStateAndDrawShip(player, shouldChangeFrame);

        /* draw enemies */
        state.enemies.forEach(ship => this.updateStateAndDrawShip(ship, shouldChangeFrame));

        /* draw shots */
        state.shots.forEach(shot => this.updateStateAndDrawShot(shot, shouldChangeFrame));

        if (shouldChangeFrame) {
            this.frameCount = 0;
        }

        /* detect if any ship is hit */
        CollisionManager.collisionDetection();

        /* game state logic, how can we move it somewhere to divide from animation logic? */

        if (player.isDead()) {
            console.log('game ends');
            this.isStopped = true;
            window.cancelAnimationFrame(this.requestId);
            this.drawGameEnd();
        }

        if (this.mainLoopIndex === state.getLevelTime()) {
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
