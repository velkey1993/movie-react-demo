import { combineReducers } from 'redux';
import movies from './movieReducer';
import sortType from './sortReducer';
import movieDetails from './movieDetailsReducer';
import filterType from './filterReducer';

export default combineReducers({
    filterType,
    sortType,
    movieDetails,
    movies,
});
