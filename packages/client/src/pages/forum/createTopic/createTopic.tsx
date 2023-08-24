import React, { FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '@/components/common/button/button';
import style from './createTopic.module.scss';
import Close from '@/assets/images/cross-svgrepo-com.svg';
import { RoutePaths } from '@/router/router';

const CreateTopic = () => {
    const navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault();
        const formValue = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
        console.log(formValue);
        navigate(RoutePaths.FORUM__URL);
    };

    return (
        <div className={style.createTopic__wrapper}>
            <ErrorBoundary fallback={<div>something went wrond</div>}>
                <form className={style.createTopic} onSubmit={handleSubmit}>
                    <Link className={style.createTopic__close} to={RoutePaths.FORUM__URL}>
                        <img className={style.createTopic__smallImage} src={Close} alt="close" />
                    </Link>
                    <input
                        placeholder="title of topic"
                        className={style.createTopic__input}
                        name="title"
                        type="text"
                    />
                    <textarea
                        placeholder="text of topic"
                        className={style.createTopic__textarea}
                        name="text"
                        id=""
                        cols={30}
                        rows={10}
                    />
                    <Button type="submit" text="Publish a topic" />
                </form>
            </ErrorBoundary>
        </div>
    );
};

export default CreateTopic;
