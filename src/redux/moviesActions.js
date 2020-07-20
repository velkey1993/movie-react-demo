import * as movieService from '../service/MovieService';

export const PENDING = 'PENDING';
export const ERROR = 'ERROR';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIES_PAGINATION_SUCCESS = 'FETCH_MOVIES_PAGINATION_SUCCESS';
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
export const EDIT_MOVIE_SUCCESS = 'EDIT_MOVIE_SUCCESS';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';

export const FETCH_BY_SEARCH = 'FETCH_BY_SEARCH';
export const FETCH_BY_ID = 'FETCH_BY_ID';

function pending(fetchType) {
    return dispatch => dispatch({
        type: PENDING,
        payload: fetchType,
    });
}

function handleError(error) {
    return dispatch => dispatch({
        type: ERROR,
        error,
    });
}

function fetchMoviesSuccess(data) {
    return dispatch => dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: data,
    });
}

function fetchMovieSuccess(data) {
    return dispatch => dispatch({
        type: FETCH_MOVIE_SUCCESS,
        payload: data,
    });
}

function fetchMoviesPaginationSuccess(data) {
    return dispatch => dispatch({
        type: FETCH_MOVIES_PAGINATION_SUCCESS,
        payload: data,
    });
}

export function fetchMovies(sortBy, filter, search) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(FETCH_BY_SEARCH));
        return movieService.searchMovies(sortBy, filter, search)
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

export function fetchMovie(id) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(FETCH_BY_ID));
        return movieService.read(id)
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

export function fetchMoviesPagination(sortBy, filter, search, offset) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending(FETCH_BY_SEARCH));
        return movieService.searchMovies(sortBy, filter, search, offset)
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

export function fetchMoviesIfNeed() {
    return (dispatch, getState) => {
        const { movies } = getState();
        if (movies || movies === []) {
            return dispatch(fetchMovies());
        } else {
            return Promise.resolve();
        }
    };
}

function addMovieSuccess(data) {
    return dispatch => dispatch({
        type: ADD_MOVIE_SUCCESS,
        payload: data,
    });
}

export function addMovie(data) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return movieService.create(data)
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

function editMovieSuccess(data) {
    return dispatch => dispatch({
        type: EDIT_MOVIE_SUCCESS,
        payload: data,
    });
}

export function editMovie(data) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return movieService.update(data)
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
    return dispatch => dispatch({
        type: DELETE_MOVIE_SUCCESS,
        payload: movieId,
    });
}

export function deleteMovie(id) {
    return (dispatch, getState) => {
        if (getState().movies.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return movieService.remove(id)
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
