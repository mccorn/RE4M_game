import React, { FormEventHandler } from 'react';
import Button from '@/components/common/button/button';
import style from './createTopic.module.scss';

const CreateTopic = () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();
        const formValue = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
        console.log(formValue);
    };

    return (
        <div className={style.createTopic__wrapper}>
            <form className={style.createTopic} onSubmit={handleSubmit}>
                <input placeholder="title of topic" className={style.createTopic__input} name="title" type="text" />
                <textarea placeholder="text of topic" className={style.createTopic__textarea} name="text" id="" cols={30} rows={10} />
                <Button type="submit" text="Publish a topic" />
            </form>
        </div>
    );
};

export default CreateTopic;
