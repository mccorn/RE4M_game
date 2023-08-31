import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '../api';
import { AuthUserData } from '@/const/dataTypes/dataTypes';

const url = `${API_URL.HOST}/auth`;
const http = HTTPTransport;
const options = {};
const headersJSON = {
    'content-type': 'application/json', // Данные отправляем в формате JSON
};

class AuthAPI extends BaseAPI {
    static async login(data: AuthUserData) {
        const userResponse = (await AuthAPI.getAuthUser()) as Response;

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
        return http.get(`${url}/user`);
    }

    static logout() {
        return http.post(`${url}/logout`);
    }
}

export default AuthAPI;
