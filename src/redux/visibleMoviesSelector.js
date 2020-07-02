import { createSelector } from 'reselect';
import _ from 'lodash';

const sortAndFilterMovieList = (movieList, genreFilter = 'ALL', sortType) => _.sortBy(
    movieList.filter(movie => !genreFilter
        || genreFilter.toUpperCase() === 'ALL'
        || movie.genres.map(genre => genre.toUpperCase())
            .includes(genreFilter.toUpperCase())),

    (movie) => {
        if (sortType === 'genres') {
            return movie[sortType][0];
        }
        return movie[sortType];
    },
    movie => movie.title,
);

const getMovies = state => state.movies.movies;
const getSortType = state => state.filterAndSort.sortType;
const getGenreFilter = state => state.filterAndSort.genreFilter;

const makeGetVisibleMovies = () => createSelector(
    [getMovies, getGenreFilter, getSortType],
    sortAndFilterMovieList,
);

export default makeGetVisibleMovies;
