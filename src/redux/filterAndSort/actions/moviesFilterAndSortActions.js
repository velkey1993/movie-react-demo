
import { fetchMovies, fetchMoviesPagination } from '../../movies/actions/moviesActions';
import customHistory from '../../history';

export const FILTER_MOVIES = 'FILTER_MOVIES';
export const FILTER_MOVIES_BY_GENRE = 'FILTER_MOVIES_BY_GENRE';
export const SORT_MOVIES_BY_TYPE = 'SORT_MOVIES_BY_TYPE';
export const FILTER_MOVIES_BY_SEARCH = 'FILTER_MOVIES_BY_SEARCH';
export const PUSH = 'PUSH';

export const push = path => (dispatch) => {
    customHistory.push(path);
    return dispatch({
        type: PUSH,
        payload: path,
    });
};

export const filterMovies = ({
    type, genre, search, skipFetch, forcePushToHistory: forcePush,
}) => (dispatch, getState) => {
    // use state is param is not provided
    const searchText = search || getState().filterAndSort.search;
    const sortType = type || getState().filterAndSort.sortType;
    const genreFilter = genre || getState().filterAndSort.genreFilter;

    const { path } = getState().filterAndSort;

    // handle: "On switching search type or sorting type you shouldn’t switch any routes."
    if ((path && (path.startsWith('/search'))) || path === '' || path === '/' || !path || forcePush) {
        searchText && dispatch(push(`/search?search=${searchText}&filter=${genreFilter.join(',')}&sort=${sortType}`));
        !searchText && dispatch(push('/'));
    }

    // force skip fetch e.g. when closing movie details
    if (searchText && !skipFetch) {
        return dispatch(
            fetchMovies(
                sortType,
                genreFilter,
                searchText,
            ),
        )
            .then(() => dispatch({
                type: FILTER_MOVIES,
                payload: { genre, type, search },
            }));
    } else {
        return Promise.resolve();
    }
};

export const filterMoviesByGenre = genre => filterMovies({ genre });

export const sortMoviesByType = type => filterMovies({ type });

export const filterMoviesBySearch = search => filterMovies({ search });

export const fetchNextPagination = () => (dispatch, getState) => dispatch(
    fetchMoviesPagination(
        getState().filterAndSort.sortType,
        getState().filterAndSort.genreFilter,
        getState().filterAndSort.search,
        getState().movies.movies.length,
    ),
);
