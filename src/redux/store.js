import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './movies/reducer/moviesReducer';
import moviesFilterAndSortReducer from './filterAndSort/reducer/moviesFilterAndSortReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    filterAndSort: moviesFilterAndSortReducer,
});

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
