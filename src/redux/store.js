import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './moviesReducer';
import moviesFilterAndSortReducer from './moviesFilterAndSortReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    filterAndSort: moviesFilterAndSortReducer,
});

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
