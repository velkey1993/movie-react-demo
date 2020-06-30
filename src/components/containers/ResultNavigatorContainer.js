import { connect } from 'react-redux';
import { setSortType } from '../actions/sortAction';
import ResultNavigator from '../stateless/ResultNavigator';
import { setFilterType } from '../actions/filterAction';

const mapStateToProps = state => ({
    filterType: state.filterType,
});

const mapDispatchToProps = dispatch => ({
    filterMovies: filterType => dispatch(setFilterType(filterType)),
    sortMovies: event => dispatch(setSortType(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultNavigator);
