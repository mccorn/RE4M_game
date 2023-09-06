import React, { FC, ReactNode, useMemo } from 'react';

import Form from '../../common/form/form';
import LazyInput, { TInputProps } from '../lazyInput/lazyInput';

import { someFunction } from '@/const/types';

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
type TInputHandler = (event: ChangeInputEvent, callback: someFunction) => unknown;

const handleChange: TInputHandler = (event, callback) => {
    callback(event.target.value);
};

interface IInputData extends TInputProps {
    handler: someFunction;
}

export const memo = (data: IInputData) => useMemo(() => data, [data.value]);

export const memoAll = (array: IInputData[]) => array.map(node => memo(node));

type TLazyFormProps = {
    inputs: IInputData[];
    children?: ReactNode;
    className?: string;
    wrapType?: 'line' | 'row' | string;
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
                wrapType={wrapType}
                onChange={e => handleChange(e as ChangeInputEvent, inputData.handler)}
                name={inputData.name}
                inputStyle="normal"
            />
        ))}

        {children}
    </Form>
);

export default LazyForm;
