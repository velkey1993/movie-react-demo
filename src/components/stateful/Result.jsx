import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import './Result.css';
import Movie from "../stateless/Movie";
import ErrorBoundary from "./ErrorBoundary";
import {AppContext} from "./App";

const sortByTypes = [
    {name: "TITLE", value: "title"},
    {name: "RELEASE DATE", value: "release_date"},
    {name: "GENRES", value: "genres"}
]

class Result extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            sortByType: sortByTypes[0].value
        }
        this.handleSortByTypeChange = this.handleSortByTypeChange.bind(this);
        this.sortMovieList = this.sortMovieList.bind(this);
    }

    sortMovieList(movieList, sortByType) {
        return _.sortBy(movieList, movie => {
            if (sortByType === 'genres') {
                return movie[sortByType][0];
            }
            return movie[sortByType];
        }, movie => movie['title']);
    }

    handleSortByTypeChange(e) {
        const sortByType = e.target.value
        this.setState({
            sortByType: sortByType
        })
    }

    render() {

        return (
            <div id="result-container" className="jumbotron">
                <div className="row">
                    <AppContext.Consumer>
                        {
                            value => {
                                return (
                                    <div id="result-container-movie-types" className="col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-12">
                                        {
                                            value.genres.map((genre, index) => {
                                                return <p key={index}>{genre.name}</p>
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
                            <select onChange={this.handleSortByTypeChange}>
                                {
                                    sortByTypes.map((type, index) => {
                                        return <option key={index} value={type.value}>{type.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div id="result-container-movie-count">
                    <p><b>{this.props.movies.length}</b> movies found</p>
                </div>
                <div id={"result-container-movie-list"} className={"row"}>
                    {this.sortMovieList(this.props.movies, this.state.sortByType).map(movie => {
                            return (
                                <ErrorBoundary key={movie.id}>
                                    <Movie
                                        movie={movie}
                                        deleteMovie={this.props.deleteMovie}
                                        updateMovie={this.props.updateMovie}
                                        showMovieDetails={this.props.showMovieDetails}
                                    />
                                </ErrorBoundary>
                            );
                        }
                    )}

                </div>
                <div id="result-container-movie-page-name"><b>epam</b>roulette</div>
            </div>
        )
    }
}

Result.propTypes = {
    movies: PropTypes.array,
    deleteMovie: PropTypes.func,
    updateMovie: PropTypes.func,
    showMovieDetails: PropTypes.func
}

export default Result;
