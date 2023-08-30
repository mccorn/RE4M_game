import { TPoint } from './gameTypes';

class Trajectory {
    private points: TPoint[];

    constructor(points: TPoint[]) {
        this.points = points;
    }

    private checkIndex = (index: number) => {
        if (index >= this.points.length) {
            throw new Error('index is outside of trajectories array');
        }
    };

    private getSegmentLength = (startPoint: TPoint, endPoint: TPoint): number => {
        console.log(this.points);
        return Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
    };

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

    public getCoordinates = (index: number, time: number): TPoint => {
        this.checkIndex(index);
        const startPoint = this.points[index];
        const endPoint = this.points[index + 1];
        const length = this.getSegmentLength(startPoint, endPoint);
        console.log('start');
        console.log(startPoint);
        console.log('end');
        console.log(endPoint);
        console.log('length');
        console.log(length);
        console.log('time');
        console.log(time);

        // todo store deltaTime in object with index? -
        // store different traectory objects in state of the ship ???
        // const deltaTime =

        return {
            x: this.getNextCoordinate(startPoint.x, endPoint.x, time, length),
            y: this.getNextCoordinate(startPoint.y, endPoint.y, time, length),
        };
    };

    public getSegmentsNumber = (): number => this.points.length - 1;

    public shouldSwitchSegment = (index: number, time: number): boolean => {
        this.checkIndex(index);
        let length = 0;
        for (let i = 0; i <= index; i++) {
            length += this.getSegmentLength(this.points[i], this.points[i + 1]);
        }
        return time >= length;
    };
}

const Trajectories = {
    Fighter: new Trajectory([
        { x: 250, y: 250 },
        { x: 500, y: 100 },
        { x: 100, y: 500 },
    ]),
};

export default Trajectories;
