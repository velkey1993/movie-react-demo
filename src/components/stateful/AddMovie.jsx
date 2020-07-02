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
                    dispatch(addMovie(values))
                        .then((() => {
                            resetForm();
                            onHide();
                        }))
                        .catch(e => alert(e));
                    setSubmitting(false);
                }}
            >
                {}
                {
                    props => (
                        <Form onSubmit={props.handleSubmit}>
                            <ModalHeader closeButton />
                            <ModalBody>
                                <Modal.Title id='contained-modal-title-vcenter'>
                                    <h1>ADD MOVIE</h1>
                                </Modal.Title>
                                <AddMovieField
                                    controlId='formText'
                                    formLabel='TITLE'
                                    formControlPlaceholder='Select Title'
                                    name='title'
                                    type='text'
                                />
                                <AddMovieField
                                    controlId='formReleaseDate'
                                    formLabel='RELEASE DATE'
                                    formControlPlaceholder='Select Date'
                                    name='release_date'
                                    type='date'
                                />
                                <AddMovieField
                                    controlId='formPosterPath'
                                    formLabel='MOVIE URL'
                                    formControlPlaceholder='Movie URL here'
                                    name='poster_path'
                                    type='url'
                                />
                                <AppContext.Consumer>
                                    {
                                        value => (
                                            <AddMovieField
                                                controlId='formGenres'
                                                formLabel='GENRES URL'
                                                name='genres'
                                                as='select'
                                                multiple
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
                                            </AddMovieField>
                                        )
                                    }
                                </AppContext.Consumer>
                                <AddMovieField
                                    controlId='formOverview'
                                    formLabel='OVERVIEW'
                                    formControlPlaceholder='Overview here'
                                    name='overview'
                                    type='text'
                                />
                                <AddMovieField
                                    controlId='formRuntime'
                                    formLabel='RUNTIME'
                                    formControlPlaceholder='Runtime here'
                                    name='runtime'
                                    type='number'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    id='modal-footer-bt-reset'
                                    type='reset'
                                    onClick={props.resetForm}
                                >
                                    RESET
                                </Button>
                                <Button
                                    id='modal-footer-bt-submit'
                                    variant='primary'
                                    type='submit'
                                    disabled={props.isSubmitting}
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
