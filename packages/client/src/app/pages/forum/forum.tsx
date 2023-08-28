import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './forum.module.scss';
import Button from '@/app/components/common/button/button';
import TopicCard from '@/app/components/forum/topicCard/topicCard';
import { RoutePaths } from '@/app/router/router';
import mockTopics from '@/const/mocks/mockTopics';

const Forum: FC = () => {
    const navigate = useNavigate();
    const topics = mockTopics.map((topic: { title: string; text: string; id: string }) => (
        <TopicCard key={topic.id} title={topic.title} text={topic.text} id={topic.id} />
    ));

    return (
        <div className={style.topic__feed}>
            <div className={style.topic__create}>
                <Button
                    click={() => {
                        navigate(RoutePaths.CREATE_TOPIC);
                    }}
                    text="Create a topic"
                />
            </div>
            {topics}
        </div>
    );
};

export default Forum;
