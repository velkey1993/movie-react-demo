import { fetchMovies, fetchMoviesPagination } from './moviesActions';

export const FILTER_MOVIES_BY_GENRE = 'FILTER_MOVIES_BY_GENRE';
export const SORT_MOVIES_BY_TYPE = 'SORT_MOVIES_BY_TYPE';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const FETCHED_PAGINATION_MOVIES = 'FETCHED_PAGINATION_MOVIES';

export const filterMoviesByGenre = genre => (dispatch, getState) => dispatch(
    fetchMovies(
        getState().filterAndSort.sortType,
        genre,
        getState().filterAndSort.search,
    ),
)
    .then(() => dispatch({
        type: FILTER_MOVIES_BY_GENRE,
        payload: genre,
    }));

export const sortMoviesByType = type => (dispatch, getState) => dispatch(
    fetchMovies(
        type,
        getState().filterAndSort.genreFilter,
        getState().filterAndSort.search,
    ),
)
    .then(() => dispatch({
        type: SORT_MOVIES_BY_TYPE,
        payload: type,
    }));

export const searchMovies = search => (dispatch, getState) => dispatch(
    fetchMovies(
        getState().filterAndSort.sortType,
        getState().filterAndSort.genreFilter,
        search,
    ),
)
    .then(() => dispatch({
        type: SEARCH_MOVIES,
        payload: search,
    }));

export const fetchNextPagination = () => (dispatch, getState) => dispatch(
    fetchMoviesPagination(
        getState().filterAndSort.sortType,
        getState().filterAndSort.genreFilter,
        getState().filterAndSort.search,
        getState().movies.movies.length,
    ),
);
