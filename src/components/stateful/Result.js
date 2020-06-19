import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import './Result.css';
import Movie from "../stateless/Movie";
import ErrorBoundary from "./ErrorBoundary";

class Result extends PureComponent {

    render() {
        return (
            <div id={"result-container"} className={"jumbotron"}>
                <div className={"row"}>
                    <div id={"result-container-movie-types"} className={"col-lg-9"}>
                        {
                            this.props.movieTypes.map((type, index) => {
                                return <p key={index}>{type}</p>
                            })
                        }
                    </div>
                    <div className={"col-lg-3"}>
                        <div id={"result-container-movie-sort-types"}>
                            <p>SORT BY</p>
                            <select>
                                {
                                    this.props.sortByTypes.map((type, index) => {
                                        return <option key={index} value={type}>{type}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div id={"result-container-movie-count"}>
                    <p><b>{this.props.movies.length}</b> movies found</p>
                </div>
                <div id={"result-container-movie-list"} className={"row"}>
                    {this.props.movies.map(movie => {
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
                <div id={"result-container-movie-page-name"}><b>epam</b>roulette</div>
            </div>
        )
    }
}

Result.propTypes = {
    movieTypes: PropTypes.array,
    sortByTypes: PropTypes.array,
    movies: PropTypes.array
}

export default Result;
