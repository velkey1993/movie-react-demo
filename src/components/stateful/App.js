import React from "react";
import "./App.css";
import Search from "./Search";
import Result from "./Result";
import ErrorBoundary from "./ErrorBoundary";
import * as mockMovieService from "../../service/MockMovieService";
import { useStateWithLocaleStorage } from "../../utils/Custom";

const movieTypes = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

const sortByTypes = ["TITLE", "RELEASE DATE", "GENRE"];

function App() {
    const [movies, setMovies] = useStateWithLocaleStorage("movies", () =>
        mockMovieService.read()
    );

    return (
        <>
            <div id="container" className={"container"}>
                <div id="blur" />
                <ErrorBoundary>
                    <Search />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Result
                        movieTypes={movieTypes}
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
