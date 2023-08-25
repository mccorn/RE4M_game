const APP_HOST = 'https://ya-praktikum.tech/api';
const HOST = `${APP_HOST}/v2`;

export const API_URL = {
    HOST,
    APP_HOST,
    RESOURCES: `${HOST}/resources`,
};

export class BaseAPI {
    static create() {
        throw new Error('Not implemented');
    }

    static request() {
        throw new Error('Not implemented');
    }

    static update() {
        throw new Error('Not implemented');
    }

    static delete() {
        throw new Error('Not implemented');
    }
}

export default BaseAPI;
