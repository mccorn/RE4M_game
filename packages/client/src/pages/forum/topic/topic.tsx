import React, { useState, FormEventHandler, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import style from './topic.module.scss';
import TopicCard from '@/components/forum/topicCard/topicCard';
import Button from '@/components/common/button/button';
import mockTopics from '@/mocks/mockTopics';
import Avatar from '@/assets/images/defaultAvatar.png';

const Topic = () => {
    const [comments, setComments] = useState([] as ReactElement[]);
    const { id } = useParams();
    const topic = (
        <TopicCard
            title={mockTopics[Number(id)].title}
            text={mockTopics[Number(id)].text}
            id={mockTopics[Number(id)].id} />
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault();
        const formValue = Object.fromEntries(
            new FormData(ev.target as HTMLFormElement)
        ) as unknown as { comment: string };
        (ev.target as HTMLFormElement).reset();
        comments.push(
            <div className={style.comment} key={new Date().getTime()}>
                <header className={style.comment__header}>
                    <img className={style.comment__avatar} src={Avatar} alt="avatar" />
                    <h2 className={style.comment__name}>Olga</h2>
                </header>
                <p className={style.comment__text}>{formValue.comment}</p>
                <p className={style.comment__time}>{new Date().toUTCString()}</p>
            </div>
        );
        setComments(Array.from(comments));
    };

    return (
        <div className={style.topic__wrapper}>
            {topic}
            <form onSubmit={handleSubmit} className={style.form}>
                <textarea
                    placeholder="type a comment"
                    name="comment"
                    cols={30}
                    rows={5}
                    className={style.form__textarea} />
                <Button type="submit" text="add comment" />
            </form>
            <div className={style.comment__feed}>{comments}</div>
        </div>
    );
};

export default Topic;
