import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/stateful/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import PageNotFound from './components/stateless/PageNotFound';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={['/', '/film/:id', '/search/:query']} component={App} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
