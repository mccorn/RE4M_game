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
        const reqOptions = Object.assign(options, {
            headers: headersJSON,
            data: JSON.stringify(data),
        });

        return http.put(`${this.url}/profile`, reqOptions);
    }

    updateAvatar(data: unknown) {
        const reqOptions = { ...options, data };

        return http.put(`${this.url}/profile/avatar`, reqOptions);
    }

    updatePassword(data: object = {}) {
        const reqOptions = Object.assign(options, {
            headers: headersJSON,
            data: JSON.stringify(data),
        });

        return http.put(`${this.url}/password`, reqOptions);
    }

    // getUserById(id: string | number) {
    //     const reqOptions = Object.assign(options, {})

    //     return http.get(this.url + '/user/' + id, reqOptions);
    // }

    // search(data: { login: string } = { login: "" }) {
    //     const reqOptions = Object.assign(options,
    //         {
    //             headers: headersJSON,
    //             data: JSON.stringify(data)
    //         }
    //     )

    //     return http.post(this.url + '/search', reqOptions);
    // }
}

export default new UserAPI();
