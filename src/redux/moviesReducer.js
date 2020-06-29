const initialState = {
    pending: false,
    movies: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PENDING':
            return {
                ...state,
                pending: true,
            };

        case 'ERROR':
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        case 'FETCH_MOVIES_SUCCESS':
            return {
                ...state,
                movies: action.payload,
                error: null,
            };

        case 'ADD_MOVIE_SUCCESS':
            return {
                ...state,
                movies: state.movies.concat(action.payload),
                pending: false,
                error: null,
            };

        case 'EDIT_MOVIE_SUCCESS':
            return {
                ...state,
                movies: state.movies
                    .map(movie => (movie.id === action.payload.id ? action.payload : movie)),
                error: null,
            };

        case 'DELETE_MOVIE_SUCCESS':
            return {
                ...state,
                movies: state.movies.filter(
                    item => item.id !== action.payload,
                ),
                error: null,
            };
        default:
            return state;
    }
};

export default reducer;
