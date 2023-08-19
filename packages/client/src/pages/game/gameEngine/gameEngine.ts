import { GameFieldParameters as params } from './gameTypes';
import EnemyManager from './enemies';
import PlayerManager from './player';

// todo do we need this
/* const checkPoint = (point: TPoint): boolean => {
    if (point.x > params.WIDTH || point.y > params.HEIGHT) {
        console.log('Point coordinates are out of the canvas');
        return false;
    }
    return true;
}; */

class GameEngine {
    context: CanvasRenderingContext2D;

    enemyManager: EnemyManager;

    playerManager: PlayerManager;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.enemyManager = new EnemyManager(ctx);
        this.playerManager = new PlayerManager(ctx);
    }

    private drawGameField = () => {
        this.context.fillStyle = params.BACKGROUND_COLOR;
        this.context.fillRect(0, 0, params.WIDTH, params.HEIGHT);
    };

    /* public api */

    public drawInitialGameState() {
        this.drawGameField();
    }

    public drawStartGameState = () => {
        this.playerManager.drawPlayerOnGameStart();
        this.enemyManager.drawEnemiesOnGameStart();
    };
}

export default GameEngine;
