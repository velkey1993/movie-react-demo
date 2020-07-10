import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store';
import * as ReactRedux from 'react-redux';
import MovieDetails from '../components/stateless/MovieDetails';

const PLACEHOLDER_TEXT = 'Test Placeholder';

test('should contains placeholder text if movie is not present', () => {
    const { getByText } = render(
        <Provider store={createStore(() => { })}>
            <MovieDetails placeholder={PLACEHOLDER_TEXT} />
        </Provider>,
    );
    const element = getByText(new RegExp(PLACEHOLDER_TEXT, 'i'));
    expect(element).toBeInTheDocument();
});

test('should not contains placeholder text if movie present', () => {
    const movieMock = {
        title: 'Test title',
        release_date: '2017-12-01',
        poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
        genres: ['Drama', 'Fantasy', 'Romance'],
        overview: 'An other-worldly story ...',
        runtime: 123,
    };
    const { queryByText } = render(
        <Provider store={createStore(() => { })}>
            <MovieDetails movie={movieMock} placeholder={PLACEHOLDER_TEXT} />
        </Provider>,
    );
    const element = queryByText(new RegExp(PLACEHOLDER_TEXT, 'i'));
    expect(element).not.toBeInTheDocument();
});

test('should show movie title', () => {
    const movieMock = {
        title: 'Test title',
        release_date: '2017-12-01',
        poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
        genres: ['Drama', 'Fantasy', 'Romance'],
        overview: 'An other-worldly story ...',
        runtime: 123,
    };
    const { getByText } = render(
        <Provider store={createStore(() => { })}>
            <MovieDetails movie={movieMock} placeholder={PLACEHOLDER_TEXT} />
        </Provider>,
    );
    const element = getByText(new RegExp(movieMock.title, 'i'));
    expect(element).toBeInTheDocument();
});

test('renders correctly', () => {
    const store = configureStore()({});
    jest
        .spyOn(ReactRedux, 'useDispatch')
        .mockImplementation(() => store.dispatch);

    const movieMock = {
        title: 'Test title',
        release_date: '2017-12-01',
        poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
        genres: ['Drama', 'Fantasy', 'Romance'],
        overview: 'An other-worldly story ...',
        runtime: 123,
    };
    const testView = shallow(
        <MovieDetails movie={movieMock} placeholder={PLACEHOLDER_TEXT} />,
    );
    expect(testView).toMatchSnapshot();
});
