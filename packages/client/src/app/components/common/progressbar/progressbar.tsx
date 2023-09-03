/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-mixed-operators */
import React, { FC, useEffect } from 'react';

type TProgressbarProps = {
    text?: string;
    min?: number;
    max?: number;
    value: number;
};

const Progressbar: FC<TProgressbarProps> = ({ value, min = 0, max = 100, text = '' }) => {
    let percent = Math.ceil((value / (max - min)) * 100);

    useEffect(() => {
        percent = Math.ceil((value / (max - min)) * 100);
    });

    return (
        <div>
            {text ?? ''}
            &nbsp;
            {percent}%
        </div>
    );
};

export default Progressbar;
