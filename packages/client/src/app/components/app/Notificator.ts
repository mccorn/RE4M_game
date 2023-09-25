enum PERMISSION_STATUS {
    denied = 'denied',
    default = 'default',
    granted = 'granted',
}

class Notificator {
    private permission = PERMISSION_STATUS.default;

    init() {
        switch (Notification.permission.toLowerCase()) {
            case 'granted':
                // можно
                break;
            case 'denied':
                // нельзя
                break;
            default: {
                // спросить
                this.requestPermission();
            }
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

    send(message: string) {
        if (this.hasPermission()) {
            const notification = new Notification(message);
            notification.onerror = () => null;
        }
    }
}

export default new Notificator();
