import { Canvas } from 'canvas';
import GameEngine from '../core/gameEngine';

describe('Тесты gameEngine', () => {
    const canvas = new Canvas(200, 200);
    const ctx = canvas.getContext('2d');

    const gameEngine = new GameEngine(ctx as unknown as CanvasRenderingContext2D);

    test('GameEngine.start() вызывает методы GameObjectAnimator: start & resetToStart', () => {
        const resultStart = 'start';
        const resultResetToStart = 'resetToStart';

        gameEngine.animator.start = jest.fn(() => resultStart);
        gameEngine.animator.reset = jest.fn(() => resultResetToStart);
        gameEngine.start();

        expect(gameEngine.animator.start).toHaveBeenCalled();
        expect(gameEngine.animator.start()).toBe(resultStart);

        expect(gameEngine.animator.reset).toHaveBeenCalled();
        expect(gameEngine.animator.reset()).toBe(resultResetToStart);
    });

    test('GameEngine.pause() вызывает методы GameObjectAnimator: stop', () => {
        const resultMockMethod = 'start';

        gameEngine.animator.stop = jest.fn(() => resultMockMethod);
        gameEngine.pause();

        expect(gameEngine.animator.stop).toHaveBeenCalled();
        expect(gameEngine.animator.stop()).toBe(resultMockMethod);
    });
});

export {};
