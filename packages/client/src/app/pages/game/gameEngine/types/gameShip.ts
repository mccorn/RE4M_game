import { ShipTypesParameterValues } from '../parameters/gameObjectsParameters';
import { LiveState, ShipState } from '../store/objectState';
import { DrawableGameObject, DrawableObjectState, ShipType } from './commonTypes';

export default class GameShip extends DrawableGameObject {
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
