/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-mixed-operators */
import React, { FC } from 'react';
import style from './progressbar.module.scss';

type TProgressbarProps = {
    text?: string;
    min?: number;
    max?: number;
    value: number;
};

const Progressbar: FC<TProgressbarProps> = ({ value, min = 0, max = 100, text = '' }) => {
    const percent = Math.ceil((value / (max - min)) * 100);

    return (
        <div className={style.progressbar_wrapper}>
            <div className={style.progressbar_wrapper_progress} style={{ width: `${percent}%` }}>
                {text ?? ''}
                &nbsp;
                {percent}%
            </div>
        </div>
    );
};

export default Progressbar;
