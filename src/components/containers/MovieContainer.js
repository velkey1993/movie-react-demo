import {showMovieDetails} from "../actions/movieDetailsAction";
import {connect} from "react-redux";
import Movie from "../stateless/Movie";

const mapDispatchToProps = dispatch => ({
    showMovieDetails: movieId => dispatch(showMovieDetails(movieId)),
})

export default connect(null, mapDispatchToProps)(Movie)
