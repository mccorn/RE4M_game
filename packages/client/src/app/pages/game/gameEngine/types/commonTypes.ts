import Trajectory from './trajectory';

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

export type TEnemyType = Exclude<ShipType, ShipType.Player>;

export enum ShotType {
    Enemy,
    Player,
}

export const NEXT_SHIP_DELAY = 1 * 60; // frames per second??? todo to const

/* Common state for ships and shots */
export class DrawableObjectState {
    private coordinates: TPoint;

    // todo private?
    frameIndex: number;

    trajectory: Trajectory;

    constructor(coordinates: TPoint, frameIndex: number, trajectory: Trajectory) {
        this.coordinates = coordinates;
        this.frameIndex = frameIndex;
        this.trajectory = trajectory;
    }

    public setCoordinates = (coordinates: TPoint) => {
        this.coordinates = coordinates;
    };

    public getCoordinates = () => this.coordinates;

    public followTrajectory = (time: number) => {
        const { trajectory } = this;
        if (trajectory.shouldMove(time)) {
            this.setCoordinates(trajectory.getCoordinates(time));
        }
    };
}

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

/* Common object that can be drawn */

export class DrawableGameObject {
    image = new Image();

    state: DrawableObjectState;

    parameters: DrawableObjectParams;

    constructor(state: DrawableObjectState, parameters: DrawableObjectParams) {
        this.state = state;
        this.parameters = parameters;
        this.image.src = parameters.image;
    }
}
