import React from 'react';
import {
    Route, Switch, useParams, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../stateful/Search';
import MovieDetails from './MovieDetails';

function TopComponent() {
    const { id } = useParams();
    const { error, fetchBy, pending } = useSelector(state => state.movies);
    const movie = useSelector(state => state.movies.movies.find(item => item.id.toString() === id));

    return (
        <Switch>
            <Route exact path='/film/:id'>
                {fetchBy === 'id' && movie && <MovieDetails movie={movie} />}
                {fetchBy === 'id' && !movie && pending && <MovieDetails placeholder='Loading' />}
                {fetchBy === 'id' && !movie && !pending && !error && <MovieDetails placeholder='Deleted' />}
                {fetchBy === 'id' && !movie && !pending && error && <Redirect to='/page-not-found' />}
                {fetchBy === 'search' && <MovieDetails movie={movie} placeholder='Movie details are not available' />}
            </Route>
            <Route exact path={['/', '/search/:query']}>
                <Search />
            </Route>
        </Switch>
    );
}

export default TopComponent;
