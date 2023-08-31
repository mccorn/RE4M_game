import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '../api';

const url = `${API_URL.HOST}/user`;
const http = HTTPTransport;
const options = {};
const headersJSON = {
    'content-type': 'application/json',
};

class UserAPI extends BaseAPI {
    static update(data: object = {}) {
        const reqOptions = Object.assign(options, {
            headers: headersJSON,
            data: JSON.stringify(data),
        });

        return http.put(`${url}/profile`, reqOptions);
    }

    // updateAvatar(data: unknown) {
    //     const reqOptions = Object.assign({}, { data }, options)

    //     return http.put(url + '/profile/avatar', reqOptions);
    // }

    static updatePassword(data: object = {}) {
        const reqOptions = Object.assign(options, {
            headers: headersJSON,
            data: JSON.stringify(data),
        });

        return http.put(`${url}/password`, reqOptions);
    }

    // getUserById(id: string | number) {
    //     const reqOptions = Object.assign(options, {})

    //     return http.get(url + '/user/' + id, reqOptions);
    // }

    // search(data: { login: string } = { login: "" }) {
    //     const reqOptions = Object.assign(options,
    //         {
    //             headers: headersJSON,
    //             data: JSON.stringify(data)
    //         }
    //     )

    //     return http.post(url + '/search', reqOptions);
    // }
}

export default UserAPI;
