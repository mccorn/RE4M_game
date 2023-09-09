import { DrawableGameObject } from './types/commonTypes';
import { EnemyShip, PlayerShip, GameShot } from './types/gameTypes';
import CollisionManager from './collisionManager';
import state from './store/mockGameState';

class GameStateManager {
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
        const { parameters } = object;
        const spriteX = parameters.width * object.state.frameIndex;
        const coordinates = object.state.getCoordinates();
        this.context.drawImage(
            object.image,
            spriteX,
            0,
            parameters.width,
            parameters.height,
            coordinates.x,
            coordinates.y,
            parameters.width,
            parameters.height
        );
    };

    private updateAndDrawPlayer = (player: PlayerShip, shouldChangeFrame: boolean) => {
        if (!player.isDead()) {
            player.updateState(shouldChangeFrame);
            this.drawFrame(player);
        }
    };

    private updateAndDrawEnemy = (enemy: EnemyShip, shouldChangeFrame: boolean) => {
        if (!enemy.isDead()) {
            enemy.updateState(this.mainLoopIndex, shouldChangeFrame);
            if (!enemy.isWaiting()) {
                this.drawFrame(enemy);
            }
        }
    };

    private updateAndDrawShot = (shot: GameShot, shouldChangeFrame: boolean) => {
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

        /* update objects state and draw them */

        const { player } = state;
        this.updateAndDrawPlayer(player, shouldChangeFrame);

        state.enemies.forEach(enemy => this.updateAndDrawEnemy(enemy, shouldChangeFrame));

        state.shots.forEach(shot => this.updateAndDrawShot(shot, shouldChangeFrame));

        if (shouldChangeFrame) {
            this.frameCount = 0;
        }

        /* detect if any ship is hit */

        CollisionManager.collisionDetection();

        /* game state logic */

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
}

export default GameStateManager;
