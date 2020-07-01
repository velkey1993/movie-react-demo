import { connect } from 'react-redux';
import Result from '../stateful/Result';

const mapStateToProps = state => ({
    movies: state.movies.array,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
