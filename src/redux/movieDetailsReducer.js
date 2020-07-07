import {
    FETCH_MOVIE_DETAILS_ERROR,
    FETCH_MOVIE_DETAILS_PENDING,
    FETCH_MOVIE_DETAILS_SUCCESS,
} from './movieDetailsActions';

const initialState = {
    pending: false,
    movieDetails: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIE_DETAILS_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_MOVIE_DETAILS_ERROR:
            return {
                movieDetails: null,
                pending: false,
                error: action.error,
            };

        case FETCH_MOVIE_DETAILS_SUCCESS:
            return {
                ...state,
                movieDetails: action.payload,
                pending: false,
                error: null,
            };

        default:
            return state;
    }
};

export default reducer;
