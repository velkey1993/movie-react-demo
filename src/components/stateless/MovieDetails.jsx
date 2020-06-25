import React from "react";
import './MovieDetails.css'
import {Button, Col, Row} from "react-bootstrap";

function MovieDetails({movie, closeDetails}) {

    return (
        <div id="movie-details-container" className="jumbotron">
            <div id="movie-details-container-background"/>
            <div id="movie-details-container-content">
                <p id="movie-details-container-page-name">
                    <b>epam</b>roulette
                </p>
                <div id="movie-details-container-search">
                    <Button id="movie-details-container-search-button" variant="primary"
                            onClick={closeDetails}>
                        <span className="glyphicon glyphicon-search"/>
                    </Button>
                </div>
                <div id="movie-details-container-data">
                    <Row>
                        <Col xs={6} sm={5} md={4} lg={3} xl={1}>
                            <img src={movie.poster_path} alt={movie.title}/>
                        </Col>
                        <Col xs={6} sm={5} md={6} lg={7} xl={9}>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <p id="movie-details-container-data-title">
                                        {movie.title}
                                        &emsp;
                                        <span id="movie-details-container-data-vote-average">
                                            {movie.vote_average}
                                        </span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <p>{movie.tagline}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <p style={{color: "#f65261"}}>
                                        {new Date(movie.release_date).toISOString().slice(0, 4)}
                                        &emsp;
                                        {movie.runtime} min
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <p style={{fontSize: "120%"}}>{movie.overview}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
}

export default MovieDetails;
