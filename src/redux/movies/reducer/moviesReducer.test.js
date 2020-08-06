import reducer from './moviesReducer';
import {
    ADD_MOVIE_SUCCESS, DELETE_MOVIE_SUCCESS, EDIT_MOVIE_SUCCESS,
    ERROR,
    FETCH_MOVIE_SUCCESS, FETCH_MOVIES_PAGINATION_SUCCESS,
    FETCH_MOVIES_SUCCESS,
    PENDING,
} from '../actions/moviesActions';

describe('moviesReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}))
            .toEqual({
                pending: false,
                movies: [],
                error: null,
            });
    });

    it('should handle PENDING with payload', () => {
        expect(reducer(undefined, {
            type: PENDING,
            payload: 'search',
        }))
            .toEqual({
                movies: [],
                pending: true,
                fetchBy: 'search',
                error: null,
            });
    });

    it('should handle PENDING without payload', () => {
        expect(reducer({
            pending: false,
            movies: [],
            error: null,
            fetchBy: 'id',
        }, {
            type: PENDING,
            payload: undefined,
        }))
            .toEqual({
                movies: [],
                pending: true,
                fetchBy: 'id',
                error: null,
            });
    });

    it('should handle ERROR', () => {
        expect(reducer({
            movies: [],
            pending: true,
            fetchBy: 'search',
            error: null,
        }, {
            type: ERROR,
            error: { message: 'Error message' },
        }))
            .toEqual({
                movies: [],
                pending: false,
                fetchBy: 'search',
                error: { message: 'Error message' },
            });
    });

    it('should handle FETCH_MOVIES_SUCCESS', () => {
        expect(reducer({
            movies: [],
            pending: true,
            fetchBy: 'id',
            error: null,
        }, {
            type: FETCH_MOVIES_SUCCESS,
            payload: {
                data: [{}, {}],
                totalAmount: 120,
            },
        }))
            .toEqual({
                movies: [{}, {}],
                pending: false,
                fetchBy: 'search',
                error: null,
                totalAmount: 120,
            });
    });

    it('should handle FETCH_MOVIE_SUCCESS', () => {
        expect(reducer({
            movies: [{}, {}],
            pending: true,
            fetchBy: 'search',
            error: null,
            totalAmount: 120,
        }, {
            type: FETCH_MOVIE_SUCCESS,
            payload: {},
        }))
            .toEqual({
                movies: [{}],
                pending: false,
                fetchBy: 'id',
                error: null,
                totalAmount: 1,
            });
    });

    it('should handle FETCH_MOVIES_PAGINATION_SUCCESS', () => {
        expect(reducer({
            movies: [{ id: 1 }, { id: 2 }, { id: 3 }],
            pending: true,
            fetchBy: 'id',
            error: null,
            totalAmount: 120,
        }, {
            type: FETCH_MOVIES_PAGINATION_SUCCESS,
            payload: {
                data: [{ id: 2 }, { id: 6 }],
                totalAmount: 121,
            },
        }))
            .toEqual({
                movies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 6 }],
                pending: false,
                fetchBy: 'id',
                error: null,
                totalAmount: 121,
            });
    });

    it('should handle ADD_MOVIE_SUCCESS', () => {
        expect(reducer({
            movies: [{ id: 1 }, { id: 2 }, { id: 3 }],
            pending: true,
            fetchBy: 'id',
            error: null,
            totalAmount: 120,
        }, {
            type: ADD_MOVIE_SUCCESS,
        }))
            .toEqual({
                movies: [{ id: 1 }, { id: 2 }, { id: 3 }],
                pending: false,
                fetchBy: 'id',
                error: null,
                totalAmount: 120,
            });
    });

    it('should handle EDIT_MOVIE_SUCCESS', () => {
        expect(reducer({
            movies: [{ id: 1 }, { id: 2, title: 'originalTitle' }, { id: 3 }],
            pending: true,
            fetchBy: 'id',
            error: null,
            totalAmount: 120,
        }, {
            type: EDIT_MOVIE_SUCCESS,
            payload: { id: 2, title: 'editedTitle' },
        }))
            .toEqual({
                movies: [{ id: 1 }, { id: 2, title: 'editedTitle' }, { id: 3 }],
                pending: false,
                fetchBy: 'id',
                error: null,
                totalAmount: 120,
            });
    });

    it('should handle DELETE_MOVIE_SUCCESS', () => {
        expect(reducer({
            movies: [{ id: 1 }, { id: 2 }, { id: 3 }],
            pending: true,
            fetchBy: 'id',
            error: null,
            totalAmount: 120,
        }, {
            type: DELETE_MOVIE_SUCCESS,
            payload: 2,
        }))
            .toEqual({
                movies: [{ id: 1 }, { id: 3 }],
                pending: false,
                fetchBy: 'id',
                error: null,
                totalAmount: 119,
            });
    });
});
