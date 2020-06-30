import { Genres, SET_FILTER_TYPE } from '../actions/filterAction';

const filterType = (state = Genres.ALL, action) => {
    switch (action.type) {
    case SET_FILTER_TYPE:
        return action.filterType;
    default:
        return state;
    }
};

export default filterType;
