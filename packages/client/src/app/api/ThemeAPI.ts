import BaseAPI, { API_URL } from '../api';
import changeColorMode from '../helpers/changeColorMode';

class ThemeAPI extends BaseAPI {
    url = `${API_URL.LOCALHOST}/theme`;

    currentTheme = 'Light';

    switch(login?: string) {
        console.log(import.meta.env.PROD, import.meta.env.MODE, import.meta.env.VITE_API_ADDRESS);
        return fetch(
            `${this.url}/switchTheme?theme=${this.currentTheme}${login ? `&login=${login}` : ''}`,
            { method: 'PUT' }
        )
            .then(res => res.json())
            .then((theme: { themeName: string }) => {
                this.currentTheme = theme.themeName;
                changeColorMode(this.currentTheme as 'Light' | 'Dark');
            });
    }
}

export default new ThemeAPI();
