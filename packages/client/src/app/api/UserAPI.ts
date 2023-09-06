import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '../api';

const http = HTTPTransport;
const options = {};
const headersJSON = {
    'content-type': 'application/json',
};

class UserAPI extends BaseAPI {
    url = `${API_URL.HOST}/user`;

    update(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.put(`${this.url}/profile`, reqOptions);
    }

    updateAvatar(data: unknown) {
        const reqOptions = { ...options, data };

        return http.put(`${this.url}/profile/avatar`, reqOptions);
    }

    updatePassword(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.put(`${this.url}/password`, reqOptions);
    }
}

export default new UserAPI();
