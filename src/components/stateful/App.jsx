import React, {
    useMemo,
} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { searchMovies } from '../../redux/moviesFilterAndSortActions';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import AppContext from './AppContext';
import { fetchMovie } from '../../redux/moviesActions';
import useEffectImmediate from '../../utils/useEffectImmediate';
import Loading from '../stateless/Loading';

const GENRES = [
    { name: 'ALL', value: ['All'] },
    { name: 'DOCUMENTARY', value: ['Documentary'] },
    { name: 'COMEDY', value: ['Animated Comedy'] },
    { name: 'HORROR', value: ['Horror'] },
    { name: 'CRIME', value: ['Crime'] },
    { name: 'OTHER', value: ['Spaghetti Western'] },
];

const fetch = (params, dispatch, movies, addToast) => {
    if (params.query) {
        dispatch(searchMovies(params.query))
            .catch(error => addToast(error.message, { appearance: 'error', autoDismiss: true }));
    } else if (params.id && !movies.find(movie => movie.id.toString() === params.id)) {
        dispatch(fetchMovie(params.id))
            .catch(error => addToast(error.message, { appearance: 'error', autoDismiss: true }));
    }
};

function App({ match: { params } }) {
    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const { pending } = useSelector(state => state.movies);

    useEffectImmediate(
        () => fetch(params, dispatch, movies, addToast), [params, dispatch],
    );

    return (
        <>
            <div id='container' className='container'>
                {pending && <Loading msg='Loading...' />}
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
