import React from 'react';
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
                    <div className='inner'>
                        <h3>EDIT MOVIE</h3>
                        <h5 className='id'>MOVIE ID</h5>
                        <p>
                            {this.state.movie.id || ''}
                            {' '}
                        </p>
                        <h5>TITLE</h5>
                        <input
                            name='title'
                            type='text'
                            onChange={this.handleInputChange}
                            value={this.state.movie.title || ''}
                        />
                        <h5>RELEASE DATE</h5>
                        <input
                            name='release_date'
                            type='date'
                            onChange={this.handleInputChange}
                            value={this.state.movie.release_date}
                        />
                        <h5>MOVIE URL</h5>
                        <input
                            name='poster_path'
                            type='url'
                            onChange={this.handleInputChange}
                            value={this.state.movie.poster_path || ''}
                        />
                        <h5>GENRE</h5>
                        <MultiValueSelector
                            options={GENRES}
                            values={this.state.movie.genres}
                            onChange={values => this.handleMultiValueInputChange(
                                'genres',
                                values,
                            )
                            }
                        />
                        <h5>OVERVIEW</h5>
                        <input
                            name='overview'
                            type='text'
                            onChange={this.handleInputChange}
                            value={this.state.movie.overview || ''}
                        />
                        <h5>RUNTIME</h5>
                        <input
                            name='runtime'
                            type='number'
                            onChange={this.handleInputChange}
                            value={this.state.movie.runtime || ''}
                        />

                        <div>
                            <button
                                type='submit'
                                className='save'
                                onClick={() => {
                                    this.props.updateMovie(this.state.movie)
                                        .then(() => this.props.close())
                                        .then(() => this.props.addToast('Saved Successfully', { appearance: 'success', autoDismiss: true }))
                                        .catch(error => this.props.addToast(error.message, { appearance: 'error', autoDismiss: true }));
                                }}
                            >
                                SAVE
                            </button>
                            <button
                                type='button'
                                className='reset'
                                onClick={() => {
                                    this.setState({ movie: this.props.movie });
                                }}
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
