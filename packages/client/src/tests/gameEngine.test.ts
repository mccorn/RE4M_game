import { Canvas } from 'canvas';
import GameEngine from '../app/pages/game/gameEngine/gameEngine';

describe('Тесты gameEngine', () => {
    test('GameEngine', () => {
        const canvas = new Canvas(200, 200);
        const ctx = canvas.getContext('2d');

        const g = new GameEngine(ctx as any as CanvasRenderingContext2D);
        // const input = 0;
        // const output = 0;

        // eslint-disable-next-line no-unused-expressions
        g;
        // console.log('g', g);

        expect(1).toEqual(1);
    });
});

export {};
