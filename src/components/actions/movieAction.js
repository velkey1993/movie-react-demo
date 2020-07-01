import * as MovieService from '../../service/MovieService';

export const ADD_MOVIE = 'ADD_MOVIE';
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE';

export const EDIT_MOVIE = 'EDIT_MOVIE';
export const EDIT_MOVIE_SUCCESS = 'EDIT_MOVIE_SUCCESS';
export const EDIT_MOVIE_FAILURE = 'EDIT_MOVIE_FAILURE';

export const DELETE_MOVIE = 'DELETE_MOVIE';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';
export const DELETE_MOVIE_FAILURE = 'DELETE_MOVIE_FAILURE';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

function movieServiceCall(prepareCall, callService, handleResponse, handleError) {
    return (dispatch) => {
        dispatch(prepareCall());
        return callService()
            .then(response => dispatch(handleResponse(response)))
            .catch(error => dispatch(handleError(error)));
    };
}

const prepareCall = type => () => ({ type });

const call = (callback, arg) => () => callback(arg);

const handleResponse = type => responseHandler => response => ({
    type,
    payload: responseHandler(response),
});

const handleError = type => error => ({
    type,
    error,
});

export function fetchMoviesAsync() {
    return movieServiceCall(
        prepareCall(FETCH_MOVIES),
        call(MovieService.read),
        handleResponse(FETCH_MOVIES_SUCCESS)(response => response.data.data),
        handleError(FETCH_MOVIES_FAILURE),
    );
}

export function addMovieAsync(movie) {
    return movieServiceCall(
        prepareCall(ADD_MOVIE),
        call(MovieService.create, movie),
        handleResponse(ADD_MOVIE_SUCCESS)(response => response.data),
        handleError(ADD_MOVIE_FAILURE),
    );
}

export function editMovieAsync(movie) {
    return movieServiceCall(
        prepareCall(EDIT_MOVIE),
        call(MovieService.update, movie),
        handleResponse(EDIT_MOVIE_SUCCESS)(response => response.data),
        handleError(EDIT_MOVIE_FAILURE),
    );
}

export function deleteMovieAsync(movieId) {
    return movieServiceCall(
        prepareCall(DELETE_MOVIE),
        call(MovieService.remove, movieId),
        // eslint-disable-next-line no-unused-vars
        handleResponse(DELETE_MOVIE_SUCCESS)(response => movieId),
        handleError(DELETE_MOVIE_FAILURE),
    );
}
