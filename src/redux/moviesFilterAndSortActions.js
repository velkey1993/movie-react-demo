export const FILTER_MOVIES_BY_GENRE = 'FILTER_MOVIES_BY_GENRE';
export const SORT_MOVIES_BY_TYPE = 'SORT_MOVIES_BY_TYPE';

export const filterMoviesByGenre = genre => dispatch => dispatch({
    type: 'FILTER_MOVIES_BY_GENRE',
    payload: genre,
});

export const sortMoviesByType = type => dispatch => dispatch({
    type: 'SORT_MOVIES_BY_TYPE',
    payload: type,
});
