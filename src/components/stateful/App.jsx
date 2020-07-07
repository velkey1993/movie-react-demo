import React, { useEffect, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { searchMovies } from '../../redux/moviesFilterAndSortActions';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import AppContext from './AppContext';
import { fetchMovie } from '../../redux/moviesActions';
import usePrevious from '../../utils/usePrevious';

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
    const movies = useSelector(state => state.movies.movies);
    const error = useSelector(state => state.movies.error, _.isEqual);
    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    useEffect(() => {
        if (params.query) {
            dispatch(searchMovies(params.query))
                .catch(e => alert(e));
        } else if (params.id && !movies.find(movie => movie.id.toString() === params.id)) {
            dispatch(fetchMovie(params.id))
                .catch(e => alert(e));
        }
    }, [dispatch, params]);

    const prevError = usePrevious(error, error);

    error && prevError !== error && alert(error);

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
