import React, { FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import style from './leaderboard.module.scss';
import LeaderboardAPI from '@/app/api/LeaderboardAPI';

const LeaderBoard: FC = () => {
    const [playersMarkUp, setPlayersMarkUp] = useState<ReactNode>([]);

    useEffect(() => {
        LeaderboardAPI.get().then(players => {
            const markUp = players.map(({ data: player }, index) => (
                <tr key={player.name + player.score}>
                    <td className={style.leaderboard__td}>{index + 1}</td>
                    <td className={style.leaderboard__td}>{player.name}</td>
                    <td className={style.leaderboard__td}>{player.score}</td>
                </tr>
            ));
            setPlayersMarkUp(markUp as SetStateAction<ReactNode>);
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
            <tbody>{playersMarkUp}</tbody>
        </table>
    );
};

export default LeaderBoard;
