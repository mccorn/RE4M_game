import { GameShip, LiveState, ShipTypesParameterValues } from './gameTypes';
import params from './gameParameters';
import state from './mockGameState';

class GameObjectAnimator {
    context: CanvasRenderingContext2D;

    frameCount = 0;

    mainLoopIndex = 0;

    firstLevelLength = params.FIRST_LEVEL_LENGTH;

    drawBackground: () => void;

    requestId: number;

    EXPLOIDE_SPEED = 5; // 1 per 5 frames exploide image changes

    constructor(ctx: CanvasRenderingContext2D, drawBackground: () => void) {
        this.context = ctx;
        this.drawBackground = drawBackground;
        this.requestId = -1;
    }

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
        // console.log(ship.state.coordinates);
        ship.updateState(this.mainLoopIndex);

        if (ship.state.liveState === LiveState.Exploiding) {
            const shipParams = ShipTypesParameterValues[ship.type];
            if (ship.state.destructionIndex < shipParams.destructionFrameCount) {
                this.drawDestructuredFrame(ship);
                if (this.frameCount === this.EXPLOIDE_SPEED) {
                    ship.state.destructionIndex++;
                }
            }
        } else {
            this.drawBaseFrame(ship);
        }
    };

    // todo rotate image

    public startMainLoop = () => {
        // console.log('in main loop');

        this.frameCount++;

        /* draw background */
        this.drawBackground();

        /* draw all ships */
        state.forEach(ship => {
            this.drawShip(ship);
        });
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
