// eslint-disable-next-line
import { TDirection } from '../gameEngine';
import { DrawableObjectState, DrawableGameObject, ShipType, ShotType, TPoint } from './commonTypes';
import Trajectory from './trajectory';
import { LiveState, ShipState, ShotState } from './objectState';

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

    public getState = () => this.state as ShipState;

    public setLiveState = (state: LiveState) => this.getState().setLiveState(state);

    public isDead = () => this.getState().isDead();

    public shouldDetectCollision = () => this.getState().isFlying();
}

export class EnemyShip extends GameShip {
    constructor(type: ShipType, trajectory: Trajectory) {
        const state = new ShipState(trajectory.getStartPoint(), trajectory, LiveState.WaitForStart);
        super(state, type);
    }

    public updateState = (time: number, shouldChangeFrame: boolean) => {
        this.getState().updateEnemyState(time, this.parameters.frameCount, shouldChangeFrame);
    };

    public isWaiting = () => this.getState().isWaiting();
}

export class PlayerShip extends GameShip {
    constructor(coordinates: TPoint) {
        const trajectory = new Trajectory([coordinates]); // todo can we remove trajectory?
        const state = new ShipState(coordinates, trajectory, LiveState.Flying);
        super(state, ShipType.Player);
    }

    public updateState = (shouldChangeFrame: boolean, direction?: TDirection) => {
        const step = 7;
        const state = this.getState();
        const coordinates = state.getCoordinates();
        if (direction) {
            switch (direction) {
                case 'Up':
                    state.setCoordinates({
                        x: coordinates.x,
                        y: Math.max(coordinates.y - step, 0),
                    });
                    break;
                case 'Down':
                    state.setCoordinates({
                        x: coordinates.x,
                        y: Math.min(coordinates.y + step, params.WIDTH - 64),
                    });
                    break;
                case 'Left':
                    state.setCoordinates({
                        x: Math.max(coordinates.x - step, 0),
                        y: coordinates.y,
                    });
                    break;
                case 'Right':
                    state.setCoordinates({
                        x: Math.min(coordinates.x + step, params.WIDTH - 64),
                        y: coordinates.y,
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

    public getState = () => this.state as ShotState;

    public isVisible = () => this.getState().isVisible();

    public isPlayerShot = () => +this.type === ShotType.Player;

    public updateState = (time: number, shouldChangeFrame: boolean) => {
        this.getState().update(time, shouldChangeFrame, this.parameters.frameCount);
    };
}
