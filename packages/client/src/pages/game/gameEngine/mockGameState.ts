import { ShipTypesParameterValues, ShipType, GameShip } from './gameTypes';
import params from './gameParameters';

// in state we will store all ship objects which are created from game parameters
class GameState {
    public ships: GameShip[] = [];

    constructor() {
        this.resetShipsToStart();
    }

    public resetShipsToStart = () => {
        const ships: GameShip[] = [];
        Object.keys(params.SHIPS).forEach(key => {
            // todo can we make convertion more elegant?
            const type = key as unknown as ShipType;
            const typeParameters = ShipTypesParameterValues[type];
            const coordinates = params.SHIPS[type];
            const imageSrc = typeParameters.image;
            const updateFunction = typeParameters.updateStateFunction;

            coordinates.forEach(point => {
                const ship = new GameShip(type, point, updateFunction);
                ship.image.src = imageSrc;
                // img.onload = init !!!
                ships.push(ship);
            });
        });
        this.ships = ships;
    };
}

export default new GameState();
