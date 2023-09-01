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

    private getNextCoordinate = (
        start: number,
        end: number,
        time: number,
        length: number
    ): number => {
        console.log(this.points);
        if (start < end) {
            return start + ((end - start) * time) / length;
            // eslint-disable-next-line
        } else if (start > end) {
            return start - ((start - end) * time) / length;
        }
        return start;
    };

    public getCoordinates = (time: number): TPoint => {
        const startPoint = this.points[this.segmentIndex];
        const endPoint = this.points[this.segmentIndex + 1];
        const length = Trajectory.getSegmentLength(startPoint, endPoint);
        const segmentTime = time - this.segmentStartTime - this.delay;
        console.log('start');
        console.log(startPoint);
        console.log('end');
        console.log(endPoint);
        console.log('length');
        console.log(length);
        console.log('time');
        console.log(time); /**/

        const point = {
            x: this.getNextCoordinate(startPoint.x, endPoint.x, segmentTime, length),
            y: this.getNextCoordinate(startPoint.y, endPoint.y, segmentTime, length),
        };
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
        // todo calculate if outside boundaries
        console.log(time);
        console.log(this.delay);
        return false;
    };
}

export default Trajectory;
