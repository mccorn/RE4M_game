export type TPoint = {
    x: number;
    y: number;
};

export enum ShipType {
    Battlecruiser,
    Bomber,
    Fighter,
    Player,
}

// todo do we need this???
export type TEnemyType = Exclude<ShipType, ShipType.Player>;

export const NEXT_SHIP_DELAY = 1 * 60; // frames per second??? todo to const
