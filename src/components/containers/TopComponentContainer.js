import { connect } from 'react-redux';
import TopComponent from '../stateless/TopComponent';
import { addMovieAsync } from '../actions/movieAction';
import { closeMovieDetails } from '../actions/movieDetailsAction';

const mapStateToProps = state => ({
    movie: state.movies.array.find(movie => movie.id === state.movieDetails),
});

const mapDispatchToProps = dispatch => ({
    addMovie: movie => dispatch(addMovieAsync(movie)),
    closeDetails: () => dispatch(closeMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopComponent);
