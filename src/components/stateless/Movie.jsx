import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import { Link } from 'react-router-dom';
import EditOrDelete from '../stateful/EditOrDelete';

const Movie = React.memo(({
    movie,
}) => {
    const imageRef = useRef();
    const imageWrapperRef = useRef();

    return (

        <div className='movie col-xl-1 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <Link to={() => `/film/${movie.id}`}>
                <div
                    ref={imageWrapperRef}
                    tabIndex='0'
                    role='button'
                    className='image-wrapper'
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
            </Link>
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
