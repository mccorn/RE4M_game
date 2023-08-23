import EnemyManager from './enemies';
import PlayerManager, { TDirection } from './player';
import BackgroundManager from './background';

// todo do we need this
/* const checkPoint = (point: TPoint): boolean => {
    if (point.x > params.WIDTH || point.y > params.HEIGHT) {
        console.log('Point coordinates are out of the canvas');
        return false;
    }
    return true;
}; */

/* type TControlKey = {
    key: {
        Code: number;
        Action: 'direction' | 'fire' | 'pause';
        Direction?: TDirection;
        // direction name
    };
}; */

const ControlKeys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    PAUSE: 'Enter',
    FIRE: '',
};

class GameEngine {
    context: CanvasRenderingContext2D;

    enemyManager: EnemyManager;

    playerManager: PlayerManager;

    backgroundManager: BackgroundManager;

    // eslint-disable-next-line
    timer: NodeJS.Timer | null;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.enemyManager = new EnemyManager(ctx);
        this.playerManager = new PlayerManager(ctx);
        this.backgroundManager = new BackgroundManager(ctx);
        this.timer = null;
    }

    /* public api */

    public loadGame() {
        this.backgroundManager.renderGameField();
    }

    public startGame = () => {
        this.playerManager.drawPlayerOnGameStart();
        // this.enemyManager.drawEnemiesOnGameStart();
        // this.timer = this.backgroundManager.renderSpaceWithStars();
    };

    public pauseGame = () => {
        this.timer && clearInterval(this.timer);
    };

    public endGame = () => {
        // this.backgroundManager.renderGameField();
        this.backgroundManager.renderGameEnd();
    };

    public gameControlPressed = (event: KeyboardEvent) => {
        this.backgroundManager.renderGameField();

        // todo make with direction prop??

        let direction: TDirection | null = null;
        if (event.key === ControlKeys.UP) {
            direction = 'Up';
        } else if (event.key === ControlKeys.DOWN) {
            direction = 'Down';
        } else if (event.key === ControlKeys.LEFT) {
            direction = 'Left';
        } else if (event.key === ControlKeys.RIGHT) {
            direction = 'Right';
        }

        direction && this.playerManager.movePlayer(direction);
    };
}

export default GameEngine;
