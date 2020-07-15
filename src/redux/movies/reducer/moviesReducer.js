import _ from 'lodash';
import {
    PENDING,
    ERROR,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_PAGINATION_SUCCESS,
    ADD_MOVIE_SUCCESS,
    EDIT_MOVIE_SUCCESS,
    DELETE_MOVIE_SUCCESS,
    FETCH_MOVIE_SUCCESS,
} from '../actions/moviesActions';

const initialState = {
    pending: false,
    movies: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                pending: true,
                fetchBy: action.payload ? action.payload : state.fetchBy,
                error: null,
            };

        case ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload.data,
                totalAmount: action.payload.totalAmount,
                pending: false,
                fetchBy: 'search',
                error: null,
            };

        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                movies: [action.payload],
                totalAmount: 1,
                pending: false,
                fetchBy: 'id',
                error: null,
            };

        case FETCH_MOVIES_PAGINATION_SUCCESS:
            return {
                ...state,
                // backend seems buggy, return same movie in different offset
                movies: _.uniqBy([...state.movies, ...(action.payload.data)], 'id'),
                totalAmount: action.payload.totalAmount,
                pending: false,
                error: null,
            };

        case ADD_MOVIE_SUCCESS:
            return {
                ...state,
                // do not put add movie to movie list
                // movies: state.movies.concat(action.payload),
                pending: false,
                error: null,
            };

        case EDIT_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies
                    .map(movie => (movie.id === action.payload.id ? action.payload : movie)),
                pending: false,
                error: null,
            };

        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.filter(
                    item => item.id !== action.payload,
                ),
                totalAmount: state.totalAmount - 1,
                pending: false,
                error: null,
            };
        default:
            return state;
    }
};

export default reducer;
