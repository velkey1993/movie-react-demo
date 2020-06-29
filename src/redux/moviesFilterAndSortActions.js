export const filterMoviesByGenre = genre => dispatch => dispatch({
    type: 'FILTER_MOVIES_BY_GENRE',
    payload: genre,
});

export const sortMoviesByType = type => dispatch => dispatch({
    type: 'SORT_MOVIES_BY_TYPE',
    payload: type,
});
