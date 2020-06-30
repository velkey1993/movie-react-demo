import { CLOSE_MOVIE_DETAILS, SHOW_MOVIE_DETAILS } from '../actions/movieDetailsAction';

const movieDetails = (state = null, action) => {
    switch (action.type) {
    case SHOW_MOVIE_DETAILS:
        return action.movieId;
    case CLOSE_MOVIE_DETAILS:
        return null;
    default:
        return state;
    }
};

export default movieDetails;
