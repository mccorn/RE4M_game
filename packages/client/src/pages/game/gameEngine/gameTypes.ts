// eslint-disable-next-line
import BattlecruiserImage from '@/assets/images/ships/Battlecruiser.png';
import BomberImage from '@/assets/images/ships/Bomber.png';
import FighterImage from '@/assets/images/ships/Fighter.png';
import FrigateImage from '@/assets/images/ships/Frigate.png';
import RocketImage from '@/assets/images/shots/Rocket.png';
import PlayerRocketImage from '@/assets/images/shots/PlayerRocket.png';

import { TDirection } from './gameEngine';
import params from './gameParameters';
import Trajectories from './gameTrajectories';

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
    trajectorySegmentIndex: number; // can we move this to traectory class?
    trajectoryStartTime: number; // todo think!
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
            trajectorySegmentIndex: 0,
            trajectoryStartTime: 0,
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
            // console.log(index); // todo replace with time
            console.log(index);
            state.coordinates = { x: state.coordinates.x - 1, y: state.coordinates.y + 1 };
        },
    },
    [ShipType.Fighter]: {
        height: 64,
        width: 64,
        image: FighterImage,
        imageSpriteWidth: 959,
        destructionFrameCount: 18,
        updateStateFunction: (state: ShipState, time: number) => {
            // state.coordinates = { x: state.coordinates.x + time, y: state.coordinates.y + time };

            if (state.trajectorySegmentIndex < Trajectories.Fighter.getSegmentsNumber()) {
                // console.log('state.trajectorySegmentIndex ' + state.trajectorySegmentIndex);
                state.coordinates = Trajectories.Fighter.getCoordinates(
                    state.trajectorySegmentIndex,
                    time - state.trajectoryStartTime
                );
                console.log('state.coordinates');
                console.log(state.coordinates);
                if (Trajectories.Fighter.shouldSwitchSegment(state.trajectorySegmentIndex, time)) {
                    state.trajectorySegmentIndex += 1;
                    state.trajectoryStartTime = time;
                }
            }
        },
    },
    [ShipType.Bomber]: {
        height: 64,
        width: 64,
        image: BomberImage,
        imageSpriteWidth: 959,
        destructionFrameCount: 18,
        updateStateFunction: (state: ShipState, time: number) => {
            console.log(time); // todo replace index with performance.now???
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
            const step = 7;
            if (direction) {
                switch (direction) {
                    case 'Up':
                        state.coordinates.y = Math.max(state.coordinates.y - step, 0);
                        break;
                    case 'Down':
                        state.coordinates.y = Math.min(
                            state.coordinates.y + step,
                            params.WIDTH - 64 // todo 64
                        );
                        break;
                    case 'Left':
                        state.coordinates.x = Math.max(state.coordinates.x - step, 0);
                        break;
                    case 'Right':
                        state.coordinates.x = Math.min(
                            state.coordinates.x + step,
                            params.WIDTH - 64 // todo 64
                        );
                        break;
                }
            }
        },
    },
} as const;

type ShotState = {
    coordinates: TPoint;
    show: boolean;
    frameIndex: number;
};

type ShotParameters = {
    width: number;
    height: number;
    image: string;
    imageSpriteWidth: number;
    frameCount: number;
    updateStateFunction: (state: ShotState, frameCount: number, index: number) => void;
};

const enemyShot: ShotParameters = {
    width: 9,
    height: 16,
    image: RocketImage,
    imageSpriteWidth: 36,
    frameCount: 4,
    updateStateFunction: (state: ShotState, frameCount: number) => {
        state.coordinates.y += 1;
        if (state.frameIndex >= frameCount) {
            state.frameIndex = 0;
        } else {
            state.frameIndex += 1;
        }
    },
};

const playerShot: ShotParameters = {
    width: 9,
    height: 16,
    image: PlayerRocketImage,
    imageSpriteWidth: 36,
    frameCount: 4,
    updateStateFunction: (state: ShotState, frameCount: number) => {
        state.coordinates.y -= 1;
        if (state.frameIndex >= frameCount) {
            state.frameIndex = 0;
        } else {
            state.frameIndex += 1;
        }
    },
};

export enum ShotType {
    Enemy,
    Player,
}

export const ShotParametersValues: Record<ShotType, ShotParameters> = {
    [ShotType.Enemy]: enemyShot,
    [ShotType.Player]: playerShot,
};

export class GameShot {
    type: ShotType;

    image = new Image();

    state: ShotState;

    updateState: (index: number) => void;

    constructor(
        type: ShotType,
        coordinates: TPoint,
        updateFunction: (state: ShotState, frameCount: number, index: number) => void
    ) {
        this.type = type;
        this.state = {
            coordinates: { x: coordinates.x, y: coordinates.y },
            show: true,
            frameIndex: 0,
        };
        this.updateState = (index: number) =>
            updateFunction(this.state, ShotParametersValues[type].frameCount, index);
        this.image.src = ShotParametersValues[type].image; // todo make the same for GameShip
    }
}
