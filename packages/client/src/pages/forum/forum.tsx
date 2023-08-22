import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './forum.module.scss';
import Button from '@/components/common/button/button';

const Forum: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={style.topic__feed}>
            <div className={style.topic__create}>
                <Button
                    click={() => {
                        navigate('/forum/topic/create');
                    }}
                    text="Create a topic" />
            </div>
            <article className={style.topic}>
                <header className={style.topic__header}><Link to="/forum/topic/1">Eleifend non lacinia aenean in sed justo</Link></header>
                <main className={style.topic__body}>
                    In non hac et. Et quis, nunc dictum mattis mattis leo, et lectus in
                    consectetur odio. Sapien risus nisi tortor, quam, pulvinar faucibus.
                    In odio. Interdum dictumst. Et. Mollis nisi leo, et lorem aenean mattis
                    sit libero, ut. Tortor, dapibus consectetur libero, tortor, integer nunc
                    integer sodales ipsum malesuada odio. Molestie nisi vulputate ipsum non mattis
                    cursus dictum. In id sed accumsan ornare tempus lectus imperdiet sit ornare sit
                    eget dictum aenean habitasse amet, dui in sapien eleifend sed sit ex. Vel arcu
                    efficitur est. Lacinia non sit nunc justo leo, lacinia ipsum vitae ipsum cursus
                    lectus mauris vitae i.
                </main>
            </article>
            <article className={style.topic}>
                <header className={style.topic__header}><Link to="/forum/topic/2">psum tortor, ex. Lorem orci, vulputate dolo</Link></header>
                <main className={style.topic__body}>
                    Amet, dapibus faucibus. Ut. Sit hac efficitur est. Morbi odio. Arcu leo, dictum.
                    Habitasse dictumst. Cras orci, platea non lorem pular vulputate et ornare amet,
                    ornare aenean efficitur et. Pulvinar sed eget orci,sus veimperdiet dictum. Orci,
                    in id non ornare vulputate elit. Non dui sapien duon cursus quis, amet, id nunc
                    efficitur ex. Sit id dapibus luctus pulvinar cursus sa luctus eget dolor morbi
                    nisi ornare venenatis quis, lacinia morbi eleifenctus ornare lectus vitae pulvir
                    sapien imperdiet hac lectus tempus amet, luctus asan in dium. Odio. Ex. Libero,
                    et risus et. Dui vulputate dolor dictum. Quis.
                </main>
            </article>
        </div>
    );
};

export default Forum;
