import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import Form from '../../common/form/form';
import LazyInput from '../lazyInput/lazyInput';

import { someFunction } from '@/const/types';

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
type TInputHandler = (event: ChangeInputEvent, callback: someFunction) => unknown;

const handleChange: TInputHandler = (event, callback) => {
    callback(event.target.value);
};

type TLazyFormProps = {
    inputs: any[];
    children?: ReactNode;
    className?: string;
    wrapType?: 'line' | 'row';
};

const LazyForm: FC<TLazyFormProps> = ({
    children,
    className,
    inputs,
    wrapType = 'line stretch',
}) => (
    <Form className={className}>
        {inputs.map(inputData => (
            <LazyInput
                key={inputData.name}
                value={inputData.value}
                className={classNames('onOneLine', wrapType)}
                onChange={e => handleChange(e as ChangeInputEvent, inputData.handler)}
                name={inputData.name}
                label={inputData.label || inputData.name}
                placeholder={inputData.placeholder || inputData.name}
                inputStyle="normal"
            />
        ))}

        {children}
    </Form>
);

export default LazyForm;
