import { GameFieldParameters, Player, TPoint } from './gameTypes';

class PlayerManager {
    context: CanvasRenderingContext2D;

    startPoint: TPoint;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.startPoint = {
            x: GameFieldParameters.WIDTH / 2 - Player.WIDTH / 2,
            y: GameFieldParameters.HEIGHT - 100,
        };
    }

    /* private calculateInitialPlayerPoint = (): TPoint => ({
        x: GameFieldParameters.WIDTH / 2 - Player.WIDTH / 2,
        y: GameFieldParameters.HEIGHT - 100,
    }); */

    private drawPlayer = (point: TPoint) => {
        this.context.fillStyle = 'blue';
        this.context.fillRect(point.x, point.y, Player.WIDTH, Player.HEIGHT);
    };

    /* public api */
    public drawPlayerOnGameStart = () => {
        this.drawPlayer(this.startPoint);
    };
}

export default PlayerManager;
