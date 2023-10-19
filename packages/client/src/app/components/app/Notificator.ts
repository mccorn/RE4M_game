import { someObject } from '@/const/types';
import icon from '../../../assets/images/logo.png';

enum PERMISSION_STATUS {
    denied = 'denied',
    default = 'default',
    granted = 'granted',
}

const STAR_UNICODE = '\u272D';
const TITLE = `${STAR_UNICODE} BlackStar ${STAR_UNICODE}`;

const DEFAULT_CONFIG = {
    icon,
};

class Notificator {
    private permission = PERMISSION_STATUS.default;

    init() {
        if (Notification.permission.toLowerCase() === PERMISSION_STATUS.default) {
            this.requestPermission();
        }
    }

    requestPermission() {
        Notification.requestPermission(permission => {
            this.permission = permission as PERMISSION_STATUS;
        });
    }

    hasPermission() {
        return this.permission !== PERMISSION_STATUS.granted;
    }

    sendWithConfig(title: string, config?: someObject) {
        if (this.hasPermission()) {
            const notification = new Notification(title || TITLE, { ...DEFAULT_CONFIG, ...config });
            notification.onerror = () => null;
        }
    }

    send(body: string) {
        this.sendWithConfig(TITLE, { body });
    }
}

export default new Notificator();
