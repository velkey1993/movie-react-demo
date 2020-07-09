/* eslint-disable react/button-has-type */
import React from 'react';
import * as yup from 'yup';
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import CloseButton from '../stateless/CloseButton';
import MultiValueSelector from '../stateless/MultiValueSelector';

const GENRES = [
    'Adventure',
    'Comedy',
    'Family',
    'Animation',
    'Drama',
    'Romance',
    'Science Fiction',
    'Action',
    'Mystery',
    'Thriller',
];

const schema = yup.object().shape({
    title: yup.string().required('Title required!'),
    release_date: yup.date().required('Release date required!'),
    poster_path: yup.string().required('Movie URL required!'),
    genres: yup.array().min(1, 'Genre required!'),
    overview: yup.string().required('Overview required!'),
    runtime: yup.number().min(0, 'Runtime min 0!').required('Runtime required!'),
});

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        const { movie } = props;
        this.state = { movie };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMultiValueInputChange = this.handleMultiValueInputChange.bind(this);
    }

    componentDidMount() {
        const documentWidth = document.documentElement.clientWidth;
        const windowWidth = window.innerWidth;
        const scrollBarWidth = windowWidth - documentWidth;
        this.resize = scrollBarWidth;
        this.initialOverflow = document.body.style.overflow;
        this.initialPadding = document.body.style.paddingRight;
        document.body.style.paddingRight += `${scrollBarWidth}px`;
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = this.initialOverflow;
        document.body.style.paddingRight = this.initialPadding;
    }

    handleInputChange(event) {
        const { target } = event;
        const { value, name, type } = target;
        this.setState(state => ({
            movie: { ...state.movie, [name]: type === 'number' ? parseInt(value, 10) : value },
        }));
    }

    handleMultiValueInputChange(name, multiValues) {
        this.setState(state => ({
            movie: {
                ...state.movie,
                [name]: multiValues,
            },
        }));
    }

    render() {
        return (
            <div
                className='modal-wrapper blur'
                style={{
                    paddingRight: `${this.initialPadding + this.resize}px`,
                }}
            >
                <div className='x-modal-edit-content'>
                    <CloseButton close={this.props.close} />
                    <Formik
                        validationSchema={schema}
                        initialValues={this.props.movie}
                        onSubmit={(values, { setSubmitting }) => {
                            this.props.updateMovie(values)
                                .then(this.props.close)
                                .then(() => this.props.addToast('Saved Successfully', { appearance: 'success', autoDismiss: true }))
                                .catch((error) => {
                                    setSubmitting(false);
                                    this.props.addToast(error.message, { appearance: 'error', autoDismiss: true });
                                });
                        }}
                    >
                        {({
                            values,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <Form className='inner'>
                                <h3>EDIT MOVIE</h3>
                                <h5 className='id'>MOVIE ID</h5>
                                <p>
                                    {this.state.movie.id || ''}
                                </p>
                                <h5>TITLE</h5>
                                <Field type='text' name='title' placeholder='title' />
                                <ErrorMessage name='title' component='div' className='error-message' />
                                <h5>RELEASE DATE</h5>
                                <Field type='date' name='release_date' />
                                <ErrorMessage name='release_date' component='div' className='error-message' />
                                <h5>MOVIE URL</h5>
                                <Field type='url' name='poster_path' />
                                <ErrorMessage name='release_date' component='div' className='error-message' />

                                <h5>GENRE</h5>
                                <MultiValueSelector
                                    options={GENRES}
                                    values={values.genres}
                                    onChange={
                                        selectedValues => setFieldValue('genres', selectedValues)
                                    }
                                />
                                <ErrorMessage name='genres' component='div' className='error-message' />
                                <h5>OVERVIEW</h5>
                                <Field type='text' name='overview' />
                                <ErrorMessage name='overview' component='div' className='error-message' />
                                <h5>RUNTIME</h5>
                                <Field type='number' name='runtime' />
                                <ErrorMessage name='runtime' component='div' className='error-message' />
                                <button
                                    type='submit'
                                    className='save'
                                    disabled={isSubmitting}
                                >
                                    SAVE
                                </button>
                                <button
                                    type='reset'
                                    className='reset'
                                    disabled={isSubmitting}
                                >
                                    RESET
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
