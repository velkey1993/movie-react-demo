import {
    ADD_MOVIE,
    ADD_MOVIE_FAILURE,
    ADD_MOVIE_SUCCESS,
    DELETE_MOVIE,
    DELETE_MOVIE_FAILURE,
    DELETE_MOVIE_SUCCESS,
    EDIT_MOVIE,
    EDIT_MOVIE_FAILURE,
    EDIT_MOVIE_SUCCESS,
    FETCH_MOVIES,
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_SUCCESS,
} from '../actions/movieAction';

const initialState = {
    loading: false,
    array: [],
    error: null,
};

const prepareState = state => ({
    ...state,
    loading: true,
});

const successState = (state, array) => ({
    ...state,
    loading: false,
    array,
});

const failureState = (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
});

const movies = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MOVIES:
    case ADD_MOVIE:
    case EDIT_MOVIE:
    case DELETE_MOVIE:
        return prepareState(state);

    case FETCH_MOVIES_SUCCESS:
        return successState(state, action.payload);
    case ADD_MOVIE_SUCCESS:
        return successState(state, [...state.array, { ...action.payload }]);
    case EDIT_MOVIE_SUCCESS:
        return successState(state, state.array.map(movie => (
            movie.id === action.payload.id ? { ...movie, ...action.payload } : movie)));
    case DELETE_MOVIE_SUCCESS:
        return successState(state, state.array.filter(movie => movie.id !== action.payload));

    case FETCH_MOVIES_FAILURE:
    case ADD_MOVIE_FAILURE:
    case EDIT_MOVIE_FAILURE:
    case DELETE_MOVIE_FAILURE:
        return failureState(state, action);

    default:
        return state;
    }
};

export default movies;
