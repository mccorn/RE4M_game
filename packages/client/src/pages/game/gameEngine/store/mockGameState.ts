import { ShipTypesParameterValues, GameShip, GameShot } from '../types/gameTypes';
import params from '../parameters/gameParameters';
import { NEXT_SHIP_DELAY, ShipType, TEnemyType } from '../types/commonTypes';
import GameLevels, { GameLevelList } from '../parameters/gameLevels';
import Trajectory from '../types/gameTrajectories';

class GameState {
    public ships: GameShip[] = [];

    public shots: GameShot[] = [];

    constructor() {
        this.startLevel(GameLevelList.Level1);
    }

    public startLevel(level: GameLevelList) {
        const levelParams = GameLevels[level];
        const ships: GameShip[] = [];
        /**/ Object.keys(levelParams.enemies).forEach(key => {
            const type = key as unknown as TEnemyType;
            const typeParameters = ShipTypesParameterValues[type];
            console.log(type);
            console.log(ShipTypesParameterValues);
            const imageSrc = typeParameters.image;
            const updateFunction = typeParameters.updateStateFunction;
            const enemyTypeParams = levelParams.enemies[type];
            if (enemyTypeParams) {
                for (let i = 0; i < enemyTypeParams.number; i++) {
                    const delay = i * NEXT_SHIP_DELAY;
                    const traectory = new Trajectory(enemyTypeParams.trajectoryPoints, delay);
                    const ship = new GameShip(type, traectory, updateFunction);
                    ship.image.src = imageSrc;
                    // todo img.onload = init !!!
                    ships.push(ship);
                }
            }
        });
        // todo trajectory for player remove
        const playerParams = ShipTypesParameterValues[ShipType.Player];
        const playerShip = new GameShip(
            ShipType.Player,
            new Trajectory([{ x: 0, y: 0 }]),
            playerParams.updateStateFunction
        );
        playerShip.state.coordinates = params.PLAYER_COORDINATES;
        ships.push(playerShip);
        this.ships = ships;
        this.shots = [];
    }
}

export default new GameState();
