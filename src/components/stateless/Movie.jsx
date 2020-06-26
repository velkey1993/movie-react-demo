import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import EditOrDelete from '../stateful/EditOrDelete';

const Movie = ({
    movie, deleteMovie, updateMovie, showMovieDetails,
}) => (
    <div className='movie col-xl-1 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
        <div className='image-wrapper'>
            <img
                src={movie.poster_path}
                alt={movie.title}
                onClick={() => showMovieDetails(movie.id)}
            />
            <EditOrDelete
                movie={movie}
                deleteMovie={deleteMovie}
                updateMovie={updateMovie}
            />
        </div>
        <div className='movie-data'>
            <h4 className='title'>{movie.title}</h4>
            <h5 className='genre'>{movie.genres.join(', ')}</h5>
            <h5 className='year'>{new Date(movie.release_date).toISOString().slice(0, 4)}</h5>
        </div>
    </div>
);

Movie.propTypes = {
    movie: PropTypes.object,
    deleteMovie: PropTypes.func,
    updateMovie: PropTypes.func,
    showMovieDetails: PropTypes.func,
};

export default Movie;
