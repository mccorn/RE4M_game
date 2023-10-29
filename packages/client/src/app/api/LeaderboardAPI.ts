import BaseAPI, { API_URL } from '../api';

const filedNameForScore = 'filedNameForScore';
export interface ILeaderboard {
    data: {
        name: string;
        [filedNameForScore]: number;
        score: number;
    };
}

class LeaderboardAPI extends BaseAPI {
    url = `${API_URL.HOST}/leaderboard`;

    get(): Promise<ILeaderboard[]> {
        return fetch(`${this.url}/all`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                ratingFieldName: filedNameForScore,
                cursor: 0,
                limit: 10,
            }),
        }).then(async res => {
            const board = await res.json();
            return board;
        });
    }

    addUserToLeaderboard(name: string, score: number) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                data: {
                    name,
                    [filedNameForScore]: score,
                    score,
                },
                ratingFieldName: filedNameForScore,
                teamName: 'RE4M',
            }),
        });
    }
}

export default new LeaderboardAPI();
