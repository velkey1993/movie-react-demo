import React, {useState} from "react";
import "./App.css";
import Result from "./Result";
import ErrorBoundary from "./ErrorBoundary";
import * as mockMovieService from "../../service/MockMovieService";
import {useStateWithLocaleStorage} from "../../utils/Custom";
import TopComponent from "../stateless/TopComponent";

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
    const [movieId, setMovieId] = useState();

    return (
        <>
            <div id="container" className={"container"}>
                <AppContext.Provider value={{genres: genres}}>
                    <ErrorBoundary>
                        <TopComponent
                            movie={movies.find(movie => movie.id === movieId)}
                            closeDetails={() => setMovieId(undefined)}
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
                            showMovieDetails={setMovieId}
                        />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
