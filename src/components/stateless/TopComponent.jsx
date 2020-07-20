import React, { useState, useEffect } from 'react';
import {
    Route, Switch, useParams, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../stateful/Search';
import MovieDetails from './MovieDetails';
import usePrevious from '../../utils/usePrevious';
import {
    HOME, SEARCH, FILM, PAGE_NOT_FOUND,
} from '../../roots';
import { FETCH_BY_ID } from '../../redux/moviesActions';

function TopComponent() {
    const { id } = useParams();

    const { error, fetchBy, pending } = useSelector(state => state.movies);
    const movie = useSelector(
        state => state.movies.movies.find(item => item.id === parseInt(id, 10)),
    );

    const previousId = usePrevious(id, id);
    const [movieToShow, setMovieToShow] = useState(movie);

    // keep movie details on delete and search change
    // updates on edit and if movies contains the movie, e.g search fetch a new version
    useEffect(() => {
        if (previousId !== id || movie) {
            setMovieToShow(movie);
        }
    }, [previousId, movie, id]);

    return (
        <Switch>
            <Route exact path={`${FILM}/:id`}>
                {fetchBy === FETCH_BY_ID
                    && !movieToShow
                    && !pending
                    && error
                    && <Redirect to={PAGE_NOT_FOUND} />}
                <MovieDetails movie={movieToShow} placeholder={pending ? 'Loading' : 'Movie details are not available'} />
            </Route>
            <Route exact path={[HOME, SEARCH]}>
                <Search />
            </Route>
        </Switch>
    );
}

export default TopComponent;
