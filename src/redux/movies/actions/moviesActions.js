import MovieService from '../../../service/MovieService';

export const PENDING = 'PENDING';
export const ERROR = 'ERROR';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIES_PAGINATION_SUCCESS = 'FETCH_MOVIES_PAGINATION_SUCCESS';
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
export const EDIT_MOVIE_SUCCESS = 'EDIT_MOVIE_SUCCESS';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';

const SEARCH = 'search';
const FETCH_BY_ID = 'id';

export function pending(fetchType) {
    return {
        type: PENDING,
        payload: fetchType,
    };
}

export function handleError(error) {
    return {
        type: ERROR,
        error,
    };
}

export function fetchMoviesSuccess(data) {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: data,
    };
}

export function fetchMovieSuccess(data) {
    return {
        type: FETCH_MOVIE_SUCCESS,
        payload: data,
    };
}

export function fetchMoviesPaginationSuccess(data) {
    return {
        type: FETCH_MOVIES_PAGINATION_SUCCESS,
        payload: data,
    };
}

export function fetchMovies(sortBy, filter, search) {
    return (dispatch, getState) => {
        if (!search) return Promise.reject(new Error('Search text is empty'));
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(SEARCH));
        return MovieService.searchMovies(sortBy, filter, search)
            .then((res) => {
                dispatch(fetchMoviesSuccess(res.data));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}

export function fetchMoviesPagination(sortBy, filter, search, offset) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(SEARCH));
        return MovieService.searchMovies(sortBy, filter, search, offset)
            .then((res) => {
                dispatch(fetchMoviesPaginationSuccess(res.data));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}

export function fetchMovie(id) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(FETCH_BY_ID));
        return MovieService.read(id)
            .then((res) => {
                dispatch(fetchMovieSuccess(res.data));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}

export function addMovieSuccess(data) {
    return {
        type: ADD_MOVIE_SUCCESS,
        payload: data,
    };
}

export function addMovie(data) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return MovieService.create(data)
            .then((res) => {
                dispatch(addMovieSuccess(res.data));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}

export function editMovieSuccess(data) {
    return {
        type: EDIT_MOVIE_SUCCESS,
        payload: data,
    };
}

export function editMovie(data) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return MovieService.update(data)
            .then((res) => {
                dispatch(editMovieSuccess(res.data));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}

export function deleteMovieSuccess(movieId) {
    return {
        type: DELETE_MOVIE_SUCCESS,
        payload: movieId,
    };
}

export function deleteMovie(id) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return MovieService.remove(id)
            .then(() => {
                dispatch(deleteMovieSuccess(id));
            })
            .catch((e) => {
                const error = e?.response?.data.messages
                    ? new Error(e?.response?.data.messages) : e;
                dispatch(handleError(error.message));
                throw error;
            });
    };
}
