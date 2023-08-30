import {
    GameShip,
    GameShot,
    LiveState,
    ShipTypesParameterValues,
    ShotParametersValues,
} from './gameTypes';
import params from './gameParameters';
import state from './mockGameState';
import CollisionManager from './collisionManager';

class GameObjectAnimator {
    context: CanvasRenderingContext2D;

    frameCount = 0;

    mainLoopIndex = 0;

    firstLevelLength = params.FIRST_LEVEL_LENGTH;

    drawBackground: () => void;

    requestId: number;

    EXPLOIDE_SPEED = 5; // 1 per 5 frames exploide image changes

    rightPressed = false;

    leftPressed = false;

    constructor(ctx: CanvasRenderingContext2D, drawBackground: () => void) {
        this.context = ctx;
        this.drawBackground = drawBackground;
        this.requestId = -1;
    }

    // todo make common for shot and ship!!!
    private drawFrame = (ship: GameShip, spriteX: number) => {
        const shipParams = ShipTypesParameterValues[ship.type];
        this.context.drawImage(
            ship.image,
            spriteX,
            0,
            shipParams.width,
            shipParams.height,
            ship.state.coordinates.x,
            ship.state.coordinates.y,
            shipParams.width,
            shipParams.height
        );
    };

    private drawFrameShot = (shot: GameShot, spriteX: number) => {
        console.log('draw shot');
        const shotParams = ShotParametersValues[shot.type];
        this.context.drawImage(
            shot.image,
            spriteX,
            0,
            shotParams.width,
            shotParams.height,
            shot.state.coordinates.x,
            shot.state.coordinates.y,
            shotParams.width,
            shotParams.height
        );
    };

    private drawDestructuredFrame = (ship: GameShip) => {
        // console.log('drawDestructuredFrame');
        const shipParams = ShipTypesParameterValues[ship.type]; // todo call once
        const sx = shipParams.width * ship.state.destructionIndex;
        this.drawFrame(ship, sx);
    };

    private drawBaseFrame = (ship: GameShip) => {
        // console.log('in draw base frame');
        this.drawFrame(ship, 0);
    };

    private drawShip = (ship: GameShip) => {
        // console.log('in main loop ships');
        // console.log(this.mainLoopIndex);
        // console.log(ship);
        ship.updateState(this.mainLoopIndex); // todo move from draw!!!

        if (ship.state.liveState === LiveState.Exploiding) {
            const shipParams = ShipTypesParameterValues[ship.type];
            if (ship.state.destructionIndex < shipParams.destructionFrameCount) {
                this.drawDestructuredFrame(ship);
                if (this.frameCount === this.EXPLOIDE_SPEED) {
                    ship.state.destructionIndex++;
                }
            } else {
                ship.state.liveState = LiveState.Dead; // check ?
                console.log('not drawing, ship is dead');
            }
        } else {
            this.drawBaseFrame(ship);
        }
    };

    private drawShotFrame = (shot: GameShot) => {
        const shotParams = ShotParametersValues[shot.type]; // todo call once
        const sx = shotParams.width * shot.state.frameIndex;
        this.drawFrameShot(shot, sx);
    };

    private drawShot = (shot: GameShot) => {
        console.log('draw shot');
        console.log(shot);
        shot.updateState(this.mainLoopIndex); // update should be in main loop

        // this.drawBaseFrame(shot);
        this.drawShotFrame(shot);
    };

    public resetToStart = () => {
        // fast after reset - cancel bug?
        this.frameCount = 0;
        this.mainLoopIndex = 0;
    };

    public startMainLoop = () => {
        // console.log('in main loop');

        this.frameCount++;

        /* draw background */
        this.drawBackground();

        /* draw all ships: enemies and player */
        state.ships.forEach(ship => {
            if (+ship.state.liveState !== LiveState.Dead) {
                this.drawShip(ship);
            }
        });
        /* draw all shots */
        state.shots.forEach(shot => {
            if (shot.state.show) {
                this.drawShot(shot);
            }
        });

        CollisionManager.collisionDetection();

        if (this.frameCount === this.EXPLOIDE_SPEED) {
            this.frameCount = 0;
        }
        this.mainLoopIndex++;

        if (this.mainLoopIndex === this.firstLevelLength) {
            console.log('in cancel first');
            window.cancelAnimationFrame(this.requestId);
        }
        this.requestId = window.requestAnimationFrame(this.startMainLoop);
    };
}

export default GameObjectAnimator;
