import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import ErrorBoundary from './ErrorBoundary';
import TopComponent from '../stateless/TopComponent';
import ResultContainer from './ResultContainer';
import { fetchMovie } from '../../redux/movies/actions/moviesActions';
import { filterMovies } from '../../redux/filterAndSort/actions/moviesFilterAndSortActions';
import useEffectImmediate from '../../utils/useEffectImmediate';
import Loading from '../stateless/Loading';
import withToastProvider from '../../utils/withToastProvider';
import withStoreProvider from '../../utils/withStoreProvider';
import withAppContextProvider from '../../utils/withAppContextProvider';

const fetch = (params, dispatch, movies, addToast) => {
    if (params.id && !movies.find(movie => movie.id === parseInt(params.id, 10))) {
        dispatch(fetchMovie(params.id))
            .catch(error => addToast(error.message, {
                appearance: 'error',
                autoDismiss: true,
            }));
    } else if (params.search) {
        dispatch(filterMovies({
            sort: params.sortBy,
            filter: [params.filter].flatMap(x => x),
            search: params.search,
        }))
            .catch(error => addToast(error.message, {
                appearance: 'error',
                autoDismiss: true,
            }));
    }
};

const App = withStoreProvider(
    withToastProvider(
        withAppContextProvider(({ match: { params }, location }) => {
            const { addToast } = useToasts();
            const dispatch = useDispatch();
            const movies = useSelector(state => state.movies.movies);
            const { pending } = useSelector(state => state.movies);

            // set fetch type and state to pending before the render
            useEffectImmediate(
                () => fetch(
                    { ...params, ...qs.parse(location.search) },
                    dispatch,
                    movies,
                    addToast,
                ),
                [],
            );

            return (
                <div id='container' className='container'>
                    {pending && <Loading msg='Loading...' />}
                    <ErrorBoundary>
                        <TopComponent />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <ResultContainer />
                    </ErrorBoundary>
                </div>
            );
        }),
    ),
);

export default App;
