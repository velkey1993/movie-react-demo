import { connect } from 'react-redux';
import { showMovieDetails } from '../actions/movieDetailsAction';
import Movie from '../stateless/Movie';

const mapDispatchToProps = dispatch => ({
    showMovieDetails: movieId => dispatch(showMovieDetails(movieId)),
});

export default connect(null, mapDispatchToProps)(Movie);
