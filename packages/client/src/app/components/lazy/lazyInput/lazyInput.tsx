import React, { FC, ChangeEventHandler } from 'react';
import classNames from 'classnames';
import style from './lazyInput.module.scss';

type TInputProps = {
    size?: 'large' | 'medium' | 'small';
    inputStyle?: 'normal';
    isActive?: boolean;
    onChange?: ChangeEventHandler;
    value: string;
    name?: string;
    label?: string;
    placeholder?: string;
    className?: string;
};

const LazyInput: FC<TInputProps> = ({
    size = 'medium',
    inputStyle = 'normal',
    isActive = true,
    onChange,
    value = '',
    label = '',
    name = '',
    placeholder,
    className,
}) => (
    <label className={classNames('column inputWrapper', style[size], style[inputStyle], className)}>
        <span>{label}</span>
        <input
            onChange={onChange}
            name={name}
            value={value}
            disabled={!isActive}
            placeholder={placeholder}
        />
    </label>
);

export default LazyInput;
