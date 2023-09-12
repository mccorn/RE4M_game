import { GameShip } from '@/app/pages/game/gameEngine/types/gameTypes';
import {
    DrawableGameObject,
    DrawableObjectState,
    ShipType,
} from '@/app/pages/game/gameEngine/types/commonTypes';
import Trajectory from '@/app/pages/game/gameEngine/types/trajectory';

describe('Тесты GameShip', () => {
    const trajectory = new Trajectory([{ x: 0, y: 0 }]);
    const ship = new GameShip(new DrawableObjectState({ x: 0, y: 0 }, trajectory), ShipType.Bomber);

    test('GameShip instanceof DrawableGameObject', () => {
        expect(ship instanceof DrawableGameObject).toEqual(true);
    });

    test('GameShip type is number', () => {
        expect(typeof ship.type).toEqual('number');
    });
});

export {};
