import React from 'react';
import { SortTypeList } from '../actions/sortAction';
import '../stateful/Result.css';
import AppContext from '../stateful/AppContext';

function ResultNavigator({ filterType, filterMovies, sortMovies }) {
    return (
        <div className='row'>
            <AppContext.Consumer>
                {
                    value => (
                        <div
                            id='result-container-movie-types'
                            className='col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-12'
                        >
                            {
                                value.genres.map(genre => (
                                    <p
                                        key={genre.name}
                                        id={filterType === genre ? 'selected-genre' : 'unselected-genre'}
                                    >
                                        {/* eslint-disable-next-line react/button-has-type */}
                                        <button
                                            onClick={() => filterMovies(genre)}
                                            style={{ backgroundColor: 'rgba(35, 35, 35, 0.8)', border: 0 }}
                                        >
                                            {genre.name}
                                        </button>
                                    </p>
                                ))
                            }
                        </div>
                    )
                }
            </AppContext.Consumer>
            <div className='col-xl-1 col-lg-3 col-md-4 col-sm-8 col-xs-12'>
                <div id='result-container-movie-sort-by-types'>
                    <p>SORT BY</p>
                    <select onChange={sortMovies}>
                        {
                            SortTypeList.map(sortType => (
                                <option
                                    key={sortType.name}
                                    value={sortType.value}
                                >
                                    {sortType.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ResultNavigator;
