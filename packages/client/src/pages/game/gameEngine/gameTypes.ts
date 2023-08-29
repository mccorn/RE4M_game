import BattlecruiserImage from '@/assets/images/ships/Battlecruiser.png';
import BomberImage from '@/assets/images/ships/Bomber.png';
import FighterImage from '@/assets/images/ships/Fighter.png';
import FrigateImage from '@/assets/images/ships/Frigate.png';
import { TDirection } from './gameEngine';

export type TPoint = {
    x: number;
    y: number;
};

// todo add dead state to loop
export enum LiveState {
    Normal,
    Exploiding,
    Dead,
}

// state will have coordinates, normal or exploiding, destruction index
export type ShipState = {
    coordinates: TPoint;
    liveState: LiveState;
    destructionIndex: number;
};

export enum ShipType {
    // todo each has image, size and updateCoordinates
    Battlecruiser,
    Bomber,
    Fighter,
    Player,
}

/* common ship type - has coordinates, type and state */

// todo ship state of two types enemy and player depending on the type
export class GameShip {
    type: ShipType;

    image = new Image();

    state: ShipState;

    updateState: (index: number, direction?: TDirection) => void;

    constructor(
        type: ShipType,
        coordinates: TPoint,
        updateFunction: (state: ShipState, index: number, direction?: TDirection) => void
    ) {
        this.type = type;
        this.state = {
            coordinates,
            liveState: LiveState.Normal,
            destructionIndex: 0,
        };
        this.updateState = (index: number, direction?: TDirection) =>
            updateFunction(this.state, index, direction);
    }
}

// todo additional parameters
// lives: number; // 1 live - killed by one shot, 2 lives - killed by two shots
// shootSpeed: 1 | 2; // two modes of shooting speed
// hasSpecialShot: boolean;

type ShipTypeParameters = {
    width: number;
    height: number;
    image: string;
    imageSpriteWidth: number;
    destructionFrameCount: number;
    updateStateFunction: (
        state: ShipState,
        index: number,
        direction: TDirection | undefined
    ) => void;
};

export const ShipTypesParameterValues: Record<ShipType, ShipTypeParameters> = {
    [ShipType.Battlecruiser]: {
        height: 128,
        width: 128,
        image: BattlecruiserImage,
        imageSpriteWidth: 959,
        destructionFrameCount: 18,
        updateStateFunction: (state: ShipState, index: number) => {
            if (index === 150) {
                state.liveState = LiveState.Exploiding;
            }
            state.coordinates = { x: state.coordinates.x - 1, y: state.coordinates.y + 1 };
        },
    },
    [ShipType.Fighter]: {
        height: 64,
        width: 64,
        image: FighterImage,
        imageSpriteWidth: 959,
        destructionFrameCount: 18,
        updateStateFunction: (state: ShipState, index: number) => {
            if (index === 180) {
                state.liveState = LiveState.Exploiding;
            }
            state.coordinates = { x: state.coordinates.x + 1, y: state.coordinates.y + 1 };
        },
    },
    [ShipType.Bomber]: {
        height: 64,
        width: 64,
        image: BomberImage,
        imageSpriteWidth: 959,
        destructionFrameCount: 18,
        updateStateFunction: (state: ShipState, index: number) => {
            if (index === 210) {
                state.liveState = LiveState.Exploiding;
            }
            state.coordinates = { x: state.coordinates.x, y: state.coordinates.y + 1 };
        },
    },
    [ShipType.Player]: {
        height: 64,
        width: 64,
        image: FrigateImage,
        imageSpriteWidth: 1024,
        destructionFrameCount: 16,
        updateStateFunction: (
            state: ShipState,
            index: number,
            direction: TDirection | undefined
        ) => {
            if (direction) {
                switch (direction) {
                    case 'Up':
                        state.coordinates.y--;
                        break;
                    case 'Down':
                        state.coordinates.y++;
                        break;
                    case 'Left':
                        state.coordinates.x--;
                        break;
                    case 'Right':
                        state.coordinates.x++;
                        break;
                }
            }
        },
    },
} as const;
