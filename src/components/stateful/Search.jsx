import React, { useRef, useState } from 'react';
import './Search.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddMovie from './AddMovie';
import ErrorBoundary from './ErrorBoundary';

const Search = () => {
    const placeholderText = 'What do you want to watch?';

    const inputRef = useRef();

    const [modalShow, setModalShow] = useState(false);

    return (
        <div id='search-container' className='jumbotron'>
            <div id='search-container-background' />
            <div id='search-container-content'>
                <Row>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <p id='search-container-page-name'>
                            <b>epam</b>
                            roulette
                        </p>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Button
                            id='add-movie-button'
                            variant='primary'
                            onClick={() => setModalShow(true)}
                        >
                            <b id='add-movie-button-text'>+ ADD MOVIE</b>
                        </Button>
                        <ErrorBoundary>
                            <AddMovie
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </ErrorBoundary>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h1 id='search-container-find-text'>FIND YOUR MOVIE</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <input
                            ref={inputRef}
                            id='search-container-search-bar-input'
                            placeholder={placeholderText}
                        />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Link to={() => `/search/${inputRef.current?.value}`}>
                            <button
                                type='button'
                                id='search-container-search-bar-button'
                            >
                                <b>SEARCH</b>
                            </button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Search;
