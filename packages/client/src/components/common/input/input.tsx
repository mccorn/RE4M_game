import React, { FC, ChangeEventHandler } from 'react';
import classNames from 'classnames';
import style from './input.module.scss';

type TInputProps = {
    size?: 'large' | 'medium' | 'small';
    inputStyle?: 'normal';
    isActive?: boolean;
    onChange?: ChangeEventHandler;
    value: string;
    label?: string;
    placeholder?: string;
};

const Input: FC<TInputProps> = ({
    size = 'medium',
    inputStyle = 'normal',
    isActive = true,
    onChange,
    value = 'button',
    label = 'button',
    placeholder,
}) => (
    <label className={classNames('column', style[size], style[inputStyle])}>
        <span>{label}</span>
        <input onChange={onChange} value={value} disabled={!isActive} placeholder={placeholder} />
    </label>
);

export default Input;
