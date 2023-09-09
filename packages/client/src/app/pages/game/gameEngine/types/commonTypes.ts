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

    protected frameIndex = 0;

    protected trajectory: Trajectory;

    constructor(coordinates: TPoint, trajectory: Trajectory) {
        this.coordinates = coordinates;
        this.trajectory = trajectory;
    }

    public setCoordinates = (coordinates: TPoint) => {
        this.coordinates = coordinates;
    };

    public getCoordinates = () => this.coordinates;

    public getFrameIndex = () => this.frameIndex;

    public followTrajectory = (time: number) => {
        const { trajectory } = this;
        if (trajectory.shouldMove(time)) {
            this.setCoordinates(trajectory.getCoordinates(time));
        }
    };
}

/* Common parameters type for ships and shots */
export class DrawableObjectParams {
    public width: number;

    public height: number;

    public image: string;

    public frameCount: number;

    constructor(width: number, height: number, image: string, imageSpriteWidth: number) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.frameCount = imageSpriteWidth / width;
    }
}

/* Common object that can be drawn */

export class DrawableGameObject {
    public image = new Image();

    protected state: DrawableObjectState;

    protected parameters: DrawableObjectParams;

    constructor(state: DrawableObjectState, parameters: DrawableObjectParams) {
        this.state = state;
        this.parameters = parameters;
        this.image.src = parameters.image;
    }

    public getState(): DrawableObjectState {
        return this.state;
    }

    public getParameters(): DrawableObjectParams {
        return this.parameters;
    }
}
