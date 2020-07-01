import { connect } from 'react-redux';
import { deleteMovieAsync, editMovieAsync } from '../actions/movieAction';
import EditOrDelete from '../stateful/EditOrDelete';

const mapDispatchToProps = dispatch => ({
    updateMovie: movie => dispatch(editMovieAsync(movie)),
    deleteMovie: movieId => dispatch(deleteMovieAsync(movieId)),
});

export default connect(null, mapDispatchToProps)(EditOrDelete);
