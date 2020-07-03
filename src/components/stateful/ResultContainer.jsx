import { connect } from 'react-redux';
import { filterMoviesByGenre, sortMoviesByType, fetchNextPagination } from '../../redux/moviesFilterAndSortActions';
import makeGetVisibleGenreFilters from '../../redux/visibleFilterGenresSelector';
import Result from './Result';

const makeMapStateToProps = () => {
    const getVisibleGenreFilters = makeGetVisibleGenreFilters();
    const mapStateToProps = (state, props) => ({
        selectedGenreFilter: state.filterAndSort.genreFilter,
        selectedSortType: state.filterAndSort.sortType,
        movies: state.movies.movies,
        totalAmount: state.movies.totalAmount,
        genreFilters: getVisibleGenreFilters(state, props),
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    onGenreFilterChange: filterMoviesByGenre,
    onSortTypeChange: sortMoviesByType,
    fetchNextPagination,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps,
)(Result);
