import React, {
    useMemo,
} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import AppContext from './AppContext';
import { fetchMovie } from '../../redux/moviesActions';
import { filterMovies, push } from '../../redux/moviesFilterAndSortActions';
import useEffectImmediate from '../../utils/useEffectImmediate';
import Loading from '../stateless/Loading';
import { SEARCH, HOME } from '../../roots';
import useDefaultToasts from '../../utils/useDefaultToasts';

const GENRES = [
    { name: 'ALL', value: ['All'] },
    { name: 'DOCUMENTARY', value: ['Documentary'] },
    { name: 'COMEDY', value: ['Animated Comedy'] },
    { name: 'HORROR', value: ['Horror'] },
    { name: 'CRIME', value: ['Crime'] },
    { name: 'OTHER', value: ['Spaghetti Western'] },
];

const fetch = (path, params, dispatch, movies, addErrorToast) => {
    if (params.id && !movies.find(movie => movie.id === parseInt(params.id, 10))) {
        dispatch(fetchMovie(params.id))
            .catch(addErrorToast);
    } else if (path === SEARCH) {
        dispatch(filterMovies({
            sort: params.sortBy,
            filter: [params.filter].flatMap(x => x),
            search: params.search,
        }))
            .catch(addErrorToast);
    } else {
        dispatch(push(HOME));
    }
};

function App({ match: { params, path }, location }) {
    const genresContext = useMemo(() => ({ genres: GENRES }), []);
    const { addErrorToast } = useDefaultToasts();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const { pending } = useSelector(state => state.movies);

    // set fetch type and state to pending before the render
    useEffectImmediate(
        () => fetch(path,
            { ...params, ...qs.parse(location.search) },
            dispatch,
            movies,
            addErrorToast), [],
    );

    return (
        <>
            <div id='container' className='container'>
                {pending && <Loading />}
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
