import { connect } from 'react-redux';
import { filterMoviesByGenre, sortMoviesByType, fetchNextPagination } from '../../redux/filterAndSort/actions/moviesFilterAndSortActions';
import Result from './Result';

const makeMapStateToProps = () => {
    const mapStateToProps = state => ({
        selectedGenreFilter: state.filterAndSort.genreFilter,
        selectedSortType: state.filterAndSort.sortType,
        movies: state.movies.movies,
        fetchBy: state.movies.fetchBy,
        totalAmount: state.movies.totalAmount,
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
