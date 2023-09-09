import { DrawableGameObject } from './types/commonTypes';
import state from './store/mockRedux';
import { LiveState } from './types/objectState';

class CollisionManager {
    private static detectCollision(object1: DrawableGameObject, object2: DrawableGameObject) {
        const point1 = object1.state.getCoordinates();
        const params1 = object1.parameters;
        const point2 = object2.state.getCoordinates();
        const params2 = object2.parameters;
        return (
            point1.x < point2.x + params2.width &&
            point1.x + params1.width > point2.x &&
            point1.y < point2.y + params2.height &&
            point1.y + params1.height > point2.y
        );
    }

    private static detectPlayerHit = () => {
        const { player } = state;

        state.enemies.forEach(ship => {
            if (ship.shouldDetectCollision()) {
                if (CollisionManager.detectCollision(player, ship)) {
                    player.setLiveState(LiveState.Exploiding);
                    console.log('player hit');
                }
            }
        });
    };

    private static detectEnemyHit = () => {
        state.shots.forEach(shot => {
            if (shot.isPlayerShot() && shot.isVisible()) {
                state.enemies.forEach(ship => {
                    if (ship.shouldDetectCollision()) {
                        if (CollisionManager.detectCollision(shot, ship)) {
                            console.log('ship hit');
                            ship.setLiveState(LiveState.Exploiding);
                        }
                    }
                });
            }
        });
    };

    public static collisionDetection = () => {
        CollisionManager.detectPlayerHit();
        CollisionManager.detectEnemyHit();
    };
}

export default CollisionManager;
