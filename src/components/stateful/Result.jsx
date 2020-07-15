import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import { useToasts } from 'react-toast-notifications';
import Movie from '../stateless/Movie';
import ErrorBoundary from './ErrorBoundary';
import HorizontalScrollableSelectMenu from '../HorizontalScrollableSelectMenu';
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import AppContext from './AppContext';

const SORT_TYPES = [
    {
        name: 'TITLE',
        value: 'title',
    },
    {
        name: 'RELEASE DATE',
        value: 'release_date',
    },
    {
        name: 'GENRES',
        value: 'genres',
    },
    {
        name: 'RATING',
        value: 'vote_average',
    },
    {
        name: 'VOTE',
        value: 'vote_count',
    },
    {
        name: 'RUNTIME',
        value: 'runtime',
    },
    {
        name: 'REVENUE',
        value: 'revenue',
    },
    {
        name: 'BUDGET',
        value: 'budget',
    },
];

const FILTER_ALL = '';
const Result = ({
    selectedSortType,
    onSortTypeChange,
    selectedGenreFilter,
    onGenreFilterChange,
    movies,
    totalAmount,
    fetchNextPagination,
    fetchBy,
}) => {
    const { addToast } = useToasts();

    const handleSelectionChange = (key) => {
        if (key === FILTER_ALL) {
            onGenreFilterChange([FILTER_ALL])
                .catch(error => addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                }));
        } else if (selectedGenreFilter.includes(key)) {
            const newFilter = selectedGenreFilter.filter(genre => genre !== key);
            onGenreFilterChange(newFilter.length === 0 ? [''] : newFilter)
                .catch(error => addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                }));
        } else {
            onGenreFilterChange(
                [...selectedGenreFilter, key].filter(genre => genre !== FILTER_ALL),
            )
                .catch(error => addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                }));
        }
    };

    const [, setIsFetching] = useInfiniteScroll(
        () => {
            if (totalAmount > movies.length) {
                fetchNextPagination()
                    .then(() => setIsFetching(false))
                    .catch(error => addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    }));
            } else {
                setIsFetching(false);
            }
        },
    );

    return (
        <div id='result-container' className='jumbotron'>
            {fetchBy === 'search' && (
                <div className='row'>
                    <AppContext.Consumer>
                        {
                            value => (
                                <HorizontalScrollableSelectMenu
                                    id='result-container-movie-types'
                                    className='col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-9'
                                    values={[
                                        {
                                            key: FILTER_ALL,
                                            display: 'All',
                                        },
                                        ...(value.genres?.map(genre => ({
                                            key: genre,
                                            display: genre.toUpperCase(),
                                        })))]}
                                    selected={selectedGenreFilter}
                                    onSelectionChange={handleSelectionChange}
                                />
                            )}
                    </AppContext.Consumer>
                    <div
                        id='result-container-movie-sort-by-types'
                        className='col-xl-1 col-lg-3 col-md-4 col-sm-4 col-xs-3'
                    >
                        <div className='wrapper'>
                            <span className='hidden-xs'>SORT BY</span>
                            <select
                                onChange={e => onSortTypeChange(e.target.value)}
                                value={selectedSortType}
                            >
                                {SORT_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {!!totalAmount && (
                <>
                    <div id='result-container-movie-count'>
                        <p>
                            <b>{`${totalAmount} movies found`}</b>
                        </p>
                    </div>

                    <div id='result-container-movie-list' className='row'>
                        {movies.map(movie => (
                            <ErrorBoundary key={movie.id}>
                                <Movie
                                    movie={movie}
                                />
                            </ErrorBoundary>
                        ))}
                    </div>
                </>
            )}
            {!totalAmount && (
                <div id='result-container-no-movie'>
                    <h3>
                        No Movie Found
                    </h3>
                </div>
            )}
            <div id='result-container-movie-page-name'>
                <b>epam</b>
                roulette
            </div>
        </div>
    );
};

Result.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    })).isRequired,
};

export default Result;
