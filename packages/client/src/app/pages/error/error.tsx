import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './error.module.scss';
import Button from '@/app/components/common/button/button';

type TCode = 404 | 500;

type TErrorProps = {
    code?: TCode;
};

const Error: FC<TErrorProps> = ({ code = 404 }) => {
    let message;
    if (code === 404) {
        message = 'No such page';
    } else {
        message = 'Something went wrong. We are fixing this';
    }
    const navigate = useNavigate();

    return (
        <div className={style.error}>
            <div className={style.error__code}>{code}</div>
            <div className={style.error__message}>{message}</div>
            <Button size="medium" click={() => navigate(-1)}>
                Go back
            </Button>
        </div>
    );
};

export default Error;
