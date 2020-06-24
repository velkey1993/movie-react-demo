import React from "react";
import "./App.css";
import Search from "./Search";
import Result from "./Result";
import ErrorBoundary from "./ErrorBoundary";
import * as mockMovieService from "../../service/MockMovieService";
import { useStateWithLocaleStorage } from "../../utils/Custom";

const genres = [
    {name: "ALL", value: ["All"]},
    {name: "DOCUMENTARY", value: ["Documentary"]},
    {name: "COMEDY", value: ["Animated Comedy"]},
    {name: "HORROR", value: ["Horror"]},
    {name: "CRIME", value: ["Crime"]},
    {name: "OTHER", value: ["Spaghetti Western"]}
]

const sortByTypes = [
    {name: "TITLE", value: "title"},
    {name: "RELEASE DATE", value: "release_date"},
    {name: "GENRES", value: "genres"}
]

function App() {
    const [movies, setMovies] = useStateWithLocaleStorage("movies", () =>
        mockMovieService.read()
    );

    return (
        <>
            <div id="container" className={"container"}>
                <ErrorBoundary>
                    <Search
                        genres={genres}
                        addMovie={(movie) => {
                            movie = mockMovieService.create(movie);
                            setMovies((movies) => [...movies, movie]);
                        }}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Result
                        genres={genres}
                        sortByTypes={sortByTypes}
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
                    />
                </ErrorBoundary>
            </div>
        </>
    );
}

export default App;
