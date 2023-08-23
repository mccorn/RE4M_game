import { HTTPTransport } from '@/utils/HTTPTransport/HTTPTransport';
import { BASE_URL } from '.';
import { someObject } from '@/const/types';

const url = `${BASE_URL}/auth`;
const http = new HTTPTransport();
const options = {};
const headersJSON = {
    'content-type': 'application/json', // Данные отправляем в формате JSON
};

class AuthAPI {
    static async login(data: object = {}) {
        const userResponse = (await AuthAPI.getAuthUser()) as someObject;

        if (userResponse.status === 200) {
            await AuthAPI.logout();
        }

        return AuthAPI.signin(data);
    }

    static signin(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.post(`${url}/signin`, reqOptions);
    }

    static signup(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.post(`${url}/signup`, reqOptions);
    }

    static getAuthUser() {
        const reqOptions = { ...options };

        return http.get(`${url}/user`, reqOptions);
    }

    static logout() {
        return http.post(`${url}/logout`, {});
    }
}

export default AuthAPI;
