import { connect } from 'react-redux';
import _ from 'lodash';
import { SortTypes } from '../actions/sortAction';
import ResultContent from '../stateless/ResultContent';

const getFilteredMovies = (movies, filterType) => {
    const subFilterTypeList = filterType.value;
    return _.isEmpty(subFilterTypeList)
        ? movies
        : _.filter(movies,
            movie => _.some(subFilterTypeList,
                subFilterType => _.includes(movie.genres, subFilterType)));
};

const getSortedMovies = (movies, sortType) => _.sortBy(
    movies,
    movie => (sortType === SortTypes.GENRES ? movie[sortType][0] : movie[sortType]),
    movie => movie.title,
);

const getMovies = (movies, filterType, sortType) => {
    const filteredMovies = getFilteredMovies(movies, filterType);
    return getSortedMovies(filteredMovies, sortType);
};

const mapStateToProps = state => ({
    movies: getMovies(state.movies, state.filterType, state.sortType),
});

export default connect(mapStateToProps, null)(ResultContent);
