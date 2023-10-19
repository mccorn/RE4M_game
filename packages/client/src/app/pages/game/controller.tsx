import { FC, SyntheticEvent } from 'react';
import GameEngine from '@/gameEngine/core/gameEngine';
import { GAME_EVENTS, GlobalGameState } from '@/gameEngine/store/objectState';
import { TPoint } from '@/gameEngine/types/commonTypes';
import gameState from '@/gameEngine/store/gameState';

const DEMO_ENEMIES_COUNT = 11; // TODO: автоматизировать процессы игры

class Controller {
    engine: undefined | null | GameEngine;

    view: undefined | null | FC;

    paused: boolean;

    handlersMounted: boolean;

    counter: number;

    constructor(engine?: GameEngine, view?: FC) {
        this.engine = engine;
        this.view = view;
        this.paused = true;
        this.counter = 0;
        this.handlersMounted = false;
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
            this.disableProcess();
            this.engine.setGameState(GlobalGameState.Paused);
        } else {
            this.enableProcess();
            this.engine.setGameState(GlobalGameState.Resumed);
        }
    }

    pauseGame() {
        this.setPause(true);
    }

    resumeGame() {
        this.setPause(false);
    }

    togglePause() {
        this.setPause(!this.paused);
    }

    disableProcess() {
        if (this.engine) this.engine.stopShot();
        this.unmountHandlers();
    }

    enableProcess() {
        if (this.engine) this.engine.playerShotLoop();
        this.registerHandlers();
    }

    startGame() {
        if (!this.engine) return;

        this.enableProcess();
        this.engine.setGameState(GlobalGameState.LevelStarted);
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

    increment = () => {
        this.counter += 1;

        if (this.getStatusWin()) {
            this.stopGame();
        }
    };

    getCounter() {
        return this.counter;
    }

    getStatusWin() {
        return this.counter === DEMO_ENEMIES_COUNT;
    }

    registerHandlers() {
        if (this.handlersMounted) return;

        window.addEventListener(GAME_EVENTS.objectIsDead, this.increment);
        window.addEventListener('keydown', this.onKeyDown);

        this.handlersMounted = true;
    }

    unmountHandlers() {
        if (!this.handlersMounted) return;

        window.removeEventListener(GAME_EVENTS.objectIsDead, this.increment);
        window.removeEventListener('keydown', this.onKeyDown);

        this.handlersMounted = false;
    }

    onKeyDown(event: KeyboardEvent) {
        if (!event || !this.engine) return;

        this.engine.gameControlPressed(event);
    }
}

export default Controller;
