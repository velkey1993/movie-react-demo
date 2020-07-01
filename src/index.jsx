import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/stateful/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './components/reducers';
import { logger } from './components/middelwares/middelware';
import { fetchMoviesAsync } from './components/actions/movieAction';

const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk),
);

store.dispatch(fetchMoviesAsync());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
