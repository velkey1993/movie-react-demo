import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import Result from './Result';
import ErrorBoundary from './ErrorBoundary';
import * as mockMovieService from '../../service/MockMovieService';
import useStateWithLocaleStorage from '../../utils/useStateWithLocaleStorage';
import TopComponent from '../stateless/TopComponent';
import AppContext from './AppContext';

const GENRES = [
    { name: 'ALL', value: ['All'] },
    { name: 'DOCUMENTARY', value: ['Documentary'] },
    { name: 'COMEDY', value: ['Animated Comedy'] },
    { name: 'HORROR', value: ['Horror'] },
    { name: 'CRIME', value: ['Crime'] },
    { name: 'OTHER', value: ['Spaghetti Western'] },
];

function App() {
    const [movies, setMovies] = useStateWithLocaleStorage('movies', () => mockMovieService.read());
    const [movieId, setMovieId] = useState();

    const updateMovieCallback = useCallback(
        (movie) => {
            const updatedMovie = mockMovieService.update(movie);
            setMovies(items => items
                .map(item => (item.id === updatedMovie.id ? updatedMovie : item)));
        },
        [setMovies],
    );

    const deleteMovieCallback = useCallback(
        (id) => {
            const removedId = mockMovieService.remove(id);
            setMovies(items => items.filter(item => item.id !== removedId));
        },
        [setMovies],
    );

    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    return (
        <>
            <div id='container' className='container'>
                <AppContext.Provider value={genresContext}>
                    <ErrorBoundary>
                        <TopComponent
                            movie={movies.find(movie => movie.id === movieId)}
                            closeDetails={() => setMovieId(undefined)}
                            addMovie={(movie) => {
                                const createdMovie = mockMovieService.create(movie);
                                setMovies(items => [...items, createdMovie]);
                            }}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Result
                            movies={movies}
                            updateMovie={updateMovieCallback}
                            deleteMovie={deleteMovieCallback}
                            showMovieDetails={setMovieId}
                        />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
