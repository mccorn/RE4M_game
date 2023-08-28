import React, { FC } from 'react';

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
    return <div>{message}</div>;
};

export default Error;
