import { GameShip, GameShot } from '../types/gameTypes';
import params from '../parameters/gameParameters';
import { NEXT_SHIP_DELAY, ShipType, TEnemyType } from '../types/commonTypes';
import GameLevels, { GameLevelList } from '../parameters/gameLevels';
import Trajectory from '../types/trajectory';

class GameState {
    public player: GameShip;

    public enemies: GameShip[] = [];

    public shots: GameShot[] = [];

    private currentLevel: GameLevelList;

    constructor() {
        this.currentLevel = GameLevelList.Level1;
        this.player = this.initPlayer();
        this.startLevel();
    }

    // eslint-disable-next-line
    private initPlayer = () =>
        new GameShip(
            ShipType.Player,
            new Trajectory([{ x: 0, y: 0 }]), // todo can we remove trajectory for player
            params.PLAYER_COORDINATES
        );

    private initEnemies = () => {
        const ships: GameShip[] = [];
        const levelParams = GameLevels[this.currentLevel];
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

    public getLevelTime = (): number => {
        const levelParams = GameLevels[this.currentLevel];
        return levelParams.time;
    };

    public startLevel = () => {
        console.log('start level');
        this.player = this.initPlayer();
        this.enemies = this.initEnemies();
        this.shots = [];
    };
}

export default new GameState();
