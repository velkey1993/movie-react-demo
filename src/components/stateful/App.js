import React from 'react';
import './App.css';
import Search from "./Search";
import Result from "./Result";
import simpson from "../../assets/simpsons.png";
import sausage_party from "../../assets/sausage-party.jpg";
import captain_underpants from "../../assets/captain-underpants.jpg";
import the_good_the_bad_and_the_ugly from "../../assets/the-good-the-bad-and-the-ugly.jpg"
import ErrorBoundary from "./ErrorBoundary";

function App() {

    const genres = [
        {name: "ALL", value: []},
        {name: "DOCUMENTARY", value: ["Documentary"]},
        {name: "COMEDY", value: ["Animated Comedy"]},
        {name: "HORROR", value: ["Horror"]},
        {name: "CRIME", value: ["Crime"]},
        {name: "OTHER", value: ["Spaghetti Western", "18+"]}
    ]

    const sortByTypes = [
        {name: "TITLE", value: "title"},
        {name: "RELEASE DATE", value: "releaseDate"},
        {name: "GENRES", value: "genres"}
    ]

    const movies = [
        {
            id: 1,
            image: simpson,
            title: "The Simpsons Movie",
            releaseDate: 2007,
            genres: ["Animated Comedy"]
        },
        {
            id: 2,
            image: sausage_party,
            title: "Sausage Party",
            releaseDate: 2016,
            genres: ["Animated Comedy", "18+"]
        },
        {
            id: 3,
            image: captain_underpants,
            title: "Captain Underpants: The First Epic Movie",
            releaseDate: 2017,
            genres: ["Animated Comedy"]
        },
        {
            id: 4,
            image: the_good_the_bad_and_the_ugly,
            title: "The Good, the Bad and the Ugly",
            releaseDate: 1966,
            genres: ["Spaghetti Western"]
        }
    ]

    return (
        <div className="container">
            <ErrorBoundary><Search genres={genres}/></ErrorBoundary>
            <ErrorBoundary><Result genres={genres} sortByTypes={sortByTypes} movies={movies}/></ErrorBoundary>
        </div>
    );
}

export default App;
