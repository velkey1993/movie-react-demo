import { createSelector } from 'reselect';

const GENRES = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Drama',
    'Family',
    'Horror',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'War',
];

const getMovies = state => state.movies.movies;

const makeGetVisibleGenreFilters = () => createSelector(
    [getMovies],
    movies => [...new Set([...GENRES, ...(movies.flatMap(movie => movie.genres))])],
);

export default makeGetVisibleGenreFilters;
