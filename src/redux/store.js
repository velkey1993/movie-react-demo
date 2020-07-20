import {
    createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './moviesReducer';
import moviesFilterAndSortReducer from './moviesFilterAndSortReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    filterAndSort: moviesFilterAndSortReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);
