import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    Router, Switch, Route,
} from 'react-router-dom';
import App from './components/stateful/App';
import * as serviceWorker from './serviceWorker';
import PageNotFound from './components/stateless/PageNotFound';
import customHistory from './redux/history';

ReactDOM.render(
    <Router history={customHistory}>
        <Switch>
            <Route exact path={['/', '/film/:id', '/search']} component={App} />
            <Route component={PageNotFound} />
        </Switch>
    </Router>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
