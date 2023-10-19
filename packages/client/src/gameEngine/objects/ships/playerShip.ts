// eslint-disable-next-line

import { Direction, TDirection } from '../../core/gameEngine';
import { LiveState, ShipState } from '../../store/objectState';
import { ShipType, TPoint } from '../../types/commonTypes';
import Trajectory from '../trajectory';
import GameShip from './gameShip';

import params from '../../parameters/gameParameters';

export default class PlayerShip extends GameShip {
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
