import Search from "../stateful/Search";
import MovieDetails from "./MovieDetails";
import React from "react";

function TopComponent({movie, closeDetails, addMovie}) {

    return movie
        ? <MovieDetails movie={movie} closeDetails={closeDetails}/>
        : <Search addMovie={addMovie}/>;
}

export default TopComponent;
