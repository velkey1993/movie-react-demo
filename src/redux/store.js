import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './moviesReducer';
import moviesFilterAndSortReducer from './moviesFilterAndSortReducer';
import movieDetailsReducer from './movieDetailsReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    filterAndSort: moviesFilterAndSortReducer,
});

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
