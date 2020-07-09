import React from 'react';
import './PageNotFound.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pageNotFound from '../../assets/page_not_found.png';

function PageNotFound() {
    return (
        <div id='page-not-found-container' className='container'>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <p id='search-container-page-name'>
                        <b>epam</b>
                        roulette
                    </p>
                </Col>
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id='page-not-found-container-image'>
                    <img src={pageNotFound} alt={404} />
                </div>
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id='page-not-found-container-text'>
                    <h1>Not Found</h1>
                </div>
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id='page-not-found-container-button-wrapper'>
                    <Link id='page-not-found-container-button' to='/' className='btn'>
                        <span id='page-not-found-container-button-text'>GO BACK TO HOME</span>
                    </Link>
                </div>
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id='page-not-found-container-movie-page-name' style={{ fontSize: '150%' }}>
                    <b>epam</b>
                    roulette
                </div>
            </Row>
        </div>
    );
}

export default PageNotFound;
