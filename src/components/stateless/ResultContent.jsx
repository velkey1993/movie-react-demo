import ErrorBoundary from "../stateful/ErrorBoundary";
import React from "react";
import '../stateful/Result.css';
import MovieContainer from "../containers/MovieContainer";

function ResultContent({movies}) {

    return (
        <>
            <div id="result-container-movie-count">
                <p><b>{movies.length}</b> movies found</p>
            </div>
            <div id={"result-container-movie-list"} className={"row"}>
                {
                    movies.map(movie => {
                            return (
                                <ErrorBoundary key={movie.id}>
                                    <MovieContainer movie={movie}/>
                                </ErrorBoundary>
                            );
                        }
                    )
                }
            </div>
        </>
    )
}

export default ResultContent;
