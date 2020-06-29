import {AppContext} from "../stateful/App";
import {SortTypeList} from "../actions/sortAction";
import React from "react";
import '../stateful/Result.css';

function ResultNavigator({filterType, filterMovies, sortMovies}) {
    return (
        <div className="row">
            <AppContext.Consumer>
                {
                    value => {
                        return (
                            <div id="result-container-movie-types"
                                 className="col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-12">
                                {
                                    value.genres.map((genre) => {
                                        return (
                                            <p key={genre.name}
                                               id={filterType === genre ? "selected-genre" : ""}
                                               onClick={() => filterMovies(genre)}>
                                                {genre.name}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                }
            </AppContext.Consumer>
            <div className="col-xl-1 col-lg-3 col-md-4 col-sm-8 col-xs-12">
                <div id="result-container-movie-sort-by-types">
                    <p>SORT BY</p>
                    <select onChange={sortMovies}>
                        {
                            SortTypeList.map((sortType, index) => {
                                return <option key={index} value={sortType.value}>{sortType.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ResultNavigator;
