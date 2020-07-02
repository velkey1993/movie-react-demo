import React, { useMemo } from 'react';
import ErrorBoundary from '../stateful/ErrorBoundary';
import '../stateful/Result.css';
import MovieContainer from '../containers/MovieContainer';

function ResultContent({
    movies, filterType, sortType, getMovies, loading,
}) {
    const memoizedMovies = useMemo(
        () => getMovies(movies, filterType, sortType, getMovies),
        [movies, filterType, sortType, getMovies],
    );

    return (
        <>
            <div id='result-container-movie-count'>
                {
                    loading
                        ? <p>Loading...</p>
                        : (
                            <p>
                                <b>{memoizedMovies.length}</b>
                                {' '}
                                movies found
                            </p>
                        )
                }
            </div>
            <div id='result-container-movie-list' className='row'>
                {
                    memoizedMovies.map(movie => (
                        <ErrorBoundary key={movie.id}>
                            <MovieContainer movie={movie} />
                        </ErrorBoundary>
                    ))
                }
            </div>
        </>
    );
}

export default ResultContent;
