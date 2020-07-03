import {
    FILTER_MOVIES_BY_GENRE,
    SORT_MOVIES_BY_TYPE,
    SEARCH_MOVIES,
} from './moviesFilterAndSortActions';

const initialState = {
    genreFilter: [''],
    sortType: 'release_date',
    search: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_MOVIES_BY_GENRE:
            return {
                ...state,
                genreFilter: action.payload,
            };
        case SORT_MOVIES_BY_TYPE:
            return {
                ...state,
                sortType: action.payload,
            };
        case SEARCH_MOVIES:
            return {
                ...state,
                search: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
