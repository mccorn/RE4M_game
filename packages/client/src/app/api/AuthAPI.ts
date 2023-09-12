import { store } from '@store/store';
import { setUser } from '@store/reducers/userReducer';
import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '../api';
import { AuthUserData } from '@/const/dataTypes/dataTypes';
import { TUserModel } from '@/const/dataTypes/serverModels';
import DataMapper from '@/utils/dataMapper';

const http = HTTPTransport;
const options = {};
const headersJSON = {
    'content-type': 'application/json', // Данные отправляем в формате JSON
};

class AuthAPI extends BaseAPI {
    url = `${API_URL.HOST}/auth`;

    async login(data: AuthUserData) {
        const userResponse = (await this.getAuthUser()) as Response;

        if (userResponse.status === 200) {
            await this.logout();
        }

        return this.signin(data);
    }

    signin(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.post(`${this.url}/signin`, reqOptions);
    }

    signup(data: object = {}) {
        const reqOptions = {
            ...options,
            headers: headersJSON,
            data: JSON.stringify(data),
        };

        return http.post(`${this.url}/signup`, reqOptions);
    }

    getAuthUser() {
        return http.get(`${this.url}/user`);
    }

    logout() {
        return http.post(`${this.url}/logout`);
    }

    public getUser = () => {
        this.getAuthUser()
            .then(response => {
                console.log('in get user');
                const data = response as XMLHttpRequest;
                const user = JSON.parse(data.response) as TUserModel;
                store.dispatch(setUser(DataMapper.mapServerUserData(user)));
            })
            .catch(error => {
                console.log('Get user error', error);
            });
    };
}

export default new AuthAPI();
