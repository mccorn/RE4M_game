import React, { FC } from 'react';
import score from '@/const/mocks/mockScore';
import style from './leaderboard.module.scss';

const LeaderBoard: FC = () => {
    const players = score;
    const playersMarkUp = players.map((player, id) => (
        <tr>
            <td className={style.leaderboard__td}>{id + 1}</td>
            <td className={style.leaderboard__td}>{player.name}</td>
            <td className={style.leaderboard__td}>{player.score}</td>
        </tr>
    ));
    return (
        <table className={style.leaderboard}>
            <tr>
                <th className={style.leaderboard__th}>№</th>
                <th className={style.leaderboard__th}>Nickname</th>
                <th className={style.leaderboard__th}>Score</th>
            </tr>
            {playersMarkUp}
        </table>
    );
};

export default LeaderBoard;