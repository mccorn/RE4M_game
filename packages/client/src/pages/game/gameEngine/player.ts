import { GameFieldParameters as params, Player, TPoint } from './gameTypes';
import Ship from '@/assets/images/ship.png';

export type TDirection = 'Up' | 'Down' | 'Left' | 'Right';
// export const TDirection = {'Up' | 'Down' | 'Left' | 'Right'};

class PlayerManager {
    context: CanvasRenderingContext2D;

    startPoint: TPoint;

    currentPoint: TPoint;

    playerImage: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.startPoint = {
            x: params.WIDTH / 2 - Player.WIDTH / 2,
            y: params.HEIGHT - 100,
        };
        this.currentPoint = this.startPoint;
        this.playerImage = new Image();
        this.playerImage.src = Ship;
    }

    private drawPlayer = (point: TPoint) => {
        this.context.drawImage(this.playerImage, point.x, point.y, Player.WIDTH, Player.HEIGHT);
    };

    /* public api */
    public drawPlayerOnGameStart = () => {
        this.drawPlayer(this.startPoint);
    };

    public movePlayer = (direction: TDirection) => {
        console.log(direction);
        switch (direction) {
            case 'Down':
                if (this.currentPoint.y + 1 < params.HEIGHT - Player.HEIGHT) {
                    this.currentPoint.y++;
                }
                break;
            case 'Up':
                if (this.currentPoint.y - 1 > 0) {
                    this.currentPoint.y--;
                }
                break;
            case 'Left':
                if (this.currentPoint.x - 1 > 0) {
                    this.currentPoint.x--;
                }
                break;
            case 'Right':
                this.currentPoint.x + 1 < params.WIDTH - Player.WIDTH && this.currentPoint.x++;
                break;
        }
        this.drawPlayer(this.currentPoint);
    };
}

export default PlayerManager;
