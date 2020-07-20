
import { fetchMovies, fetchMoviesPagination, FETCH_BY_ID } from './moviesActions';
import customHistory from './history';
import { HOME, SEARCH, FILM } from '../roots';

export const FILTER_MOVIES = 'FILTER_MOVIES';
export const FILTER_MOVIES_BY_GENRE = 'FILTER_MOVIES_BY_GENRE';
export const SORT_MOVIES_BY_TYPE = 'SORT_MOVIES_BY_TYPE';
export const FILTER_MOVIES_BY_SEARCH = 'FILTER_MOVIES_BY_SEARCH';
export const PUSH = 'PUSH';
export const CLOSE_DETAILS = 'CLOSE_DETAILS';

export const push = path => (dispatch) => {
    customHistory.push(path);
    return dispatch({
        type: PUSH,
        payload: path,
    });
};

export const closeMovieDetails = () => (dispatch, getState) => {
    const searchText = getState().filterAndSort.search;
    const { sortType } = getState().filterAndSort;
    const { genreFilter } = getState().filterAndSort;

    const { fetchBy } = getState().movies;

    if (fetchBy === FETCH_BY_ID) {
        dispatch(push(HOME));
    } else {
        dispatch(push(`${SEARCH}?search=${searchText}&filter=${genreFilter.join(',')}&sort=${sortType}`));
    }
};

export const filterMovies = ({
    type, genre, search,
}) => (dispatch, getState) => {
    // use state if param is not provided
    const searchText = search || getState().filterAndSort.search;
    const sortType = type || getState().filterAndSort.sortType;
    const genreFilter = genre || getState().filterAndSort.genreFilter;

    const { path } = getState().filterAndSort;

    // handle: "On switching search type or sorting type you shouldn’t switch any routes."
    if (path && !path.startsWith(FILM)) {
        dispatch(push(`${SEARCH}?search=${searchText}&filter=${genreFilter.join(',')}&sort=${sortType}`));
    }

    return dispatch(fetchMovies(sortType, genreFilter, searchText))
        .then(() => dispatch({
            type: FILTER_MOVIES,
            payload: { genre, type, search },
        }));
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
