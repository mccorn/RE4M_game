import { GameFieldParameters as params, TPoint } from './gameTypes';

type TColor = 'red' | 'yellow' | 'green' | 'blue' | 'white';
// type TSpeed = 'slow' | 'normal';

class BackgroundManager {
    private context: CanvasRenderingContext2D;

    private SMALL_STAR_SIZE = 2;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
    }

    /* calculating */

    private static calculateYCoordinate(coordinate: number, dynamic: number) {
        if (coordinate + dynamic > params.HEIGHT) {
            return coordinate + dynamic - params.HEIGHT;
        }
        return coordinate + dynamic;
    }

    /* drawing */

    private drawStar(color: TColor, point: TPoint) {
        this.context.fillStyle = color;
        this.context.fillRect(point.x, point.y, this.SMALL_STAR_SIZE, this.SMALL_STAR_SIZE);
    }

    private drawStarBlock(color: TColor, startPoint: TPoint) {
        this.drawStar(color, startPoint);
        this.drawStar(color, { x: startPoint.x + 10, y: startPoint.y + 30 });
    }

    private drawSlowStars(dynamic: number) {
        this.drawStarBlock('yellow', {
            x: 200,
            y: BackgroundManager.calculateYCoordinate(0, dynamic),
        });
        this.drawStarBlock('red', {
            x: 400,
            y: BackgroundManager.calculateYCoordinate(150, dynamic),
        });
        this.drawStarBlock('green', {
            x: 100,
            y: BackgroundManager.calculateYCoordinate(300, dynamic),
        });
    }

    public renderGameField = () => {
        const ctx = this.context;
        ctx.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        // ctx.fillStyle = params.BACKGROUND_COLOR;
        // ctx.fillRect(0, 0, params.WIDTH, params.HEIGHT);
    };

    // eslint-disable-next-line
    /* public renderSpaceWithStars = (): NodeJS.Timer => {
        // window.requestAnimationFrame(this.renderInfiniteStarsInSpace.bind(this));
        let dynamic = 1;

        const infiniteLoop = () => {
            const ctx = this.context;
            this.renderGameField();
            ctx.save();
            // const even = dynamic % 20 === 0;
            // if (!even) {
            this.drawSlowStars(dynamic);
            // }
            // eslint-disble-next-line
            // dynamic < 600 ? dynamic++ : 0;
            ctx.restore();
        };

        return setInterval(infiniteLoop.bind(this), 10);
    }; */

    public renderGameEnd = () => {
        const ctx = this.context;
        this.renderGameField();
        ctx.fillStyle = 'red';
        ctx.fillText('GAME OVER', 300, 300);
    };
}

export default BackgroundManager;
