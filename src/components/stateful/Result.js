import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import './Result.css';
import Movie from "../stateless/Movie";
import ErrorBoundary from "./ErrorBoundary";

class Result extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            movieList: this.sortMovieList(props.movies, props.sortByTypes[0].value)
        }
        this.handleSortByTypeChange = this.handleSortByTypeChange.bind(this);
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
            movieList: this.sortMovieList(this.props.movies, sortByType)
        })
    }

    render() {
        return (
            <div id="result-container" className="jumbotron">
                <div className="row">
                    <div id="result-container-movie-types" className="col-lg-9">
                        {
                            this.props.genres.map((genre, index) => {
                                return <p key={index}>{genre.name}</p>
                            })
                        }
                    </div>
                    <div className="col-lg-3">
                        <div id="result-container-movie-sort-by-types">
                            <p>SORT BY</p>
                            <select onChange={this.handleSortByTypeChange}>
                                {
                                    this.props.sortByTypes.map((type, index) => {
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
                    {this.state.movieList.map(movie => {
                            return (
                                <ErrorBoundary key={movie.id}>
                                    <Movie
                                        movie={movie}
                                        deleteMovie={this.props.deleteMovie}
                                        updateMovie={this.props.updateMovie}
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
    genres: PropTypes.array,
    sortByTypes: PropTypes.array,
    movies: PropTypes.array
}

export default Result;
