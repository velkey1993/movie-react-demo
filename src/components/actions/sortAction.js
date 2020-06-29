export const SET_SORT_TYPE = 'SET_SORT_TYPE';

export const setSortType = sortType => ({
    type: SET_SORT_TYPE,
    sortType
});

export const SortTypes = {
    TITLE: {name: 'TITLE', value: 'title'},
    RELEASE_DATE: {name: 'RELEASE_DATE', value: 'release_date'},
    GENRES: {name: 'GENRES', value: 'genres'}
};

export const SortTypeList = [
    SortTypes.TITLE,
    SortTypes.RELEASE_DATE,
    SortTypes.GENRES
]
