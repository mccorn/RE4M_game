import { GameFieldParameters as params, Enemies, EnemyTypes, TPoint } from './gameTypes';

export const calculateEnemyPoint = (type: EnemyTypes) => {
    const enemy = Enemies[type];
    return { x: params.WIDTH / 2 - enemy.size / 2, y: params.HEIGHT / 2 };
};

export const drawEnemy = (ctx: CanvasRenderingContext2D, point: TPoint, type: EnemyTypes) => {
    console.log(type);
    const enemy = Enemies[type];
    ctx.fillStyle = 'red';
    ctx.fillRect(point.x, point.y, enemy.size, enemy.size);
};

const calculateEnemyGapInCell = (type: EnemyTypes) => (params.CELL_SIZE - Enemies[type].size) / 2;

const calculateEnemyRowY = (type: EnemyTypes) => {
    const rowNumber = params.ENEMY_ROWS[type];
    return (
        params.ENEMIES_START_POINT.y +
        params.CELL_SIZE * (rowNumber - 1) -
        calculateEnemyGapInCell(type)
    );
};

const calculateEnemyXCoordinate = (initialX: number, enemyType: EnemyTypes): number =>
    initialX + params.CELL_SIZE + calculateEnemyGapInCell(enemyType);

const drawEnemyRow = (
    type: EnemyTypes,
    number: number,
    y: number,
    ctx: CanvasRenderingContext2D
) => {
    let point: TPoint = { x: params.ENEMIES_START_POINT.x, y };
    // eslint-disable-next-line
    for (let i = 0; i < number; i++) {
        drawEnemy(ctx, point, type);
        point = { x: calculateEnemyXCoordinate(point.x, type), y: point.y };
    }
};

const drawEnemies = (enemiesList: Record<EnemyTypes, number>, ctx: CanvasRenderingContext2D) => {
    /* draw third type */
    const numberOfBigEnemies = enemiesList[EnemyTypes.THIRD];
    const y = calculateEnemyRowY(EnemyTypes.THIRD);
    drawEnemyRow(EnemyTypes.THIRD, numberOfBigEnemies, y, ctx);
};

export const drawEnemiesInitially = (ctx: CanvasRenderingContext2D) => {
    // todo which type to use unique key
    const enemies: Record<EnemyTypes, number> = {
        [EnemyTypes.FIRST]: 3,
        [EnemyTypes.SECOND]: 3,
        [EnemyTypes.THIRD]: 3,
    };
    drawEnemies(enemies, ctx);
};
