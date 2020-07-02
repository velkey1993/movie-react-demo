import React from 'react';
import {
    Button, Modal, ModalBody, ModalFooter,
} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Formik } from 'formik';
import * as yup from 'yup';
import './AddMovie.css';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/moviesActions';
import AppContext from './AppContext';
import AddMovieField from '../stateless/AddMovieField';

const schema = yup.object()
    .shape({
        title: yup.string()
            .required('Title required!'),
        release_date: yup.date()
            .required('Release date required!'),
        poster_path: yup.string()
            .required('Movie URL required!'),
        genres: yup.array()
            .required('Genre required!'),
        overview: yup.string()
            .required('Overview required!'),
        runtime: yup.number()
            .required('Runtime required!'),
    });

function AddMovie({ show, onHide }) {
    const modalFormVariables = {
        show,
        onHide,
    };
    const dispatch = useDispatch();

    function blurRoot() {
        const root = document.getElementById('root');
        root.style.opacity = '0.5';
        root.style.filter = 'blur(5px)';
    }

    function resetRoot() {
        const root = document.getElementById('root');
        // "" removes these styles, otherwise fixed position is buggy.
        root.style.opacity = '';
        root.style.filter = '';
    }

    return (
        <Modal
            {...modalFormVariables}
            onShow={() => blurRoot()}
            onExit={() => resetRoot()}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            style={{ opacity: 1 }}
        >
            <Formik
                validationSchema={schema}
                initialValues={{
                    title: 'Test',
                    release_date: '2017-12-01',
                    poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
                    genres: ['Drama', 'Fantasy', 'Romance'],
                    overview: 'An other-worldly story ...',
                    runtime: 123,
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    dispatch(addMovie(values));
                    resetForm();
                    onHide();
                    setSubmitting(false);
                }}
            >
                {}
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <ModalHeader closeButton />
                        <ModalBody>
                            <Modal.Title id='contained-modal-title-vcenter'>
                                <h1>ADD MOVIE</h1>
                            </Modal.Title>
                            <AddMovieField
                                controlId='formText'
                                formLabel='TITLE'
                                touched={touched.title}
                                errors={errors.title}
                                formControlType='text'
                                formControlName='title'
                                formControlPlaceholder='Select Title'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                formControlValue={values.title}
                            />
                            <AddMovieField
                                controlId='formReleaseDate'
                                formLabel='RELEASE DATE'
                                touched={touched.release_date}
                                errors={errors.release_date}
                                formControlType='date'
                                formControlName='release_date'
                                formControlPlaceholder='Select Date'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                formControlValue={values.release_date}
                            />
                            <AddMovieField
                                controlId='formPosterPath'
                                formLabel='MOVIE URL'
                                touched={touched.poster_path}
                                errors={errors.poster_path}
                                formControlType='url'
                                formControlName='poster_path'
                                formControlPlaceholder='Movie URL here'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                formControlValue={values.poster_path}
                            />
                            <AppContext.Consumer>
                                {
                                    value => (
                                        <Form.Group controlId='formGenres'>
                                            <Form.Label>GENRES</Form.Label>
                                            <Form.Control
                                                className={touched.genres && errors.genres ? 'modal-input-bg error' : 'modal-input-bg'}
                                                multiple
                                                as='select'
                                                name='genres'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.genres}
                                            >
                                                {
                                                    value.genres.map(genre => (
                                                        <option
                                                            key={genre.name}
                                                            value={genre.name}
                                                        >
                                                            {genre.name}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                            {touched.genres && errors.genres
                                                ? (
                                                    <div className='error-message'>
                                                        *
                                                        {errors.genres}
                                                    </div>
                                                )
                                                : null}
                                        </Form.Group>
                                    )
                                }
                            </AppContext.Consumer>
                            <AddMovieField
                                controlId='formOverview'
                                formLabel='OVERVIEW'
                                touched={touched.overview}
                                errors={errors.overview}
                                formControlType='text'
                                formControlName='overview'
                                formControlPlaceholder='Overview here'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                formControlValue={values.overview}
                            />
                            <AddMovieField
                                controlId='formRuntime'
                                formLabel='RUNTIME'
                                touched={touched.runtime}
                                errors={errors.runtime}
                                formControlType='number'
                                formControlName='runtime'
                                formControlPlaceholder='Runtime here'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                formControlValue={values.runtime}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                id='modal-footer-bt-reset'
                                type='reset'
                                onClick={resetForm}
                            >
                                RESET
                            </Button>
                            <Button
                                id='modal-footer-bt-submit'
                                variant='primary'
                                type='submit'
                                disabled={isSubmitting}
                            >
                                SUBMIT
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default AddMovie;
