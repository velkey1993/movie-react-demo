import React, { useState, useEffect } from 'react';
import './Search.css';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AddMovie from './AddMovie';
import ErrorBoundary from './ErrorBoundary';
import handleKeyDown from '../../utils/handleKeyDown';
import { filterMoviesBySearch } from '../../redux/moviesFilterAndSortActions';
import useDefaultToasts from '../../utils/useDefaultToasts';

const Search = () => {
    const { addErrorToast } = useDefaultToasts();
    const dispatch = useDispatch();
    const search = useSelector(state => state.filterAndSort.search);

    const placeholderText = 'What do you want to watch?';
    const [searchText, setSearchText] = useState(search);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setSearchText(search);
    }, [search]);

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
                            id='search-container-search-bar-input'
                            placeholder={placeholderText}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            onKeyDown={
                                handleKeyDown(() => dispatch(filterMoviesBySearch(searchText))
                                    .catch(addErrorToast), 'Enter')}
                        />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <button
                            type='button'
                            onClick={() => dispatch(filterMoviesBySearch(searchText))
                                .catch(addErrorToast)}
                            id='search-container-search-bar-button'
                        >
                            <b>SEARCH</b>
                        </button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Search;
