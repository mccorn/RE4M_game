import { ShipType } from './types/commonTypes';
import {
    GameShip,
    LiveState,
    ShipTypesParameterValues,
    ShotParametersValues,
    ShotType,
    TShipState,
} from './types/gameTypes';
import state from './store/mockGameState';

class CollisionManager {
    private static detectEnemyCollisionAndSetExploiding = (
        x: number,
        y: number,
        width: number,
        height: number,
        // detect enemies collision with player if player defined and set player exploiding
        // if player is undefined detect ships collision with player rocket and set enemy exploiding
        player?: GameShip
    ) => {
        state.ships.forEach(ship => {
            const shipState = ship.state as TShipState;

            if (+ship.type !== ShipType.Player && +shipState.liveState === LiveState.Flying) {
                const shipParams = ShipTypesParameterValues[ship.type];
                const shipX = ship.state.coordinates.x;
                const shipY = ship.state.coordinates.y;
                const xCollision =
                    (shipX >= x && shipX <= x + width) ||
                    (shipX + shipParams.width >= x && shipX + shipParams.width <= x + width);
                const yCollision =
                    (shipY >= y && shipY <= y + height) ||
                    (shipY + shipParams.height >= y && shipY + shipParams.height <= y + height);
                if (xCollision && yCollision) {
                    if (player) {
                        const playerState = player.state as TShipState;
                        playerState.liveState = LiveState.Exploiding;
                        console.log('player hit');
                    } else {
                        console.log('ship hit');
                        shipState.liveState = LiveState.Exploiding;
                    }
                }
            }
        });
    };

    private static detectEnemyShipCollision = () => {
        const player = state.getPlayer();
        if (player) {
            const playerX = player.state.coordinates.x;
            const playerY = player.state.coordinates.y;
            const playerParams = ShipTypesParameterValues[ShipType.Player];
            CollisionManager.detectEnemyCollisionAndSetExploiding(
                playerX,
                playerY,
                playerParams.width,
                playerParams.height,
                player
            );
        }
    };

    private static detectPlayerShotCollision = () => {
        const playerShots = state.shots.filter(shot => +shot.type === ShotType.Player);
        playerShots.forEach(shot => {
            const shotX = shot.state.coordinates.x;
            const shotY = shot.state.coordinates.y;
            const shotParams = ShotParametersValues[ShotType.Player];
            CollisionManager.detectEnemyCollisionAndSetExploiding(
                shotX,
                shotY,
                shotParams.width,
                shotParams.height
            );
        });
    };

    public static collisionDetection = () => {
        CollisionManager.detectEnemyShipCollision();
        CollisionManager.detectPlayerShotCollision();
    };
}

export default CollisionManager;
