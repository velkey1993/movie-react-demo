import React, { useEffect, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../../redux/moviesFilterAndSortActions';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import AppContext from './AppContext';
import { fetchMovieDetails } from '../../redux/movieDetailsActions';

const GENRES = [
    { name: 'ALL', value: ['All'] },
    { name: 'DOCUMENTARY', value: ['Documentary'] },
    { name: 'COMEDY', value: ['Animated Comedy'] },
    { name: 'HORROR', value: ['Horror'] },
    { name: 'CRIME', value: ['Crime'] },
    { name: 'OTHER', value: ['Spaghetti Western'] },
];

function App({ match: { params } }) {
    const dispatch = useDispatch();
    const error = useSelector(state => state.movies.error);
    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    useEffect(() => {
        if (params.query) {
            dispatch(searchMovies(params.query))
                .catch(e => alert(e));
        } else if (params.id) {
            dispatch(fetchMovieDetails(params.id))
                .catch(e => alert(e));
        }
    }, [dispatch, params]);

    useEffect(() => {
        error && alert(error);
    }, [error]);

    return (
        <>
            <div id='container' className='container'>
                <AppContext.Provider value={genresContext}>
                    <ErrorBoundary>
                        <TopComponent />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <ResultContainer />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
