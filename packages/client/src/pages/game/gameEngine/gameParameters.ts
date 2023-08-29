/* parameters of the game like game field, ship number and coordinates, etc. */

import bg from '@/assets/images/bg.jpeg';
import { ShipType, TPoint } from './gameTypes';

// todo store types and coordinates
const ships: Record<ShipType, TPoint[]> = {
    [ShipType.Battlecruiser]: [
        { x: 500, y: 0 },
        { x: 400, y: 0 },
    ],
    [ShipType.Bomber]: [{ x: 250, y: 0 }],
    [ShipType.Fighter]: [{ x: 0, y: 0 }],
    [ShipType.Player]: [{ x: 600 / 2 - 32, y: 600 - 100 }],
    // todo circular dependency GameParameters.WIDTH GameParameters.HEIGHT
}; // as const; todo const

const GameParameters = {
    WIDTH: 600,
    HEIGHT: 600,
    BACKGROUND_IMAGE: bg,
    SHIPS: ships,
    FIRST_LEVEL_LENGTH: 500,
} as const;

export default GameParameters;
