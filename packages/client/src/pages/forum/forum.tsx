import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './forum.module.scss';
import Button from '@/components/common/button/button';
import TopicCard from '@/components/forum/topicCard/topicCard';
import mockTopics from '@/mocks/mockTopics';
import { RoutePaths } from '@/router/router';

const Forum: FC = () => {
    const navigate = useNavigate();
    const topics = mockTopics.map(topic => (
        <TopicCard title={topic.title} text={topic.text} id={topic.id} />
    ));

    return (
        <div className={style.topic__feed}>
            <div className={style.topic__create}>
                <Button
                    click={() => {
                        navigate(RoutePaths.CREATE_TOPIC);
                    }}
                    text="Create a topic" />
            </div>
            {topics}
        </div>
    );
};

export default Forum;
