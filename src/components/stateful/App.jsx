import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import AppContext from './AppContext';
import Result from './Result';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import { fetchMoviesIfNeed } from '../../redux/moviesActions';

const GENRES = [
    { name: 'ALL', value: ['All'] },
    { name: 'DOCUMENTARY', value: ['Documentary'] },
    { name: 'COMEDY', value: ['Animated Comedy'] },
    { name: 'HORROR', value: ['Horror'] },
    { name: 'CRIME', value: ['Crime'] },
    { name: 'OTHER', value: ['Spaghetti Western'] },
];

function App() {
    const movies = useSelector(state => state.movies.movies);
    const error = useSelector(state => state.movies.error);
    const dispatch = useDispatch();
    const [movieId, setMovieId] = useState();

    useEffect(() => {
        dispatch(fetchMoviesIfNeed());
    }, [dispatch]);

    useEffect(() => {
        error && alert(error);
    }, [error]);

    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    return (
        <>
            <div id='container' className='container'>
                <AppContext.Provider value={genresContext}>
                    <ErrorBoundary>
                        <TopComponent
                            movie={movies.find(movie => movie.id === movieId)}
                            closeDetails={() => setMovieId(undefined)}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Result
                            showMovieDetails={setMovieId}
                        />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
