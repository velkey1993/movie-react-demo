import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './moviesActions';
import MovieService from '../../../service/MovieService';

const mockStore = configureMockStore([thunk]);

jest.mock('../../service/MovieService');

describe('moviesActions - sync - actions', () => {
    it('should create a pending action', () => {
        const fetchType = 'dummyFetchType';
        const expectedAction = {
            type: actions.PENDING,
            payload: fetchType,
        };
        expect(actions.pending(fetchType))
            .toEqual(expectedAction);
    });

    it('should create an error action', () => {
        const errorMessage = 'dummyFetchType';
        const expectedAction = {
            type: actions.ERROR,
            error: errorMessage,
        };
        expect(actions.handleError(errorMessage))
            .toEqual(expectedAction);
    });

    it('should create a fetch movies success action', () => {
        const data = {};
        const expectedAction = {
            type: actions.FETCH_MOVIES_SUCCESS,
            payload: data,
        };
        expect(actions.fetchMoviesSuccess(data))
            .toEqual(expectedAction);
    });

    it('should create a fetch movies pagination success action', () => {
        const data = {};
        const expectedAction = {
            type: actions.FETCH_MOVIES_PAGINATION_SUCCESS,
            payload: data,
        };
        expect(actions.fetchMoviesPaginationSuccess(data))
            .toEqual(expectedAction);
    });

    it('should create a fetch movie success action', () => {
        const data = {};
        const expectedAction = {
            type: actions.FETCH_MOVIE_SUCCESS,
            payload: data,
        };
        expect(actions.fetchMovieSuccess(data))
            .toEqual(expectedAction);
    });

    it('should create an add movie success action', () => {
        const data = {};
        const expectedAction = {
            type: actions.ADD_MOVIE_SUCCESS,
            payload: data,
        };
        expect(actions.addMovieSuccess(data))
            .toEqual(expectedAction);
    });

    it('should create an edit movie success action', () => {
        const data = {};
        const expectedAction = {
            type: actions.EDIT_MOVIE_SUCCESS,
            payload: data,
        };
        expect(actions.editMovieSuccess(data))
            .toEqual(expectedAction);
    });

    it('should create a delete movie success action', () => {
        const movieId = 1234;
        const expectedAction = {
            type: actions.DELETE_MOVIE_SUCCESS,
            payload: movieId,
        };
        expect(actions.deleteMovieSuccess(movieId))
            .toEqual(expectedAction);
    });
});

describe('moviesActions - async - fetchMovies', () => {
    it('should create FETCH_MOVIES_SUCCESS when fetching movies has been done', () => {
        const mockResponse = { data: 'dummyData' };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'dummyData',
                type: 'FETCH_MOVIES_SUCCESS',
            },
        ];

        return store.dispatch(actions.fetchMovies('dummySortBy', 'dummyFilter', 'dummySearch'))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when search text is empty', () => {
        const store = mockStore();

        const expectedActions = [];

        return store.dispatch(actions.fetchMovies('dummySortBy', 'dummyFilter'))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Search text is empty');
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.fetchMovies('dummySortBy', 'dummyFilter', 'dummySearch'))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMovies('dummySortBy', 'dummyFilter', 'dummySearch'))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });

    it('should throw and handle error when response is undefined', () => {
        const mockResponse = undefined;
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'Cannot read property \'data\' of undefined',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMovies('dummySortBy', 'dummyFilter', 'dummySearch'))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Cannot read property \'data\' of undefined');
            });
    });
});

describe('moviesActions - async - fetchMoviesPagination', () => {
    it('should create FETCH_MOVIES_PAGINATION_SUCCESS when fetching paginated movies has been done', () => {
        const mockResponse = { data: 'dummyData' };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'dummyData',
                type: 'FETCH_MOVIES_PAGINATION_SUCCESS',
            },
        ];

        return store.dispatch(actions.fetchMoviesPagination('dummySortBy', 'dummyFilter', 'dummySearch', 20))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.fetchMoviesPagination('dummySortBy', 'dummyFilter', 'dummySearch', 20))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMoviesPagination('dummySortBy', 'dummyFilter', 'dummySearch', 20))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });

    it('should throw and handle error when response is undefined', () => {
        const mockResponse = undefined;
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.searchMovies = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'search',
                type: 'PENDING',
            },
            {
                payload: 'Cannot read property \'data\' of undefined',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMoviesPagination('dummySortBy', 'dummyFilter', 'dummySearch', 20))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Cannot read property \'data\' of undefined');
            });
    });
});

describe('moviesActions - async - fetchMovie', () => {
    it('should create FETCH_MOVIE_SUCCESS when fetching movie has been done', () => {
        const mockResponse = { data: 'dummyData' };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.read = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'id',
                type: 'PENDING',
            },
            {
                payload: 'dummyData',
                type: 'FETCH_MOVIE_SUCCESS',
            },
        ];

        return store.dispatch(actions.fetchMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.fetchMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.read = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'id',
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });

    it('should throw and handle error when response is undefined', () => {
        const mockResponse = undefined;
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.read = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: 'id',
                type: 'PENDING',
            },
            {
                payload: 'Cannot read property \'data\' of undefined',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.fetchMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Cannot read property \'data\' of undefined');
            });
    });
});

describe('moviesActions - async - addMovie', () => {
    it('should create ADD_MOVIE_SUCCESS when adding movie has been done', () => {
        const mockResponse = { data: 'dummyData' };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.create = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'dummyData',
                type: 'ADD_MOVIE_SUCCESS',
            },
        ];

        return store.dispatch(actions.addMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.addMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.create = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.addMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });

    it('should throw and handle error when response is undefined', () => {
        const mockResponse = undefined;
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.create = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'Cannot read property \'data\' of undefined',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.addMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Cannot read property \'data\' of undefined');
            });
    });
});

describe('moviesActions - async - editMovie', () => {
    it('should create EDIT_MOVIE_SUCCESS when editing movie has been done', () => {
        const mockResponse = { data: 'dummyData' };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.update = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'dummyData',
                type: 'EDIT_MOVIE_SUCCESS',
            },
        ];

        return store.dispatch(actions.editMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.editMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.update = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.editMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });

    it('should throw and handle error when response is undefined', () => {
        const mockResponse = undefined;
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.update = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'Cannot read property \'data\' of undefined',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.editMovie({}))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Cannot read property \'data\' of undefined');
            });
    });
});

describe('moviesActions - async - deleteMovie', () => {
    it('should create DELETE_MOVIE_SUCCESS when deleting movie has been done', () => {
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve());
        MovieService.remove = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 12345,
                type: 'DELETE_MOVIE_SUCCESS',
            },
        ];

        return store.dispatch(actions.deleteMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            });
    });

    it('should throw and handle error when other movies action is in progress', () => {
        const store = mockStore({ movies: { pending: true } });

        const expectedActions = [];

        return store.dispatch(actions.deleteMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Pending action');
            });
    });

    it('should throw and handle error when movie service rejects the call', () => {
        const mockError = new Error('Something went wrong');
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(mockError));
        MovieService.remove = mockStaticFunction;

        const store = mockStore({ movies: { pending: false } });

        const expectedActions = [
            {
                payload: undefined,
                type: 'PENDING',
            },
            {
                payload: 'Something went wrong',
                type: 'ERROR',
            },
        ];

        return store.dispatch(actions.deleteMovie(12345))
            .then(() => {
                expect(store.getActions())
                    .toEqual(expectedActions);
            })
            .catch((e) => {
                expect(e.message)
                    .toEqual('Something went wrong');
            });
    });
});
