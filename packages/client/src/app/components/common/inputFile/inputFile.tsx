import React, { FC } from 'react';
// import classNames from 'classnames';
// import style from './inputFile.module.scss';
import './inputFile.scss';
import { someFunction } from '@/const/types';

type TInputFileProps = {
    // size?: 'large' | 'medium' | 'small';
    // inputStyle?: 'normal';
    // isActive?: boolean;
    onChange?: someFunction;
    // value?: string;
    name?: string;
    // label?: string;
    // placeholder?: string;
    // className?: string;
};

const InputFile: FC<TInputFileProps> = ({
    // size = 'medium',
    // inputStyle = 'normal',
    // isActive = true,
    onChange,
    // value = '',
    // label = '',
    name = '',
    // placeholder,
    // className,
}) => (
    <div className="inputFile">
        <label className="inputFile_label">
            <span>+</span>
            <input onChange={onChange} className="inputFile_input" type="file" name={name} />
        </label>
    </div>
);

export default InputFile;
