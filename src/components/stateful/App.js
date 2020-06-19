import React from 'react';
import './App.css';
import Search from "./Search";
import Result from "./Result";
import simpson from "../../assets/Simpsons_final_poster.png";
import ErrorBoundary from "./ErrorBoundary";

function App() {

    const movieTypes = [
        "ALL",
        "DOCUMENTARY",
        "COMEDY",
        "HORROR",
        "CRIME"
    ]

    const sortByTypes = [
        "TITLE",
        "RELEASE DATE",
        "GENRE"
    ]

    const movies = [
        {
            id: 1,
            image: simpson,
            title: "The Simpsons Movie",
            releaseDate: 2007,
            genre: "Animated Comedy"
        },
        {
            id: 2,
            image: simpson,
            title: "The Simpsons Movie",
            releaseDate: 2007,
            genre: "Animated Comedy"
        },
        {
            id: 3,
            image: simpson,
            title: "The Simpsons Movie",
            releaseDate: 2007,
            genre: "Animated Comedy"
        },
        {
            id: 4,
            image: simpson,
            title: "The Simpsons Movie",
            releaseDate: 2007,
            genre: "Animated Comedy"
        }
    ]

    return (
        <div className={"container"}>
            <ErrorBoundary><Search/></ErrorBoundary>
            <ErrorBoundary><Result movieTypes={movieTypes} sortByTypes={sortByTypes} movies={movies}/></ErrorBoundary>
        </div>
    );
}

export default App;
