import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './moviesReducer';
import moviesFilterAndSortReducer from './moviesFilterAndSortReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    filterAndSort: moviesFilterAndSortReducer,
});

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware),
    );
}
