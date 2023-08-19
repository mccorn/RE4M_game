export enum EnemyTypes {
    FIRST,
    SECOND,
    THIRD,
}

const enemyRows: Record<EnemyTypes, number> = {
    [EnemyTypes.THIRD]: 1,
    [EnemyTypes.SECOND]: 2,
    [EnemyTypes.FIRST]: 3,
};

export const GameFieldParameters = {
    WIDTH: 600,
    HEIGHT: 600,
    BACKGROUND_COLOR: 'black',
    CELL_SIZE: 100,
    ENEMIES_START_POINT: {
        x: 50,
        y: 50,
    },
    ENEMY_ROWS: enemyRows,
} as const;

export const Player = {
    WIDTH: 50,
    HEIGHT: 50,
};

export type TEnemy = {
    lives: number; // 1 live - killed by one shot, 2 lives - killed by two shots
    shootSpeed: 1 | 2; // two modes of shooting speed
    hasSpecialShot: boolean;
    size: 50 | 60 | 70;
};

export type TPoint = {
    x: number;
    y: number;
};

export const Enemies: Record<EnemyTypes, TEnemy> = {
    [EnemyTypes.FIRST]: {
        lives: 1,
        shootSpeed: 1,
        hasSpecialShot: false,
        size: 50,
    },
    [EnemyTypes.SECOND]: {
        lives: 1,
        shootSpeed: 2,
        hasSpecialShot: false,
        size: 60,
    },
    [EnemyTypes.THIRD]: {
        lives: 2,
        shootSpeed: 2,
        hasSpecialShot: true,
        size: 70,
    },
} as const;
