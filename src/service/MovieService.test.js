import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MovieService from './MovieService';

describe('MovieService', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    it('create()', (done) => {
        const mockResponse = { data: 'dummyData' };
        mock.onPost('http://localhost:4000/movies', { data: 'data' })
            .reply(200, mockResponse);

        MovieService.create({ data: 'data' })
            .then((response) => {
                expect(response.data)
                    .toStrictEqual(mockResponse);
            })
            .then(done)
            .catch(done.fail);
    });

    it('searchMovies() - asc', (done) => {
        const mockResponse = { data: [{}, {}] };
        mock.onGet('http://localhost:4000/movies', {
            params: {
                sortBy: 'dummySortBy',
                filter: 'dummyFilterOne,dummyFilterTwo',
                sortOrder: 'asc',
                searchBy: 'title',
                search: 'dummySearch',
                offset: 1234,
            },
        })
            .reply(200, mockResponse);

        MovieService.searchMovies('dummySortBy', ['dummyFilterOne', 'dummyFilterTwo'], 'dummySearch', 1234)
            .then((response) => {
                expect(response.data)
                    .toStrictEqual(mockResponse);
            })
            .then(done)
            .catch(done.fail);
    });

    it('searchMovies() - desc', (done) => {
        const mockResponse = { data: [{}, {}] };
        mock.onGet('http://localhost:4000/movies', {
            params: {
                sortBy: 'vote_average',
                filter: 'dummyFilterOne,dummyFilterTwo',
                sortOrder: 'desc',
                searchBy: 'title',
                search: 'dummySearch',
                offset: 1234,
            },
        })
            .reply(200, mockResponse);

        MovieService.searchMovies('vote_average', ['dummyFilterOne', 'dummyFilterTwo'], 'dummySearch', 1234)
            .then((response) => {
                expect(response.data)
                    .toStrictEqual(mockResponse);
            })
            .then(done)
            .catch(done.fail);
    });

    it('read()', (done) => {
        const mockResponse = { data: 'dummyData' };
        mock.onGet('http://localhost:4000/movies/1234')
            .reply(200, mockResponse);

        MovieService.read(1234)
            .then((response) => {
                expect(response.data)
                    .toStrictEqual(mockResponse);
            })
            .then(done)
            .catch(done.fail);
    });

    it('update()', (done) => {
        const dummyRequest = { data: 'dummyData' };
        const mockResponse = { data: 'dummyData' };
        mock.onPut('http://localhost:4000/movies', dummyRequest)
            .reply(200, mockResponse);

        MovieService.update(dummyRequest)
            .then((response) => {
                expect(response.data)
                    .toStrictEqual(mockResponse);
            })
            .then(done)
            .catch(done.fail);
    });

    it('remove()', (done) => {
        mock.onDelete('http://localhost:4000/movies/1234')
            .reply(200);

        MovieService.remove(1234)
            .then((response) => {
                expect(response.status)
                    .toEqual(200);
            })
            .then(done)
            .catch(done.fail);
    });
});
