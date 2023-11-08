import { someFunction, someObject } from '@/const/types';

type Listeners = { [key: string]: someFunction[] };

class HotKeys {
    listeners: Listeners;

    constructor(listeners: Listeners = {}) {
        this.listeners = listeners;

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    enable() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event: KeyboardEvent) {
        const memory: someObject = {};

        this.listeners[event.code]?.forEach((callback: someFunction) => {
            const keyCallback = JSON.stringify(callback);

            if (!memory[keyCallback]) {
                callback();
                memory[keyCallback] = true;
            }
        });
    }

    addCode(code: string, callback: someFunction) {
        const { listeners } = this;

        if (!listeners[code]) listeners[code] = [];
        listeners[code].push(callback);
    }

    disable() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}

export default new HotKeys();
