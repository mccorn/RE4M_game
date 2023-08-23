import React, { useState, FormEventHandler, ReactElement } from 'react';
import style from './topic.module.scss';
import TopicCard from '@/components/topicCard/topicCard';
import Button from '@/components/common/button/button';

const Topic = () => {
    const [comments, setComments] = useState([] as ReactElement[]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault();
        const formValue = Object.fromEntries(
            new FormData(ev.target as HTMLFormElement)
        ) as unknown as { comment: string };
        (ev.target as HTMLFormElement).reset();
        comments.push(
            <div className={style.comment} key={new Date().getTime()}>
                <h2 className={style.comment__header}>Olga</h2>
                <p className={style.comment__text}>{formValue.comment}</p>
                <p className={style.comment__time}>{new Date().toUTCString()}</p>
            </div>
        );
        setComments(Array.from(comments));
    };

    return (
        <div className={style.topic__wrapper}>
            <TopicCard
                title="Eleifend non lacinia aenean in sed justo"
                text={`In non hac et. Et quis, nunc dictum mattis mattis leo, et lectus in
                consectetur odio. Sapien risus nisi tortor, quam, pulvinar faucibus.
                In odio. Interdum dictumst. Et. Mollis nisi leo, et lorem aenean mattis
                sit libero, ut. Tortor, dapibus consectetur libero, tortor, integer nunc
                integer sodales ipsum malesuada odio. Molestie nisi vulputate ipsum non mattis
                cursus dictum. In id sed accumsan ornare tempus lectus imperdiet sit ornare sit
                eget dictum aenean habitasse amet, dui in sapien eleifend sed sit ex. Vel arcu
                efficitur est. Lacinia non sit nunc justo leo, lacinia ipsum vitae ipsum cursus
                lectus mauris vitae i.`}
                id="1"
            />
            <form onSubmit={handleSubmit} className={style.form}>
                <textarea
                    placeholder="type a comment"
                    name="comment"
                    cols={30}
                    rows={5}
                    className={style.form__textarea}
                />
                <Button type="submit" text="add comment" />
            </form>
            <div className={style.comment__feed}>{comments}</div>
        </div>
    );
};

export default Topic;
