import React from "react";
import './Search.css'

const Search = () => {

    const placeholderText = "What do you want to watch?";

    return (
        <div id={"search-container"} className={"jumbotron"}>
            <div id={"search-container-background"}/>
            <div id={"search-container-content"}>
                <p id={"search-container-page-name"}><b>epam</b>roulette</p>
                <h1 id={"search-container-find-text"}>FIND YOUR MOVIE</h1>
                <div id={"search-container-add-movie"}>
                    <button id={"add-movie-button"}><b id={"add-movie-button-text"}>+ ADD MOVIE</b></button>
                </div>
                <div id={"search-container-search-bar"}>
                    <input id={"search-container-search-bar-input"} placeholder={placeholderText}/>
                    <button id={"search-container-search-bar-button"}><b>SEARCH</b></button>
                </div>
            </div>
        </div>
    );
}

export default Search;
