// eslint-disable-next-line
import BattlecruiserImage from '@/assets/images/game/ships/Battlecruiser.png';
import BomberImage from '@/assets/images/game/ships/Bomber.png';
import FighterImage from '@/assets/images/game/ships/Fighter.png';
import FrigateImage from '@/assets/images/game/ships/Frigate.png';
import RocketImage from '@/assets/images/game/shots/Rocket.png';
import PlayerRocketImage from '@/assets/images/game/shots/PlayerRocket.png';
import { TDirection } from '../gameEngine';
import params from '../parameters/gameParameters';
import { ShipType, TPoint } from './commonTypes';
import Trajectory from './trajectory';

/* Ships and shots states */

// we draw ship in Flying, Shooting and Exploiding states
export enum LiveState {
    WaitForStart,
    Flying,
    Shooting,
    Exploiding,
    Dead,
}

export type TCommonGameObjectState = {
    coordinates: TPoint;
    frameIndex: number;
    trajectory: Trajectory;
};

export type TShipState = TCommonGameObjectState & { liveState: LiveState };

export type TShotState = TCommonGameObjectState & { show: boolean };

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
    updateStateFunction: (
        state: TShotState,
        frameCount: number,
        startTime: number,
        time: number,
        shouldChangeFrame: boolean
    ) => void;

    constructor(
        width: number,
        height: number,
        image: string,
        imageSpriteWidth: number,
        frameCount: number,
        updateStateFunction: (
            state: TShotState,
            frameCount: number,
            startTime: number,
            time: number,
            shouldChangeFrame: boolean
        ) => void
    ) {
        super(width, height, image, imageSpriteWidth, frameCount);
        this.updateStateFunction = updateStateFunction;
    }
}

export enum ShotType {
    Enemy,
    Player,
}

const shotParams = {
    width: 9,
    height: 16,
    imageSpriteWidth: 36,
    frameCount: 4,
    updateStateFunction: (
        state: TShotState,
        frameCount: number,
        startTime: number,
        time: number
    ) => {
        const { trajectory } = state;
        const deltaTime = time - startTime;
        if (trajectory && trajectory.shouldMove(deltaTime)) {
            state.coordinates = trajectory.getCoordinates(deltaTime);
        }
        if (state.frameIndex >= frameCount) {
            state.frameIndex = 0;
        } else {
            state.frameIndex += 1;
        }
    },
};

export const ShotParametersValues: Record<ShotType, ShotParameters> = {
    [ShotType.Enemy]: { ...shotParams, ...{ image: RocketImage } },
    [ShotType.Player]: { ...shotParams, ...{ image: PlayerRocketImage } },
};

/* Ships parameters */

class ShipTypeParams extends DrawableObjectParams {
    updateStateFunction: (
        state: TShipState,
        time: number,
        shouldChangeFrame: boolean,
        frameCount: number,
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
            shouldChangeFrame: boolean,
            frameCount: number,
            direction: TDirection | undefined
        ) => void
    ) {
        super(width, height, image, imageSpriteWidth, frameCount);
        this.updateStateFunction = updateStateFunction; // todo this instead of frameCount??
    }
}

const changeFrameIndex = (state: TShipState, frameCount: number, shouldChangeFrame: boolean) => {
    if (+state.liveState === LiveState.Exploiding) {
        if (state.frameIndex >= frameCount) {
            state.liveState = LiveState.Dead;
        } else if (shouldChangeFrame) {
            state.frameIndex++;
        }
    }
};

const commonEnemyParameters = {
    imageSpriteWidth: 959,
    frameCount: 18,
    updateStateFunction: (
        state: TShipState,
        time: number,
        shouldChangeFrame: boolean,
        frameCount: number
    ) => {
        const { trajectory } = state;
        if (trajectory && trajectory.shouldMove(time)) {
            state.coordinates = trajectory.getCoordinates(time);
        }

        changeFrameIndex(state, frameCount, shouldChangeFrame);

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
            shouldChangeFrame: boolean,
            frameCount: number,
            direction: TDirection | undefined
        ) => {
            const step = 2;
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
                    case 'UpLeft':
                        state.coordinates.x = Math.max(state.coordinates.x - step, 0);
                        state.coordinates.y = Math.max(state.coordinates.y - step, 0);
                        break;
                    case 'UpRight':
                        state.coordinates.x = Math.min(
                            state.coordinates.x + step,
                            params.WIDTH - 64
                        );
                        state.coordinates.y = Math.max(state.coordinates.y - step, 0);
                        break;
                    case 'DownLeft':
                        state.coordinates.x = Math.max(state.coordinates.x - step, 0);
                        state.coordinates.y = Math.min(
                            state.coordinates.y + step,
                            params.WIDTH - 64
                        );
                        break;
                    case 'DownRight':
                        state.coordinates.x = Math.min(
                            state.coordinates.x + step,
                            params.WIDTH - 64
                        );
                        state.coordinates.y = Math.min(
                            state.coordinates.y + step,
                            params.WIDTH - 64
                        );
                        break;
                }
            }

            changeFrameIndex(state, frameCount, shouldChangeFrame);
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

        const isPlayerShip = +type === ShipType.Player;
        const coords = isShip && isPlayerShip && coordinates ? coordinates : { x: 0, y: 0 };
        const commonStateParams = {
            coordinates: coords,
            frameIndex: 0,
            trajectory,
        };

        if (isShip) {
            this.state = {
                ...commonStateParams,
                ...{
                    liveState: isPlayerShip ? LiveState.Flying : LiveState.WaitForStart,
                },
            };
        } else {
            this.state = { ...commonStateParams, ...{ show: true } };
        }
    }
}

export class GameShip extends DrawableGameObject {
    updateState: (time: number, shouldChangeFrame: boolean, direction?: TDirection) => void;

    constructor(type: ShipType, trajectory: Trajectory, coordinates?: TPoint) {
        super(type, trajectory, coordinates);
        const parameters = ShipTypesParameterValues[type];
        this.updateState = (time: number, shouldChangeFrame: boolean, direction?: TDirection) =>
            parameters.updateStateFunction(
                this.state as TShipState,
                time,
                shouldChangeFrame,
                parameters.frameCount, // todo
                direction
            );
        this.image.src = parameters.image;
    }
}

export class GameShot extends DrawableGameObject {
    updateState: (time: number, shouldChangeFrame: boolean) => void;

    startTime: number;

    constructor(type: ShotType, trajectory: Trajectory, startTime: number) {
        super(type, trajectory, undefined, false); // coordinates, false);
        const parameters = ShotParametersValues[type];
        this.updateState = (time: number, shouldChangeFrame: boolean) =>
            parameters.updateStateFunction(
                this.state as TShotState,
                parameters.frameCount,
                startTime,
                time,
                shouldChangeFrame
            );
        this.image.src = parameters.image;
        this.startTime = startTime;
    }
}
