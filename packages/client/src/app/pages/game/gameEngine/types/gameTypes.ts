// eslint-disable-next-line
import BattlecruiserImage from '@/assets/images/ships/Battlecruiser.png';
import BomberImage from '@/assets/images/ships/Bomber.png';
import FighterImage from '@/assets/images/ships/Fighter.png';
import FrigateImage from '@/assets/images/ships/Frigate.png';
import RocketImage from '@/assets/images/shots/Rocket.png';
import PlayerRocketImage from '@/assets/images/shots/PlayerRocket.png';
import { TDirection } from '../gameEngine';
import params from '../parameters/gameParameters';
import { ShipType, TPoint } from './commonTypes';
import Trajectory from './trajectory';

/* Ships and shots states */

// we draw ship in Flying and Exploiding states
export enum LiveState {
    WaitForStart,
    Flying, // todo add Shooting state here?
    Exploiding,
    Dead,
}

export type TCommonGameObjectState = {
    coordinates: TPoint;
    frameIndex: number;
    trajectory: Trajectory; // todo make trajectory for shots
};

export type TShipState = TCommonGameObjectState & {
    liveState: LiveState;
};

export type TShotState = TCommonGameObjectState & {
    show: boolean;
};

/* Common parameters type for ships and shots */

export class DrawableObjectParams {
    width: number;

    height: number;

    image: string;

    imageSpriteWidth: number;

    frameCount: number;

    constructor(
        width: number,
        height: number,
        image: string,
        imageSpriteWidth: number,
        frameCount: number
    ) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.imageSpriteWidth = imageSpriteWidth;
        this.frameCount = frameCount;
    }
}

/* Shots parameters */

class ShotParameters extends DrawableObjectParams {
    updateStateFunction: (state: TShotState, frameCount: number, time: number) => void;

    constructor(
        width: number,
        height: number,
        image: string,
        imageSpriteWidth: number,
        frameCount: number,
        updateStateFunction: (state: TShotState, frameCount: number, time: number) => void
    ) {
        super(width, height, image, imageSpriteWidth, frameCount);
        this.updateStateFunction = updateStateFunction;
    }
}

export enum ShotType {
    Enemy,
    Player,
}

const commonShotParameters = {
    width: 9,
    height: 16,
    imageSpriteWidth: 36,
    frameCount: 4,
};

export const ShotParametersValues: Record<ShotType, ShotParameters> = {
    [ShotType.Enemy]: {
        ...commonShotParameters,
        ...{
            image: RocketImage,
            updateStateFunction: (state: TShotState, frameCount: number) => {
                state.coordinates.y += 1;
                if (state.frameIndex >= frameCount) {
                    state.frameIndex = 0;
                } else {
                    state.frameIndex += 1;
                }
            },
        },
    },
    [ShotType.Player]: {
        ...commonShotParameters,
        ...{
            image: PlayerRocketImage,
            updateStateFunction: (state: TShotState, frameCount: number) => {
                state.coordinates.y -= 1;
                if (state.frameIndex >= frameCount) {
                    state.frameIndex = 0;
                } else {
                    state.frameIndex += 1;
                }
            },
        },
    },
};

/* Ships parameters */

class ShipTypeParams extends DrawableObjectParams {
    updateStateFunction: (
        state: TShipState,
        index: number,
        direction: TDirection | undefined
    ) => void;

    constructor(
        width: number,
        height: number,
        image: string,
        imageSpriteWidth: number,
        frameCount: number,
        updateStateFunction: (
            state: TShipState,
            time: number,
            direction: TDirection | undefined
        ) => void
    ) {
        super(width, height, image, imageSpriteWidth, frameCount);
        this.updateStateFunction = updateStateFunction;
    }
}

const commonEnemyParameters = {
    imageSpriteWidth: 959,
    frameCount: 18,
    updateStateFunction: (state: TShipState, time: number) => {
        const { trajectory } = state;
        if (trajectory && trajectory.shouldMove(time)) {
            state.coordinates = trajectory.getCoordinates(time);
        }

        if (+state.liveState === LiveState.WaitForStart && trajectory.shouldStartMoving(time)) {
            // if ship starts moving set state to Flying
            state.liveState = LiveState.Flying;
        } else if (+state.liveState === LiveState.Flying && trajectory.movedOutOfGameField(time)) {
            // if ship flied out of canvas set state to Dead
            state.liveState = LiveState.Dead;
        }
    },
};

export const ShipTypesParameterValues: Record<ShipType, ShipTypeParams> = {
    [ShipType.Battlecruiser]: {
        ...commonEnemyParameters,
        ...{ height: 128, width: 128, image: BattlecruiserImage },
    },
    [ShipType.Fighter]: {
        ...commonEnemyParameters,
        ...{ height: 64, width: 64, image: FighterImage },
    },
    [ShipType.Bomber]: {
        ...commonEnemyParameters,
        ...{ height: 64, width: 64, image: BomberImage },
    },
    [ShipType.Player]: {
        height: 64,
        width: 64,
        image: FrigateImage,
        imageSpriteWidth: 1024,
        frameCount: 16,
        updateStateFunction: (
            state: TShipState,
            time: number,
            direction: TDirection | undefined
        ) => {
            const step = 7;
            if (direction) {
                switch (direction) {
                    case 'Up':
                        state.coordinates.y = Math.max(state.coordinates.y - step, 0);
                        break;
                    case 'Down':
                        state.coordinates.y = Math.min(
                            state.coordinates.y + step,
                            params.WIDTH - 64
                        );
                        break;
                    case 'Left':
                        state.coordinates.x = Math.max(state.coordinates.x - step, 0);
                        break;
                    case 'Right':
                        state.coordinates.x = Math.min(
                            state.coordinates.x + step,
                            params.WIDTH - 64
                        );
                        break;
                }
            }
        },
    },
} as const;

/* Common object that can be drawn */

export class DrawableGameObject {
    isShip: boolean;

    type: ShipType | ShotType;

    image = new Image();

    state: TShipState | TShotState;

    constructor(
        type: ShipType | ShotType,
        trajectory: Trajectory,
        coordinates?: TPoint,
        isShip = true
    ) {
        this.isShip = isShip;
        this.type = type;

        if (isShip) {
            this.state = {
                coordinates: { x: 0, y: 0 },
                liveState: LiveState.WaitForStart,
                frameIndex: 0,
                trajectory,
            };
        } else {
            this.state = {
                coordinates: { x: coordinates?.x || 0, y: coordinates?.y || 0 },
                show: true,
                frameIndex: 0,
                trajectory,
            };
        }
    }
}

export class GameShip extends DrawableGameObject {
    updateState: (index: number, direction?: TDirection) => void;

    constructor(
        type: ShipType | ShotType,
        trajectory: Trajectory,
        updateFunction: (state: TShipState, index: number, direction?: TDirection) => void
    ) {
        super(type, trajectory);
        this.updateState = (time: number, direction?: TDirection) =>
            updateFunction(this.state as TShipState, time, direction);
    }
}

export class GameShot extends DrawableGameObject {
    updateState: (index: number) => void;

    constructor(
        type: ShipType | ShotType,
        coordinates: TPoint, // todo replace coordinates with trajectory
        trajectory: Trajectory,
        updateFunction: (state: TShotState, frameCount: number, index: number) => void
    ) {
        super(type, trajectory, coordinates, false);
        const shotType = type as ShotType;
        this.updateState = (index: number) =>
            updateFunction(
                this.state as TShotState,
                ShotParametersValues[shotType].frameCount,
                index
            );
        this.image.src = ShotParametersValues[shotType].image;
    }
}
