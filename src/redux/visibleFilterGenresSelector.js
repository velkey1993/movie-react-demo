import { createSelector } from 'reselect';

const getMovies = state => state.movies.movies;

const makeGetVisibleGenreFilters = () => createSelector(
    [getMovies],
    movies => [...new Set(movies.flatMap(movie => movie.genres))],
);

export default makeGetVisibleGenreFilters;
