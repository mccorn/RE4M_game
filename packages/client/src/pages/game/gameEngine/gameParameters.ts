import bg from '@/assets/images/bg.jpeg';
import { ShipType, TPoint } from './gameTypes';

const width = 600;
const height = 600;

/* store ship types and list of coordinates for each */
const ships: Record<ShipType, TPoint[]> = {
    [ShipType.Battlecruiser]: [
        { x: 500, y: 0 },
        { x: 400, y: 0 },
    ],
    [ShipType.Bomber]: [{ x: 250, y: 0 }],
    [ShipType.Fighter]: [{ x: 0, y: 0 }],
    [ShipType.Player]: [{ x: width / 2 - 32, y: height - 64 }],
};

// /* global game params */

const GameParameters = {
    WIDTH: width,
    HEIGHT: height,
    BACKGROUND_IMAGE: bg,
    SHIPS: ships,
    FIRST_LEVEL_LENGTH: 500,
} as const;

export default GameParameters;
