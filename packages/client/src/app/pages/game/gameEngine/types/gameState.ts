import { DrawableObjectState, TPoint } from './commonTypes';
import Trajectory from './trajectory';

// we draw ship in Flying, Shooting and Exploiding states
export enum LiveState {
    WaitForStart,
    Flying,
    Shooting,
    Exploiding,
    Dead,
}

export class ShipState extends DrawableObjectState {
    private liveState: LiveState;

    constructor(
        coordinates: TPoint,
        frameIndex: number,
        trajectory: Trajectory,
        liveState: LiveState
    ) {
        super(coordinates, frameIndex, trajectory);
        this.liveState = liveState;
    }

    // todo check do we need +
    public isExploiding = () => this.liveState === LiveState.Exploiding;

    public isWaiting = () => this.liveState === LiveState.WaitForStart;

    public isFlying = () => this.liveState === LiveState.Flying;

    public isDead = () => this.liveState === LiveState.Dead;

    public setLiveState = (liveState: LiveState) => {
        this.liveState = liveState;
    };

    // 2 action change index and set dead
    public changeFrameIndex = (frameCount: number, shouldChangeFrame: boolean) => {
        if (this.isExploiding() && shouldChangeFrame) {
            this.frameIndex++;

            if (this.frameIndex >= frameCount) {
                this.setLiveState(LiveState.Dead);
            }
        }
    };

    public updateEnemyState = (time: number, frameCount: number, shouldChangeFrame: boolean) => {
        this.followTrajectory(time);

        if (this.isWaiting() && this.trajectory.shouldStartMoving(time)) {
            // if ship should starts moving set state to Flying
            this.setLiveState(LiveState.Flying);
        } else if (this.isFlying() && this.trajectory.movedOutOfGameField(time)) {
            // if ship flied out of canvas set state to Dead
            this.setLiveState(LiveState.Dead);
        }

        this.changeFrameIndex(frameCount, shouldChangeFrame);
    };
}

export class ShotState extends DrawableObjectState {
    private show: boolean;

    constructor(coordinates: TPoint, frameIndex: number, trajectory: Trajectory, show: boolean) {
        super(coordinates, frameIndex, trajectory);
        this.show = show;
    }

    public hide = () => {
        this.show = false;
    };

    public isVisible = () => this.show;
}
