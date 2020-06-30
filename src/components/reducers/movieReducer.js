import * as MockMovieService from '../../service/MockMovieService';
import { uuid4 } from '../../service/MockMovieService';
import { ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE } from '../actions/movieAction';

const movies = (state = MockMovieService.read(), action) => {
    switch (action.type) {
    case ADD_MOVIE:
        return [
            ...state,
            {
                id: uuid4(),
                ...action.movie,
            },
        ];
    case EDIT_MOVIE:
        return state
            .map(movie => (movie.id === action.movie.id ? { ...movie, ...action.movie } : movie));
    case DELETE_MOVIE:
        return state.filter(movie => movie.id !== action.movieId);
    default:
        return state;
    }
};

export default movies;
