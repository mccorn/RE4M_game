import { GameFieldParameters, Player, TPoint } from './gameTypes';

export const calculateInitialPlayerPoint = (): TPoint => ({
    x: GameFieldParameters.WIDTH / 2 - Player.WIDTH / 2,
    y: GameFieldParameters.HEIGHT - 100,
});

export const drawPlayer = (point: TPoint, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(point.x, point.y, Player.WIDTH, Player.HEIGHT);
};
