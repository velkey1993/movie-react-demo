export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

export const setFilterType = filterType => ({
    type: SET_FILTER_TYPE,
    filterType,
});

export const Genres = {
    ALL: {
        name: 'ALL',
        value: [],
    },
    DOCUMENTARY: {
        name: 'DOCUMENTARY',
        value: ['Documentary'],
    },
    COMEDY: {
        name: 'COMEDY',
        value: ['Comedy', 'Fantasy', 'Adventure', 'Animation'],
    },
    HORROR: {
        name: 'HORROR',
        value: ['Horror'],
    },
    CRIME: {
        name: 'CRIME',
        value: ['Crime', 'Action'],
    },
    OTHER: {
        name: 'OTHER',
        value: ['Spaghetti Western', 'Family', 'Science Fiction'],
    },
};

export const GenresList = [
    Genres.ALL,
    Genres.DOCUMENTARY,
    Genres.COMEDY,
    Genres.HORROR,
    Genres.CRIME,
    Genres.OTHER,
];
