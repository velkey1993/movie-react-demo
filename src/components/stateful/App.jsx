import React, {useState} from "react";
import "./App.css";
import Result from "./Result";
import ErrorBoundary from "./ErrorBoundary";
import * as mockMovieService from "../../service/MockMovieService";
import {useStateWithLocaleStorage} from "../../utils/Custom";
import TopComponent from "../stateless/TopComponent";

const topComponents = {
    SEARCH: "SEARCH",
    MOVIE_DETAILS: "MOVIE_DETAILS"
};

const genres = [
    {name: "ALL", value: ["All"]},
    {name: "DOCUMENTARY", value: ["Documentary"]},
    {name: "COMEDY", value: ["Animated Comedy"]},
    {name: "HORROR", value: ["Horror"]},
    {name: "CRIME", value: ["Crime"]},
    {name: "OTHER", value: ["Spaghetti Western"]}
]

export const AppContext = React.createContext({});

function App() {

    const [movies, setMovies] = useStateWithLocaleStorage("movies", () => mockMovieService.read());
    const [topComponent, setTopComponent] = useState({component: topComponents.SEARCH});

    return (
        <>
            <div id="container" className={"container"}>
                <AppContext.Provider value={{genres: genres, topComponents: topComponents}}>
                    <ErrorBoundary>
                        <TopComponent
                            componentToRender={topComponent}
                            setTopComponent={setTopComponent}
                            addMovie={(movie) => {
                                movie = mockMovieService.create(movie);
                                setMovies((movies) => [...movies, movie]);
                            }}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Result
                            movies={movies}
                            updateMovie={(movie) => {
                                movie = mockMovieService.update(movie);
                                setMovies((movies) =>
                                    movies.map((item) =>
                                        item.id === movie.id ? movie : item
                                    )
                                );
                            }}
                            deleteMovie={(id) => {
                                id = mockMovieService.remove(id);
                                setMovies((movies) =>
                                    movies.filter((item) => item.id !== id)
                                );
                            }}
                            setTopComponent={setTopComponent}
                        />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
