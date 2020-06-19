import React from "react";
import PropTypes from "prop-types";
import './Movie.css';
import EditOrDelete from "../stateful/EditOrDelete";

const Movie = ({ movie, deleteMovie, updateMovie }) => {
    return (
        <div className={"movie col-xl-1 col-lg-3 col-md-4 col-xs-6"}>
            <div className="image-wrapper">
                <img src={ movie.image } alt={ movie.title } />
                <EditOrDelete
                    movie={ movie }
                    deleteMovie={ deleteMovie } 
                    updateMovie={ updateMovie }
                />
            </div> 
            <div className="movie-data">
                <h4 className="title">{ movie.title }</h4>
                <h5 className="genre">{ movie.genre }</h5>
                <h5 className="year">{ new Date(movie.releaseDate).toISOString().slice(0, 4) }</h5>
            </div>
        </div>
    );
}

Movie.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    releaseDate: PropTypes.number,
    genre: PropTypes.string
}

export default Movie;
