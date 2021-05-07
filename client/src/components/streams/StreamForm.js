import React from 'react';
import {Field, Form} from 'react-final-form';
import {connect} from 'react-redux';

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

const StreamForm = ({onSubmit, initialValues}) => {
    return (
        <Form onSubmit={onSubmit} validate={validate} initialValues={initialValues}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="ui form error">
                    <Field name="title" label="Enter Title">{Input}</Field>
                    <Field name="description" component={Input} label="Enter Description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            )}
        </Form>
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

const mapStateToProps = ({form}) => {
    return {
        streamForm: form
    }
};


export default connect(mapStateToProps, {})(StreamForm);
