import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
    Router, Switch, Route,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from './components/stateful/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import PageNotFound from './components/stateless/PageNotFound';
import customHistory from './redux/history';

ReactDOM.render(
    <ToastProvider>
        <Provider store={store}>
            <Router history={customHistory}>
                <Switch>
                    <Route exact path={['/', '/film/:id', '/search']} component={App} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </Provider>
    </ToastProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
