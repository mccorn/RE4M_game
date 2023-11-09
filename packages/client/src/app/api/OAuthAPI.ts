import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '.';
import AuthAPI from './AuthAPI';
import { TResponse } from '@/const/types';

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

        const response = await http.post(`${this.url}/yandex`, reqOptions);

        const status = (response as TResponse)?.status;

        if (status === 200) {
            return AuthAPI.getAuthUser();
        }

        return null;
    }

    getServiceId() {
        return http.get(`${this.url}/yandex/service-id?redirect_uri=${window.location.origin}`);
    }
}

export default new OAuthAPI();
