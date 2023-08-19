import { GameFieldParameters as params, Enemies, EnemyTypes, TPoint } from './gameTypes';
import Enemy3 from '@/assets/images/3.png';
import Enemy2 from '@/assets/images/2.png';
import Enemy1 from '@/assets/images/1.png';
// todo remove
const tempDrawCells = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(
        params.ENEMIES_START_POINT.x,
        params.ENEMIES_START_POINT.y,
        params.CELL_SIZE * 3,
        params.CELL_SIZE
    );
    ctx.strokeRect(
        params.ENEMIES_START_POINT.x,
        params.ENEMIES_START_POINT.y,
        params.CELL_SIZE * 3,
        params.CELL_SIZE * 2
    );
    ctx.strokeRect(
        params.ENEMIES_START_POINT.x,
        params.ENEMIES_START_POINT.y,
        params.CELL_SIZE * 3,
        params.CELL_SIZE * 3
    );
    ctx.strokeRect(
        params.ENEMIES_START_POINT.x + params.CELL_SIZE,
        params.ENEMIES_START_POINT.y,
        params.CELL_SIZE,
        params.CELL_SIZE * 3
    );
};
class EnemyManager {
    context: CanvasRenderingContext2D;

    enemyThirdImage: HTMLImageElement;

    enemySecondImage: HTMLImageElement;

    enemyFirstImage: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;

        this.enemyThirdImage = new Image();
        this.enemyThirdImage.src = Enemy3;

        this.enemySecondImage = new Image();
        this.enemySecondImage.src = Enemy2;

        this.enemyFirstImage = new Image();
        this.enemyFirstImage.src = Enemy1;

        // this.enemyImage.addEventListener('load')
    }

    private drawEnemiesGridFromStartPoint = () => {
        tempDrawCells(this.context);
        this.drawEnemies();
    };

    private drawEnemies = () => {
        console.log('types');

        // todo is there a way to iterate enum ??
        const values = Object.values(EnemyTypes).filter(v => !Number.isNaN(Number(v)));
        values.forEach(type => {
            const revretedType = type as EnemyTypes;
            const number = params.ENEMIES[revretedType];
            const y = EnemyManager.calculateEnemyRowY(revretedType);
            this.drawEnemyRow(revretedType, number, y);
        });
        console.log('types ended');
    };

    private drawEnemyRow = (type: EnemyTypes, number: number, y: number) => {
        let point: TPoint = {
            x: params.ENEMIES_START_POINT.x + EnemyManager.calculateEnemyGapInCell(type),
            y,
        };
        // eslint-disable-next-line
        for (let i = 0; i < number; i++) {
            this.drawEnemy(point, type);
            point = { x: point.x + params.CELL_SIZE, y: point.y };
        }
    };

    private drawEnemy = (point: TPoint, type: EnemyTypes) => {
        // const enemy = Enemies[type];
        switch (type) {
            case EnemyTypes.THIRD:
                this.context.drawImage(this.enemyThirdImage, point.x, point.y);
                break;
            case EnemyTypes.SECOND:
                this.context.drawImage(this.enemySecondImage, point.x, point.y);
                break;
            case EnemyTypes.FIRST:
                this.context.drawImage(this.enemyFirstImage, point.x, point.y);
                break;
        }

        /* else {
            this.context.fillStyle = enemy.color;
            this.context.fillRect(point.x, point.y, enemy.size, enemy.size);
        } */
    };

    private static calculateEnemyGapInCell = (type: EnemyTypes) =>
        (params.CELL_SIZE - Enemies[type].size) / 2;

    private static calculateEnemyRowY = (type: EnemyTypes) => {
        const rowNumber = params.ENEMY_ROWS[type];
        return (
            params.ENEMIES_START_POINT.y +
            params.CELL_SIZE * (rowNumber - 1) +
            EnemyManager.calculateEnemyGapInCell(type)
        );
    };

    /* public api */
    public drawEnemiesOnGameStart = () => {
        // todo animation on start !!!
        /* let point: TPoint = {
            x: -300,
            y: params.ENEMIES_START_POINT.y,
        };
        for (let i = 0; i < params.ENEMIES_START_POINT.x; i++) {
            drawEnemiesGridFromStartPoint(point, ctx);
            point.x = point.x + i;
        } */

        this.drawEnemiesGridFromStartPoint();
    };
}

export default EnemyManager;
