import React, { FC, ChangeEventHandler } from 'react';
import classNames from 'classnames';
import Input from '../../common/input/input';

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
    wrapType?: string;
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
    wrapType,
}) => (
    <Input
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder || name}
        label={label || name}
        isActive={isActive}
        className={classNames(className, wrapType)}
        inputStyle={inputStyle}
        size={size}
    />
);

export default LazyInput;
