import { connect } from 'react-redux';
import { deleteMovie, editMovie } from '../actions/movieAction';
import EditOrDelete from '../stateful/EditOrDelete';

const mapDispatchToProps = dispatch => ({
    updateMovie: movie => dispatch(editMovie(movie)),
    deleteMovie: movieId => dispatch(deleteMovie(movieId)),
});

export default connect(null, mapDispatchToProps)(EditOrDelete);
