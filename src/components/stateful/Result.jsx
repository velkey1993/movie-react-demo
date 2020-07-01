import React, { useEffect } from 'react';
import './Result.css';
import _ from 'lodash';
import ResultNavigatorContainer from '../containers/ResultNavigatorContainer';
import ResultContentContainer from '../containers/ResultContentContainer';
import { fetchMoviesAsync } from '../actions/movieAction';

const Result = ({ movies, dispatch }) => {
    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (_.isEmpty(movies)) {
                dispatch(fetchMoviesAsync());
            }
        }, 10000);
        return () => {
            clearInterval(intervalId);
        };
    }, [movies, dispatch]);
    return (
        <div id='result-container' className='jumbotron'>
            <ResultNavigatorContainer />
            <ResultContentContainer />
            <div id='result-container-movie-page-name'>
                <b>epam</b>
                roulette
            </div>
        </div>
    );
};

export default Result;
