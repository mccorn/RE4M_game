import { EnemyShip, GameShot, PlayerShip } from '../types/gameTypes';
import params from '../parameters/gameParameters';
import { NEXT_SHIP_DELAY, TEnemyType } from '../types/commonTypes';
import GameLevels, { GameLevelList } from '../parameters/gameLevels';
import Trajectory from '../types/trajectory';
import { GlobalGameState } from '../types/objectState';

class GameState {
    public player: PlayerShip;

    public enemies: EnemyShip[] = [];

    public shots: GameShot[] = [];

    private currentLevel: GameLevelList;

    private state: GlobalGameState;

    public isGameRunning = false;

    constructor() {
        this.currentLevel = GameLevelList.Level1;
        this.player = this.initPlayer();
        this.state = GlobalGameState.Loaded;
    }

    // eslint-disable-next-line class-methods-use-this
    private initPlayer = () => new PlayerShip(params.PLAYER_COORDINATES);

    private initEnemies = () => {
        const ships: EnemyShip[] = [];
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
                    ships.push(new EnemyShip(type, trajectory));
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

    public setState = (state: GlobalGameState) => {
        this.state = state;
        this.isGameRunning =
            this.state === GlobalGameState.LevelStarted || this.state === GlobalGameState.Resumed;
    };

    public getState = () => this.state;
}

export default new GameState();