// eslint-disable-next-line
import { Direction, TDirection } from '../core/gameEngine';
import { DrawableObjectState, DrawableGameObject, ShipType, ShotType, TPoint } from './commonTypes';
import Trajectory from '../objects/trajectory';
import { LiveState, ShipState, ShotState } from '../store/objectState';

import params from '../parameters/gameParameters';
import {
    ShipTypesParameterValues,
    ShotParametersValues,
} from '../parameters/gameObjectsParameters';

export class GameShip extends DrawableGameObject {
    // todo do we need this?
    public type: ShipType;

    constructor(state: DrawableObjectState, type: ShipType) {
        super(state, ShipTypesParameterValues[type]);
        this.type = type;
    }

    protected getShipState = () => this.getState() as ShipState;

    public setLiveState = (state: LiveState) => this.getShipState().setLiveState(state);

    public isDead = () => this.getShipState().isDead();

    public shouldDetectCollision = () => this.getShipState().isFlying();
}

export class EnemyShip extends GameShip {
    constructor(type: ShipType, trajectory: Trajectory) {
        const state = new ShipState(trajectory.getStartPoint(), trajectory, LiveState.WaitForStart);
        super(state, type);
    }

    public updateState = (time: number, shouldChangeFrame: boolean) => {
        this.getShipState().updateEnemyState(time, this.parameters.frameCount, shouldChangeFrame);
    };

    public isWaiting = () => this.getShipState().isWaiting();
}

export class PlayerShip extends GameShip {
    constructor(coordinates: TPoint) {
        const trajectory = new Trajectory([coordinates]); // todo can we remove trajectory?
        const state = new ShipState(coordinates, trajectory, LiveState.Flying);
        super(state, ShipType.Player);
    }

    public updateState = (shouldChangeFrame: boolean, direction?: TDirection) => {
        const step = 2;
        const state = this.getShipState();
        const coordinates = state.getCoordinates();
        const shipSize = 64;
        if (direction) {
            switch (direction) {
                case Direction.Up:
                    state.setCoordinates({
                        x: coordinates.x,
                        y: Math.max(coordinates.y - step, 0),
                    });
                    break;
                case Direction.Down:
                    state.setCoordinates({
                        x: coordinates.x,
                        y: Math.min(coordinates.y + step, params.WIDTH - shipSize),
                    });
                    break;
                case Direction.Left:
                    state.setCoordinates({
                        x: Math.max(coordinates.x - step, 0),
                        y: coordinates.y,
                    });
                    break;
                case Direction.Right:
                    state.setCoordinates({
                        x: Math.min(coordinates.x + step, params.WIDTH - shipSize),
                        y: coordinates.y,
                    });
                    break;
                case Direction.UpLeft:
                    state.setCoordinates({
                        x: Math.max(coordinates.x - step, 0),
                        y: Math.max(coordinates.y - step, 0),
                    });
                    break;
                case Direction.DownLeft:
                    state.setCoordinates({
                        x: Math.max(coordinates.x - step, 0),
                        y: Math.min(coordinates.y + step, params.WIDTH - shipSize),
                    });
                    break;
                case Direction.UpRight:
                    state.setCoordinates({
                        x: Math.min(coordinates.x + step, params.WIDTH - shipSize),
                        y: Math.max(coordinates.y - step, 0),
                    });
                    break;
                case Direction.DownRight:
                    state.setCoordinates({
                        x: Math.min(coordinates.x + step, params.WIDTH - shipSize),
                        y: Math.min(coordinates.y + step, params.WIDTH - shipSize),
                    });
                    break;
            }
        }

        state.changeFrameIndex(this.parameters.frameCount, shouldChangeFrame);
    };
}

export class GameShot extends DrawableGameObject {
    private type: ShotType;

    constructor(type: ShotType, startPoint: TPoint, startTime: number) {
        const parameters = ShotParametersValues[type];
        const trajectory = new Trajectory([
            { x: startPoint.x, y: startPoint.y },
            { x: startPoint.x, y: -parameters.height },
        ]);
        const state = new ShotState(startPoint, trajectory, true, startTime);
        super(state, parameters);
        this.type = type;
    }

    public isVisible = () => (this.getState() as ShotState).isVisible();

    public isPlayerShot = () => +this.type === ShotType.Player;

    public updateState = (time: number, shouldChangeFrame: boolean) => {
        (this.getState() as ShotState).update(time, shouldChangeFrame, this.parameters.frameCount);
    };
}
