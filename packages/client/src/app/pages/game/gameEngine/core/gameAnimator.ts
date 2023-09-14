import { DrawableGameObject } from '../types/commonTypes';
import PlayerShip from '../types/playerShip';
import CollisionManager from './collisionManager';
import gameState from '../store/gameState';
import { GlobalGameState } from '../store/objectState';
import GameEngine from './gameEngine';
import EnemyShip from '../types/EnemyShip';
import GameShot from '../types/gameShot';

class GameAnimator {
    private context: CanvasRenderingContext2D;

    private frameCount = 0;

    public mainLoopIndex = 0;

    private requestId = -1;

    private IMAGE_CHANGE_SPEED = 5; // 1 per 5 frames image changes

    private isStopped = false;

    private drawBackground: () => void;

    constructor(ctx: CanvasRenderingContext2D, drawBackground: () => void) {
        this.context = ctx;
        this.drawBackground = drawBackground;
    }

    private drawFrame = (object: DrawableGameObject) => {
        const parameters = object.getParameters();
        const state = object.getState();
        const spriteX = parameters.width * state.getFrameIndex();
        const coordinates = state.getCoordinates();
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

        const { player } = gameState;
        this.updateAndDrawPlayer(player, shouldChangeFrame);

        gameState.enemies.forEach(enemy => this.updateAndDrawEnemy(enemy, shouldChangeFrame));

        gameState.shots.forEach(shot => this.updateAndDrawShot(shot, shouldChangeFrame));

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
            GameEngine.getInstance().setGameState(GlobalGameState.Ended);
        }

        if (this.mainLoopIndex === gameState.getLevelTime()) {
            console.log('level ends');
            this.isStopped = true;
            window.cancelAnimationFrame(this.requestId);
            GameEngine.getInstance().setGameState(GlobalGameState.LevelEnded);
        }

        this.mainLoopIndex++; // do we need to replace this with time?

        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };

    public reset = () => {
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

export default GameAnimator;
