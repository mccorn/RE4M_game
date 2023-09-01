import { GameShip, GameShot } from '../types/gameTypes';
import params from '../parameters/gameParameters';
import { NEXT_SHIP_DELAY, ShipType, TEnemyType } from '../types/commonTypes';
import GameLevels, { GameLevelList } from '../parameters/gameLevels';
import Trajectory from '../types/trajectory';

class GameState {
    public ships: GameShip[] = [];

    public shots: GameShot[] = [];

    constructor() {
        this.startLevel(GameLevelList.Level1);
    }

    private static initPlayer = () =>
        new GameShip(
            ShipType.Player,
            new Trajectory([{ x: 0, y: 0 }]), // todo can we remove trajectory for player
            params.PLAYER_COORDINATES
        );

    private static initEnemies = (level: GameLevelList) => {
        const ships: GameShip[] = [];
        const levelParams = GameLevels[level];
        Object.keys(levelParams.enemies).forEach(key => {
            const type = key as unknown as TEnemyType;
            const enemyLevelParams = levelParams.enemies[type];
            if (enemyLevelParams) {
                for (let i = 0; i < enemyLevelParams.number; i++) {
                    const trajectory = new Trajectory(
                        enemyLevelParams.trajectoryPoints,
                        i * NEXT_SHIP_DELAY
                    );
                    ships.push(new GameShip(type, trajectory));
                }
            }
        });
        return ships;
    };

    public startLevel = (level: GameLevelList) => {
        this.ships = []; // reset list on every game start
        this.ships.push(GameState.initPlayer());
        this.ships.push(...GameState.initEnemies(level));
        this.shots = [];
    };
}

export default new GameState();
