import React from 'react';
import {Field, reduxForm} from 'redux-form';

// Move component declaration outside so that React does not render a new component every time
const Error = ({error, touched}) => {
    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        );
    }
    return null;
};

const Input = ({input, label, meta}) => {
    // validate function passes error objects to render input's meta property
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            <Error {...meta} />
        </div>
    );
};

const StreamForm = ({handleSubmit, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit((formValues) => onSubmit(formValues))} className="ui form error">
            <Field name="title" component={Input} label="Enter Title"/>
            <Field name="description" component={Input} label="Enter Description"/>
            <button className="ui button primary">Submit</button>
        </form>
    );
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';  //
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);

export default formWrapped;
