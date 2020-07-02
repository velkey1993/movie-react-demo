import React from 'react';
import Form from 'react-bootstrap/Form';
import { useField } from 'formik';

function AddMovieField({
    controlId, formLabel, formControlPlaceholder, ...props
}) {
    const [field, meta] = useField(props);
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{formLabel}</Form.Label>
            <Form.Control
                className={meta.touched && meta.error ? 'modal-input-bg error' : 'modal-input-bg'}
                placeholder={formControlPlaceholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error
                ? (
                    <div className='error-message'>
                        *
                        {meta.error}
                    </div>
                )
                : null}
        </Form.Group>
    );
}

export default AddMovieField;
