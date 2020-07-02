import { connect } from 'react-redux';
import { filterMoviesByGenre, sortMoviesByType } from '../../redux/moviesFilterAndSortActions';
import makeGetVisibleMovies from '../../redux/visibleMoviesSelector';
import makeGetVisibleGenreFilters from '../../redux/visibleFilterGenresSelector';
import Result from './Result';

const makeMapStateToProps = () => {
    const getVisibleMovies = makeGetVisibleMovies();
    const getVisibleGenreFilters = makeGetVisibleGenreFilters();
    const mapStateToProps = (state, props) => ({
        selectedGenreFilter: state.filterAndSort.genreFilter,
        selectedSortType: state.filterAndSort.sortType,
        movies: getVisibleMovies(state, props),
        genreFilters: getVisibleGenreFilters(state, props),
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    onGenreFilterChange: filterMoviesByGenre,
    onSortTypeChange: sortMoviesByType,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps,
)(Result);
