import {
    FILTER_MOVIES_BY_GENRE,
    SORT_MOVIES_BY_TYPE,
} from './moviesFilterAndSortActions';

const initialState = {
    genreFilter: null,
    sortType: 'title',
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
        default:
            return state;
    }
};

export default reducer;
