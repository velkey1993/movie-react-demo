import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import { connect } from 'react-redux';
import Movie from '../stateless/Movie';
import ErrorBoundary from './ErrorBoundary';
import { filterMoviesByGenre, sortMoviesByType } from '../../redux/moviesFilterAndSortActions';
import makeGetVisibleMovies from '../../redux/visibleMoviesSelector';
import HorizontalScrollableSelectMenu from '../HorizontalScrollableSelectMenu';
import makeGetVisibleGenreFilters from '../../redux/visibleFilterGenresSelector';

const sortType = [
    { name: 'TITLE', value: 'title' },
    { name: 'RELEASE DATE', value: 'release_date' },
    { name: 'GENRES', value: 'genres' },
];

class Result extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
        this.handleGenreFilterChange = this.handleGenreFilterChange.bind(this);
    }

    handleSortTypeChange(e) {
        const type = e.target.value;
        this.props.onSortTypeChange(type);
    }

    handleGenreFilterChange(e) {
        const type = e.target.innerText;
        this.props.onGenreFilterChange(type);
    }

    render() {
        return (
            <div id='result-container' className='jumbotron'>
                <div className='row'>
                    <HorizontalScrollableSelectMenu
                        id='result-container-movie-types'
                        className='col-xl-11 col-lg-9 col-md-8 col-sm-8 col-xs-9'
                        values={['All', ...(this.props.visibleGenreFilters)]}
                        selected={this.props.genreFilter || 'All'}
                        onSelectionChange={this.handleGenreFilterChange}
                    />
                    <div id='result-container-movie-sort-by-types' className='col-xl-1 col-lg-3 col-md-4 col-sm-4 col-xs-3'>
                        <div className='wrapper'>
                            <span className='hidden-xs'>SORT BY</span>
                            <select onChange={this.handleSortTypeChange}>
                                {sortType.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div id='result-container-movie-count'>
                    <p>
                        <b>{`${this.props.visibleMovies.length} movies found`}</b>
                    </p>
                </div>
                <div id='result-container-movie-list' className='row'>
                    {this.props.visibleMovies.map(movie => (
                        <ErrorBoundary key={movie.id}>
                            <Movie
                                movie={movie}
                                showMovieDetails={this.props.showMovieDetails}
                            />
                        </ErrorBoundary>
                    ))}
                </div>
                <div id='result-container-movie-page-name'>
                    <b>epam</b>
                    roulette
                </div>
            </div>
        );
    }
}

Result.propTypes = {
    visibleMovies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    })).isRequired,
    showMovieDetails: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
    const getVisibleMovies = makeGetVisibleMovies();
    const getVisibleGenreFilters = makeGetVisibleGenreFilters();
    const mapStateToProps = (state, props) => ({
        genreFilter: state.filterAndSort.genreFilter,
        sortType: state.filterAndSort.sortType,
        visibleMovies: getVisibleMovies(state, props),
        visibleGenreFilters: getVisibleGenreFilters(state, props),
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    onGenreFilterChange: filterMoviesByGenre,
    onSortTypeChange: sortMoviesByType,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps,
)(Result);
