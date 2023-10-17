import HTTPTransport from '@/utils/HTTPTransport/HTTPTransport';
import BaseAPI, { API_URL } from '../api';

const http = HTTPTransport;

class ThemeAPI extends BaseAPI {
    url = `${API_URL.LOCALHOST}/theme`;

    switch(data: { theme: string; login?: string }) {
        return fetch(
            `${this.url}/switchTheme?theme=${data.theme}${
                data.login ? `&login=${data.login}` : ''
            }`,
            { method: 'PUT' }
        );
    }
}

export default new ThemeAPI();
