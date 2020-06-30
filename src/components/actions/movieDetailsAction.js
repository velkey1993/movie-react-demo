export const SHOW_MOVIE_DETAILS = 'SHOW_MOVIE_DETAILS';
export const CLOSE_MOVIE_DETAILS = 'CLOSE_MOVIE_DETAILS';

export const showMovieDetails = movieId => ({
    type: SHOW_MOVIE_DETAILS,
    movieId,
});

export const closeMovieDetails = () => ({
    type: CLOSE_MOVIE_DETAILS,
});
