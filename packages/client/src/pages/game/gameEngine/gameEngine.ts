import { GameFieldParameters, TPoint } from './gameTypes';
import { drawEnemiesInitially } from './enemies';
import { calculateInitialPlayerPoint, drawPlayer } from './player';

const checkPoint = (point: TPoint): boolean => {
    if (point.x > GameFieldParameters.WIDTH || point.y > GameFieldParameters.HEIGHT) {
        console.log('Point coordinates are out of the canvas');
        return false;
    }
    return true;
};

const drawGameField = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = GameFieldParameters.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, GameFieldParameters.WIDTH, GameFieldParameters.HEIGHT);
};

export const drawInitialGameState = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.log('no context found');
        return;
    }
    drawGameField(ctx);
};

export const drawStartGameState = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log('no context found');
        return;
    }
    // todo calculate this 1 time and use in multiple places
    const initialPlayerPoint = calculateInitialPlayerPoint();
    if (!checkPoint(initialPlayerPoint)) {
        console.log('player point is out if canvas');
        return;
    }
    drawPlayer(initialPlayerPoint, ctx);

    /* const enemyPoint = calculateEnemyPoint(EnemyTypes.FIRST);
    if (!checkPoint(enemyPoint)) {
        console.log('enemy point is out if canvas');
        return;
    }

    drawEnemy(ctx, enemyPoint, EnemyTypes.FIRST); */
    drawEnemiesInitially(ctx);
};
