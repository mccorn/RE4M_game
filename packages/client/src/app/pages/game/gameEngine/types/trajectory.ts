import { TPoint } from './commonTypes';

class Trajectory {
    private points: TPoint[];

    private segmentIndex = 0;

    private segmentStartTime = 0;

    private delay = 0;

    constructor(points: TPoint[], delay?: number) {
        this.points = points;
        if (delay) {
            this.delay = delay;
        }
    }

    private static getSegmentLength = (startPoint: TPoint, endPoint: TPoint): number =>
        Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);

    private static getNextCoordinate = (
        start: number,
        end: number,
        time: number,
        length: number
    ): number => start + ((end - start) * time) / length; // todo speed coefficient

    public getCoordinates = (time: number): TPoint => {
        const startPoint = this.points[this.segmentIndex];
        const endPoint = this.points[this.segmentIndex + 1];
        const length = Trajectory.getSegmentLength(startPoint, endPoint);
        const segmentTime = time - this.segmentStartTime - this.delay;

        // const isFirstSegment: boolean = this.segmentIndex === 0;

        // const isFirstSegment = true;
        /* console.log('start');
        console.log(startPoint);
        console.log('end');
        console.log(endPoint);
        console.log('length');
        console.log(length);
        console.log('time');
        console.log(time); */

        // let point;
        // if (isFirstSegment) {
        const point = {
            x: Trajectory.getNextCoordinate(startPoint.x, endPoint.x, segmentTime, length),
            y: Trajectory.getNextCoordinate(startPoint.y, endPoint.y, segmentTime, length),
        };
        /* } else {
             point = { x: 0, y: 0 };
            const prevPoint = this.points[this.segmentIndex - 1];

            const alpha = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

            const alphaV = Math.atan2(endPoint.y, endPoint.x);

            const deltaVector = (alpha - alphaV) / 2; //

            const radius = (length / 2) * Math.asin(deltaVector);
            //todo
            let temp = alpha + Math.PI / 2;
            if (radius > 0) {
                if (temp > Math.PI) {
                    temp = temp - 2 * Math.PI;
                }
            } else {
                let temp = alpha - Math.PI / 2;
                if (temp < -Math.PI) {
                    temp = temp + 2 * Math.PI;
                }
            }
            point = {
                x: startPoint.x + radius * Math.cos(temp),
                y: startPoint.y + radius * Math.sin(temp),
            };
        } */

        // switch segment if needed
        if (this.shouldSwitchSegment(time - this.delay)) {
            this.segmentIndex += 1;
            this.segmentStartTime = time - this.delay;
        }
        return point;
    };

    public getSegmentsNumber = (): number => this.points.length - 1;

    public shouldSwitchSegment = (time: number): boolean => {
        let length = 0;
        for (let i = 0; i <= this.segmentIndex; i++) {
            length += Trajectory.getSegmentLength(this.points[i], this.points[i + 1]);
        }
        return time >= length;
    };

    public shouldMove = (time: number) =>
        this.segmentIndex < this.getSegmentsNumber() && this.shouldStartMoving(time);

    public shouldStartMoving = (time: number) => time > this.delay;

    public movedOutOfGameField = (time: number): boolean => {
        // todo calculate if outside boundaries to set dead state
        console.log(time);
        console.log(this.delay);
        return false;
    };
}

export default Trajectory;
