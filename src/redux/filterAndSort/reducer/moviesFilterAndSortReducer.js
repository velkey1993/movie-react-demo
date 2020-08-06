import {
    FILTER_MOVIES, PUSH,
} from '../actions/moviesFilterAndSortActions';

const initialState = {
    genreFilter: [''],
    sortType: 'release_date',
    search: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_MOVIES:
            return {
                ...state,
                genreFilter: action.payload.genre || state.genreFilter,
                sortType: action.payload.type || state.sortType,
                search: action.payload.search || state.search,
            };
        case PUSH:
            return {
                ...state,
                path: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
