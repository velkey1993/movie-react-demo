import Search from "../stateful/Search";
import MovieDetails from "./MovieDetails";
import React, {useContext} from "react";
import {AppContext} from "../stateful/App";

function TopComponent({componentToRender, setTopComponent, addMovie}) {

    const topComponents = useContext(AppContext).topComponents;

    return componentToRender.component === topComponents.MOVIE_DETAILS
        ? <MovieDetails movie={componentToRender.movie} setTopComponent={setTopComponent}/>
        : <Search addMovie={addMovie}/>;
}

export default TopComponent;
