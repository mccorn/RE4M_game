import explode from '@/assets/images/Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid 01 - Explode.png';
import { GameFieldParameters as params } from './gameTypes';

// todo can we calculate it from image, if not we should move it to props
const width = 96;
const height = 96;

let animationRequest: number;

class AsteroidManager {
    image: HTMLImageElement;

    context: CanvasRenderingContext2D;

    frameCount: number;

    exploideLoopIndex: number;

    flyLoopIndex: number;

    exploideLoop: number[];

    flyLoopLength: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.image = new Image();
        this.image.src = explode;

        this.frameCount = 0;

        this.exploideLoopIndex = 0;
        // todo make universal class accepting image in the constructor and number of frames,
        // may be the width on the image
        // may be calculate image size from index and frame size from image size and count
        this.exploideLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        this.flyLoopIndex = 0;
        this.flyLoopLength = 150; // todo calculate on hit
        /* img.onload = function () {
            init();
        }; */
    }

    private drawFrame = (frameX: number, frameY: number, canvasX: number, canvasY: number) => {
        this.context.drawImage(
            this.image,
            frameX * width,
            frameY * height,
            width,
            height,
            canvasX,
            canvasY,
            width,
            height
        );
    };

    private resetFrameCount = () => {
        this.frameCount = 0;
    };

    private exploide = () => {
        this.frameCount++;
        if (this.frameCount < 5) {
            // todo exploideSpeed
            window.requestAnimationFrame(this.exploide);
            return;
        }
        this.frameCount = 0;
        this.context.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        this.drawFrame(this.exploideLoop[this.exploideLoopIndex], 0, 0, 0);
        this.exploideLoopIndex++;
        if (this.exploideLoopIndex >= this.exploideLoop.length) {
            // currentLoopIndex = 0;
            window.cancelAnimationFrame(animationRequest);

            this.exploideLoopIndex = 0;
            this.flyLoopIndex = 0;
        }
        window.requestAnimationFrame(this.exploide);
    };

    private fly = () => {
        /* this.frameCount++;
        if (this.frameCount < 3) {
            // todo flySpeed
            window.requestAnimationFrame(this.fly);
            return;
        }
        this.frameCount = 0; */
        this.context.clearRect(0, 0, params.WIDTH, params.HEIGHT);
        this.drawFrame(0, 0, 0, this.flyLoopIndex); // flyloopindex

        console.log(this.flyLoopIndex);
        if (this.flyLoopIndex >= this.flyLoopLength) {
            // currentLoopIndex = 0;
            console.log('in cancel');
            window.cancelAnimationFrame(animationRequest);
            window.requestAnimationFrame(this.exploide);
            // animationRequest = window.requestAnimationFrame(this.step);
        } else {
            console.log('in request');
            this.flyLoopIndex++;
            window.requestAnimationFrame(this.fly);
        }
    };

    public init() {
        console.log('init');
        this.exploideLoopIndex = 0;
        this.flyLoopIndex = 0;
        // animationRequest = window.requestAnimationFrame(this.step);
        animationRequest = window.requestAnimationFrame(this.fly);
    }
}

export default AsteroidManager;
