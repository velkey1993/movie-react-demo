import { connect } from 'react-redux';
import TopComponent from '../stateless/TopComponent';
import { addMovie } from '../actions/movieAction';
import { closeMovieDetails } from '../actions/movieDetailsAction';

const mapStateToProps = state => ({
    movie: state.movies.find(movie => movie.id === state.movieDetails),
});

const mapDispatchToProps = dispatch => ({
    addMovie: movie => dispatch(addMovie(movie)),
    closeDetails: () => dispatch(closeMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopComponent);
