import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../stateful/Search';
import MovieDetails from './MovieDetails';

function TopComponent() {
    return (
        <Switch>
            <Route exact path='/film/:id'>
                <MovieDetails />
            </Route>
            <Route exact path={['/', '/search/:query']}>
                <Search />
            </Route>
        </Switch>
    );
}

export default TopComponent;
