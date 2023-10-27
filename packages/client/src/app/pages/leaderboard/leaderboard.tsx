import React, { FC, useEffect, useState } from 'react';
import style from './leaderboard.module.scss';
import LeaderboardAPI, { ILeaderboard } from '@/app/api/LeaderboardAPI';

const LeaderBoard: FC = () => {
    const [playerState, setPlayers] = useState<Array<ILeaderboard>>([]);

    useEffect(() => {
        LeaderboardAPI.get().then(players => {
            setPlayers(players);
        });
    }, []);

    return (
        <table className={style.leaderboard}>
            <thead>
                <tr>
                    <th className={style.leaderboard__th}>№</th>
                    <th className={style.leaderboard__th}>Nickname</th>
                    <th className={style.leaderboard__th}>Score</th>
                </tr>
            </thead>
            <tbody>
                {playerState.map(({ data: player }, index) => (
                    // because this list will not be reordering
                    // eslint-disable-next-line react/no-array-index-key
                    <tr key={player.name + player.score + index}>
                        <td className={style.leaderboard__td}>{index + 1}</td>
                        <td className={style.leaderboard__td}>{player.name}</td>
                        <td className={style.leaderboard__td}>{player.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeaderBoard;
