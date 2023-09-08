import React, { FC } from 'react';
import style from './inputFile.module.scss';
import { someFunction } from '@/const/types';

type TInputFileProps = {
    onChange?: someFunction;
    name?: string;
};

const InputFile: FC<TInputFileProps> = ({ onChange, name = '' }) => (
    <div className={style.inputFile}>
        <label>
            <span>+</span>
            <input onChange={onChange} type="file" name={name} />
        </label>
    </div>
);

export default InputFile;
