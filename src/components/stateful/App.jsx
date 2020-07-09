import React, {
    useMemo,
} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import AppContext from './AppContext';
import { fetchMovie } from '../../redux/moviesActions';
import { filterMovies } from '../../redux/moviesFilterAndSortActions';
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
    if (params.id && !movies.find(movie => movie.id === parseInt(params.id, 10))) {
        dispatch(fetchMovie(params.id))
            .catch(error => addToast(error.message, { appearance: 'error', autoDismiss: true }));
    } else if (params.search) {
        dispatch(filterMovies({
            sort: params.sortBy,
            filter: [params.filter].flatMap(x => x),
            search: params.search,
        }))
            .catch(error => addToast(error.message, { appearance: 'error', autoDismiss: true }));
    }
};

function App({ match: { params }, location }) {
    const genresContext = useMemo(() => ({ genres: GENRES }), []);

    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const { pending } = useSelector(state => state.movies);

    // set fetch type and state to pending before the render
    useEffectImmediate(
        () => fetch({ ...params, ...qs.parse(location.search) }, dispatch, movies, addToast), [],
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
