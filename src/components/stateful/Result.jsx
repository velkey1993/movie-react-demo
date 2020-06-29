import React from "react";
import './Result.css';
import ResultNavigatorContainer from "../containers/ResultNavigatorContainer";
import ResultContentContainer from "../containers/ResultContentContainer";

const Result = () => {

    return (
        <div id="result-container" className="jumbotron">
            <ResultNavigatorContainer/>
            <ResultContentContainer/>
            <div id="result-container-movie-page-name"><b>epam</b>roulette</div>
        </div>
    )
}

export default Result;
