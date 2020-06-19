import React from "react";
import PropTypes from "prop-types";
import './Movie.css';

const Movie = ({image, title, releaseDate, genre}) => {
    return (
        <div className={"movie col-xl-1 col-lg-3 col-md-4 col-xs-6"}>
            <img src={image} alt={title}/>
            <div style={{display: "flex"}}>
                <h4 style={{marginRight: "20px"}}>{title}</h4>
                <h5 style={{border: "1px solid", borderRadius: "4px"}}>{releaseDate}</h5>
            </div>
            <h5 style={{marginTop: 0, marginBottom: 40}}>{genre}</h5>
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
