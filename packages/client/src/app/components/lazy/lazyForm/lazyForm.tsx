import React, { FC, ReactNode } from 'react';
// import LazyInput from '../lazyInput/lazyInput';
// import classNames from 'classnames';
// import style from './form.module.scss';

type TLazyFormProps = {
    children?: ReactNode;
    className?: string;
};

const Form: FC<TLazyFormProps> = ({ children, className }) => (
    <Form className={className}>
        {/* <LazyInput
            value={login}
            className="onOneLine"
            onChange={e => handleChange(e as ChangeInputEvent, setLogin)}
            name="login"
            label="login"
            placeholder="login"
            inputStyle="normal"
        /> */}

        {children}
    </Form>
);

export default Form;
