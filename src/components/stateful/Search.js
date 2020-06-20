import React, {useState} from "react";
import './Search.css'
import AddMovie from "./AddMovie";
import {Button} from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

const Search = ({genres, addMovie}) => {

    const placeholderText = "What do you want to watch?";

    const [modalShow, setModalShow] = useState(false);

    return (
        <div id="search-container" className="jumbotron">
            <div id="search-container-background"/>
            <div id="search-container-content">
                <p id="search-container-page-name">
                    <b>epam</b>roulette
                </p>
                <h1 id="search-container-find-text">FIND YOUR MOVIE</h1>
                <div id="search-container-add-movie">
                    <Button id="add-movie-button" variant="primary" onClick={() => setModalShow(true)}>
                        <b id="add-movie-button-text">+ ADD MOVIE</b>
                    </Button>
                    <ErrorBoundary>
                        <AddMovie show={modalShow} onHide={() => setModalShow(false)} genres={genres}/>
                    </ErrorBoundary>
                </div>
                <div id="search-container-search-bar">
                    <input id="search-container-search-bar-input" placeholder={placeholderText}/>
                    <button id="search-container-search-bar-button">
                        <b>SEARCH</b>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
