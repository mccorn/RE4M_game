import { FC, SyntheticEvent } from 'react';
import GameEngine from './gameEngine/core/gameEngine';
import { GlobalGameState } from './gameEngine/store/objectState';
import { TPoint } from './gameEngine/types/commonTypes';
import gameState from './gameEngine/store/gameState';

class Controller {
    engine: undefined | null | GameEngine;

    view: undefined | null | FC;

    paused: boolean;

    constructor(engine?: GameEngine, view?: FC) {
        this.engine = engine;
        this.view = view;
        this.paused = true;
    }

    setView(view: FC) {
        this.view = view;
    }

    setEngine(engine: GameEngine) {
        this.engine = engine;
    }

    setGameState(state: GlobalGameState) {
        if (!this.engine) return;
        this.engine.setGameState(state);
    }

    getState() {
        if (!this.engine) return 0;

        return gameState.getState();
    }

    isEnable() {
        return (
            this.getState() === GlobalGameState.LevelStarted ||
            this.getState() === GlobalGameState.Resumed
        );
    }

    // global process
    setPause(value: boolean) {
        if (!this.engine) return;

        if (value) {
            this.engine.setGameState(GlobalGameState.Paused);
        } else {
            this.engine.setGameState(GlobalGameState.Resumed);
        }
    }

    togglePause() {
        this.setPause(!this.paused);
    }

    startGame() {
        if (!this.engine) return;

        this.engine.setGameState(GlobalGameState.LevelStarted);
        this.engine.playerShotLoop();
    }

    resumeGame() {
        if (!this.engine) return;

        this.registerHandlers();
        this.engine.playerShotLoop();
    }

    stopGame() {
        this.unmountHandlers();

        if (!this.engine) return;

        this.engine.stopShot();
        this.engine.setGameState(GlobalGameState.Ended);
    }

    // handlers
    handleMouseMove(ev: SyntheticEvent) {
        if (!this.engine) return;

        const halfShipHeight = 35;
        const halfShipWidth = 30;
        const mouseX =
            (ev.nativeEvent as MouseEvent).clientX -
            (ev.target as HTMLElement).offsetLeft -
            halfShipHeight;
        const mouseY =
            (ev.nativeEvent as MouseEvent).clientY -
            (ev.target as HTMLElement).offsetTop -
            halfShipWidth;

        this.setTargetedCoordinatesForPlayer({ x: mouseX, y: mouseY });
    }

    setTargetedCoordinatesForPlayer(position: TPoint) {
        if (!this.engine) return;
        this.engine.setTargetedCoordinatesForPlayer(position);
    }

    registerHandlers() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    unmountHandlers() {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event: KeyboardEvent) {
        if (!event || !this.engine) return;

        this.engine.gameControlPressed(event);
    }
}

export default Controller;
