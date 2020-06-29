import axios from 'axios';

function pending() {
    return dispatch => dispatch({
        type: 'PENDING',
    });
}

function handleError(error) {
    return dispatch => dispatch({
        type: 'ERROR',
        error,
    });
}

function fetchMoviesSuccess(data) {
    return dispatch => dispatch({
        type: 'FETCH_MOVIES_SUCCESS',
        payload: data,
    });
}

export function fetchMovies() {
    return (dispatch) => {
        dispatch(pending());
        axios
            .get('http://localhost:4000/movies')
            .then((res) => {
                dispatch(fetchMoviesSuccess(res.data.data));
            })
            .catch((error) => {
                dispatch(handleError(error?.response?.data.messages || error));
            });
    };
}

export function fetchMoviesIfNeed() {
    return (dispatch, getState) => {
        const { movies } = getState();
        if (movies || movies === []) {
            dispatch(fetchMovies());
        }
    };
}

function addMovieSuccess(data) {
    return dispatch => dispatch({
        type: 'ADD_MOVIE_SUCCESS',
        payload: data,
    });
}
export function addMovie(data) {
    return (dispatch) => {
        dispatch(pending());
        axios
            .post('http://localhost:4000/movies', data)
            .then((res) => {
                dispatch(addMovieSuccess(res.data));
            })
            .catch((error) => {
                dispatch(handleError(error?.response?.data.messages || error));
            });
    };
}

function editMovieSuccess(data) {
    return dispatch => dispatch({
        type: 'EDIT_MOVIE_SUCCESS',
        payload: data,
    });
}

export function editMovie(data) {
    return (dispatch) => {
        dispatch(pending());
        axios
            .put('http://localhost:4000/movies', data)
            .then((res) => {
                dispatch(editMovieSuccess(res.data));
            })
            .catch((error) => {
                dispatch(handleError(error?.response?.data.messages || error));
            });
    };
}

export function deleteMovieSuccess(movieId) {
    return dispatch => dispatch({
        type: 'DELETE_MOVIE_SUCCESS',
        payload: movieId,
    });
}

export function deleteMovie(id) {
    return (dispatch) => {
        dispatch(pending());
        axios
            .delete(`http://localhost:4000/movies/${id}`)
            .then(() => {
                dispatch(deleteMovieSuccess(id));
            })
            .catch((error) => {
                dispatch(handleError(error?.response?.data.messages || error));
            });
    };
}
