import React, { FC, ReactNode } from 'react';
import Form from '../../common/form/form';
import LazyInput from '../lazyInput/lazyInput';
import { someFunction } from '@/const/types';
// import LazyInput from '../lazyInput/lazyInput';
// import classNames from 'classnames';
// import style from './form.module.scss';

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
type TInputHandler = (event: ChangeInputEvent, callback: someFunction) => unknown;

const handleChange: TInputHandler = (event, callback) => {
    callback(event.target.value);
};

type TLazyFormProps = {
    inputs: any[];
    children?: ReactNode;
    className?: string;
};

const LazyForm: FC<TLazyFormProps> = ({ children, className, inputs }) => (
    <Form className={className}>
        {inputs.map(inputData => (
            <LazyInput
                key={inputData.name}
                value={inputData.value}
                className="onOneLine"
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
