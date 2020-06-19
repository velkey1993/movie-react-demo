import React from "react";
import PropTypes from "prop-types";
import './Movie.css';

const Movie = ({image, title, releaseDate, genres}) => {
    return (
        <div className="movie col-xl-1 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <img src={image} alt={title}/>
            <div id="movie-information">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h4 style={{marginRight: "20px", height:40, width:200}}>{title}</h4>
                    <h5 style={{border: "1px solid", borderRadius: "4px", height: 18}}>{releaseDate}</h5>
                </div>
                <h5 style={{marginTop: 0, marginBottom: 40}}>{genres.join(", ")}</h5>
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
