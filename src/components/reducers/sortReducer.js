import { SET_SORT_TYPE, SortTypes } from '../actions/sortAction';

const sortType = (state = SortTypes.TITLE.value, action) => {
    switch (action.type) {
    case SET_SORT_TYPE:
        return action.sortType;
    default:
        return state;
    }
};

export default sortType;
