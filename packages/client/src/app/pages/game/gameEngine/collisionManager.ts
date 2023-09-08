import { ShipType, TPoint } from './types/commonTypes';
import {
    DrawableObjectParams,
    LiveState,
    ShipTypesParameterValues,
    ShotParametersValues,
    ShotType,
} from './types/gameTypes';
import state from './store/mockGameState';

class CollisionManager {
    private static detectCollision(
        point1: TPoint,
        params1: DrawableObjectParams,
        point2: TPoint,
        params2: DrawableObjectParams
    ) {
        return (
            point1.x < point2.x + params2.width &&
            point1.x + params1.width > point2.x &&
            point1.y < point2.y + params2.height &&
            point1.y + params1.height > point2.y
        );
    }

    private static detectPlayerHit = () => {
        const { player } = state;
        const playerParams = ShipTypesParameterValues[ShipType.Player];

        state.enemies.forEach(ship => {
            if (ship.shouldDetectCollision()) {
                const shipParams = ShipTypesParameterValues[ship.type];
                if (
                    CollisionManager.detectCollision(
                        player.state.coordinates,
                        playerParams,
                        ship.state.coordinates,
                        shipParams
                    )
                ) {
                    player.getState().liveState = LiveState.Exploiding;
                    console.log('player hit');
                }
            }
        });
    };

    private static detectEnemyHit = () => {
        state.shots.forEach(shot => {
            if (shot.isPlayerShot() && shot.isVisible()) {
                const shotParams = ShotParametersValues[ShotType.Player];
                state.enemies.forEach(ship => {
                    if (ship.shouldDetectCollision()) {
                        const shipParams = ShipTypesParameterValues[ship.type];
                        if (
                            CollisionManager.detectCollision(
                                shot.state.coordinates,
                                shotParams,
                                ship.state.coordinates,
                                shipParams
                            )
                        ) {
                            console.log('ship hit');
                            ship.getState().liveState = LiveState.Exploiding;
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
