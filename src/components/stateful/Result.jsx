import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import Movie from '../stateless/Movie';
import ErrorBoundary from './ErrorBoundary';
import HorizontalScrollableSelectMenu from '../HorizontalScrollableSelectMenu';

const SORT_TYPES = [
    { name: 'TITLE', value: 'title' },
    { name: 'RELEASE DATE', value: 'release_date' },
    { name: 'GENRES', value: 'genres' },
];

const Result = ({
    selectedSortType,
    onSortTypeChange,
    selectedGenreFilter,
    genreFilters,
    onGenreFilterChange,
    movies,
    showMovieDetails,
}) => (
    <div id='result-container' className='jumbotron'>
        <div className='row'>
            <HorizontalScrollableSelectMenu
                id='result-container-movie-types'
                className='col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-9'
                values={['All', ...(genreFilters)]}
                selected={selectedGenreFilter || 'All'}
                onSelectionChange={e => onGenreFilterChange(e.target.innerText)}
            />
            <div id='result-container-movie-sort-by-types' className='col-xl-1 col-lg-3 col-md-4 col-sm-4 col-xs-3'>
                <div className='wrapper'>
                    <span className='hidden-xs'>SORT BY</span>
                    <select
                        onChange={e => onSortTypeChange(e.target.value)}
                        value={selectedSortType}
                    >
                        {SORT_TYPES.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div id='result-container-movie-count'>
            <p>
                <b>{`${movies.length} movies found`}</b>
            </p>
        </div>
        <div id='result-container-movie-list' className='row'>
            {movies.map(movie => (
                <ErrorBoundary key={movie.id}>
                    <Movie
                        movie={movie}
                        showMovieDetails={showMovieDetails}
                    />
                </ErrorBoundary>
            ))}
        </div>
        <div id='result-container-movie-page-name'>
            <b>epam</b>
            roulette
        </div>
    </div>
);

Result.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    })).isRequired,
    showMovieDetails: PropTypes.func.isRequired,
};

export default Result;
