import * as movieService from '../service/MovieService';

export const FETCH_MOVIE_DETAILS_PENDING = 'FETCH_MOVIE_DETAILS_PENDING';
export const FETCH_MOVIE_DETAILS_ERROR = 'FETCH_MOVIE_DETAILS_ERROR';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';

function pending() {
    return dispatch => dispatch({
        type: FETCH_MOVIE_DETAILS_PENDING,
    });
}

function handleError(error) {
    return dispatch => dispatch({
        type: FETCH_MOVIE_DETAILS_ERROR,
        error,
    });
}

export function fetchMovieDetailsSuccess(data) {
    return dispatch => dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: data,
    });
}

export function fetchMovieDetails(id) {
    return (dispatch, getState) => {
        if (getState().movieDetails.pending) return Promise.reject(new Error('Pending action'));
        dispatch(pending());
        return movieService.readMovieDetails(id)
            .then((res) => {
                dispatch(fetchMovieDetailsSuccess(res.data));
            })
            .catch((error) => {
                dispatch(handleError(error?.response?.data.messages || error));
            });
    };
}
