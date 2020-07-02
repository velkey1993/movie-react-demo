import React from 'react';
import Form from 'react-bootstrap/Form';

function AddMovieField({
    controlId, formLabel, touched, errors, formControlType, formControlName, formControlPlaceholder,
    handleChange, handleBlur, formControlValue,
}) {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{formLabel}</Form.Label>
            <Form.Control
                className={touched && errors ? 'modal-input-bg error' : 'modal-input-bg'}
                type={formControlType}
                name={formControlName}
                placeholder={formControlPlaceholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={formControlValue}
            />
            {touched && errors
                ? (
                    <div className='error-message'>
                        *
                        {errors}
                    </div>
                )
                : null}
        </Form.Group>
    );
}

export default AddMovieField;
