import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '.';

const http = HTTPTransport;
const options = {};
const headersJSON = {
    Accept: 'application/json',
    'Content-type': 'application/json',
};

class OAuthAPI extends BaseAPI {
    url = `${API_URL.HOST}/oauth`;

    async oauth(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.post(`${this.url}/yandex`, reqOptions);
    }

    getServiceId() {
        return http.get(`${this.url}/yandex/service-id?redirect_uri=http://localhost:3000`);
    }
}

export default new OAuthAPI();
