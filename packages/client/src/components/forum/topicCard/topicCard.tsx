import React from 'react';
import { Link } from 'react-router-dom';
import style from './topicCard.module.scss';

const TopicCard = ({ title, text, id } : {title: string, text: string, id: string}) => (
    <article className={style.topic}>
        <header className={style.topic__header}><Link to={`/forum/topic/${id}`}>{ title }</Link></header>
        <main className={style.topic__body}>
            { text }
        </main>
    </article>
);

export default TopicCard;
