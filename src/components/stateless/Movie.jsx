import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import { useHistory } from 'react-router-dom';
import EditOrDelete from '../stateful/EditOrDelete';
import handleKeyDown from '../../utils/handleKeyDown';

const Movie = React.memo(({
    movie,
}) => {
    const history = useHistory();
    const imageRef = useRef();
    const imageWrapperRef = useRef();

    const showMovieDetails = id => history.push(`/film/${id}`);

    return (

        <div className='movie col-xl-1 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <div
                ref={imageWrapperRef}
                tabIndex='0'
                role='button'
                className='image-wrapper'
                onClick={handleKeyDown(() => showMovieDetails(movie.id), null, imageRef)}
                onKeyDown={handleKeyDown(() => showMovieDetails(movie.id), ' ', imageWrapperRef)}
            >
                <img
                    ref={imageRef}
                    src={movie.poster_path}
                    alt={movie.title}
                />
                <EditOrDelete
                    movie={movie}
                />
            </div>
            <div className='movie-data'>
                <h4 className='title'>{movie.title}</h4>
                <h5 className='genre'>{movie.genres.join(', ')}</h5>
                <h5 className='year'>
                    {new Date(movie.release_date).toISOString()
                        .slice(0, 4)}
                </h5>
            </div>
        </div>
    );
});

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
};

export default Movie;
