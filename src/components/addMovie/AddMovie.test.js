import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { CloseButton, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { wait } from '@testing-library/react';
import AddMovie from './AddMovie';
import AppContext from '../stateful/AppContext';
import AddMovieField from '../stateless/AddMovieField';
import MovieService from '../../service/MovieService';

jest.mock('react-toast-notifications');
const addToast = jest.fn();
useToasts.mockReturnValue({ addToast });

jest.mock('../../service/MovieService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Basic AddMovie Component Tests', () => {
    it('should shallow render add movie component', () => {
        const addMovieComponent = shallow(
            <Provider store={mockStore({})}>
                <AddMovie show />
            </Provider>,
        );

        expect(addMovieComponent)
            .toMatchSnapshot();
    });
});

describe('Advanced AddMovie Component Tests', () => {
    const validGenres = {
        genres: [
            'Action',
            'Adventure',
            'Animation',
            'Comedy',
            'Drama',
            'Family',
            'Horror',
            'Mystery',
            'Romance',
            'Science Fiction',
            'Thriller',
            'War',
        ],
    };

    const emptyGenres = { genres: [] };

    const noGenres = {};

    const onHide = jest.fn();

    const componentToTest = {
        title: 'AddMovie',
        html: (show, genres, store) => (
            <AppContext.Provider value={genres}>
                <Provider store={store || mockStore({})}>
                    <AddMovie show={show} onHide={onHide} />
                </Provider>
            </AppContext.Provider>
        ),
    };

    const mountComponent = (show, genres, store) => mount(
        componentToTest.html(show, genres, store),
        { attachTo: document.getElementById('root') },
    );

    beforeEach(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'root');
        document.body.appendChild(div);
    });

    afterEach(() => {
        const div = document.getElementById('root');
        if (div) {
            document.body.removeChild(div);
        }
    });

    it(`${componentToTest.title} should be mounted without crashing`, () => {
        const addMovieComponent = mountComponent(true, validGenres);

        expect(addMovieComponent.find(AddMovie))
            .toHaveLength(1);
        expect(addMovieComponent.find(Modal))
            .toHaveLength(1);
        expect(addMovieComponent.find(Form))
            .toHaveLength(1);
        expect(addMovieComponent.find(AddMovieField))
            .toHaveLength(6);
        expect(addMovieComponent.find('#formGenres')
            .props().children.length)
            .toEqual(12);

        expect(onHide)
            .toHaveBeenCalledTimes(0);

        expect(addMovieComponent)
            .toMatchSnapshot();

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted, changed and reset appropriately`, () => {
        const addMovieComponent = mountComponent(true, validGenres);

        addMovieComponent.find('#formTitle')
            .simulate('change', {
                target: {
                    value: 'Dummy Title',
                    name: 'title',
                },
            });
        addMovieComponent.find('#formReleaseDate')
            .simulate('change', {
                target: {
                    value: '2020-01-04',
                    name: 'release_date',
                },
            });
        addMovieComponent.find('#formPosterPath')
            .simulate('change', {
                target: {
                    value: 'https://dummy-image-url.com/img/1234.jpg',
                    name: 'poster_path',
                },
            });
        addMovieComponent.find('#formGenres')
            .simulate('change', {
                target: {
                    value: 'Dummy Genre',
                    name: 'genres',
                },
            });
        addMovieComponent.find('#formOverview')
            .simulate('change', {
                target: {
                    value: 'Dummy Overview',
                    name: 'overview',
                },
            });
        addMovieComponent.find('#formRuntime')
            .simulate('change', {
                target: {
                    value: 120,
                    name: 'runtime',
                },
            });

        const newTitle = () => addMovieComponent.find('#formTitle')
            .props().value;
        const newReleaseDate = () => addMovieComponent.find('#formReleaseDate')
            .props().value;
        const newPosterPath = () => addMovieComponent.find('#formPosterPath')
            .props().value;
        const newGenres = () => addMovieComponent.find('#formGenres')
            .props().value;
        const newOverview = () => addMovieComponent.find('#formOverview')
            .props().value;
        const newRuntime = () => addMovieComponent.find('#formRuntime')
            .props().value;

        expect(newTitle())
            .toEqual('Dummy Title');
        expect(newReleaseDate())
            .toEqual('2020-01-04');
        expect(newPosterPath())
            .toEqual('https://dummy-image-url.com/img/1234.jpg');
        expect(newGenres())
            .toEqual('Dummy Genre');
        expect(newOverview())
            .toEqual('Dummy Overview');
        expect(newRuntime())
            .toEqual(120);

        addMovieComponent.find('#modal-footer-bt-reset')
            .at(1)
            .simulate('click');

        expect(newTitle())
            .toEqual('Test');
        expect(newReleaseDate())
            .toEqual('2017-12-01');
        expect(newPosterPath())
            .toEqual('https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg');
        expect(newGenres())
            .toEqual(['Drama', 'Fantasy', 'Romance']);
        expect(newOverview())
            .toEqual('An other-worldly story ...');
        expect(newRuntime())
            .toEqual(123);

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted and submitted appropriately`, async () => {
        const store = mockStore({ movies: { pending: false } });
        const addMovieComponent = mountComponent(true, validGenres, store);

        const mockResponse = {
            data: {
                id: 1234,
                title: 'Test',
                release_date: '2017-12-01',
                poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
                genres: [
                    'Drama',
                    'Fantasy',
                    'Romance',
                ],
                overview: 'An other-worldly story ...',
                runtime: 123,
            },
        };
        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.resolve(mockResponse));
        MovieService.create = mockStaticFunction;

        addMovieComponent.find('#modal-footer-bt-submit')
            .at(1)
            .simulate('submit');

        await wait(async () => {
            expect(store.getActions())
                .toEqual([
                    {
                        payload: undefined,
                        type: 'PENDING',
                    },
                    {
                        payload: {
                            id: 1234,
                            title: 'Test',
                            release_date: '2017-12-01',
                            poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
                            genres: [
                                'Drama',
                                'Fantasy',
                                'Romance',
                            ],
                            overview: 'An other-worldly story ...',
                            runtime: 123,
                        },
                        type: 'ADD_MOVIE_SUCCESS',
                    },
                ]);
            expect(onHide)
                .toHaveBeenCalledTimes(1);
            expect(addToast)
                .toHaveBeenCalledWith('Saved Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                });
        });

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted, submitted with network error`, async () => {
        const store = mockStore({ movies: { pending: false } });
        const addMovieComponent = mountComponent(true, validGenres, store);

        const mockStaticFunction = jest.fn();
        mockStaticFunction.mockReturnValue(Promise.reject(new Error('Network error')));
        MovieService.create = mockStaticFunction;

        addMovieComponent.find('#modal-footer-bt-submit')
            .at(1)
            .simulate('submit');

        await wait(async () => {
            expect(store.getActions())
                .toEqual([
                    {
                        payload: undefined,
                        type: 'PENDING',
                    },
                    {
                        error: 'Network error',
                        type: 'ERROR',
                    },
                ]);
            expect(addToast)
                .toHaveBeenCalledWith('Network error', {
                    appearance: 'error',
                    autoDismiss: true,
                });
        });

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted and closed`, () => {
        const addMovieComponent = mountComponent(true, validGenres);

        expect(addMovieComponent.find(AddMovie))
            .toHaveLength(1);
        expect(addMovieComponent.find(Modal))
            .toHaveLength(1);
        expect(addMovieComponent.find(Form))
            .toHaveLength(1);
        expect(addMovieComponent.find(AddMovieField))
            .toHaveLength(6);

        addMovieComponent.find(CloseButton)
            .simulate('click');

        expect(onHide)
            .toHaveBeenCalled();

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted without genres options (empty genres)`, () => {
        const addMovieComponent = mountComponent(true, emptyGenres);

        expect(addMovieComponent.find(AddMovie))
            .toHaveLength(1);
        expect(addMovieComponent.find(Modal))
            .toHaveLength(1);
        expect(addMovieComponent.find(Form))
            .toHaveLength(1);
        expect(addMovieComponent.find(AddMovieField))
            .toHaveLength(6);
        expect(addMovieComponent.find('#formGenres')
            .props().children.length)
            .toEqual(0);

        expect(addMovieComponent)
            .toMatchSnapshot();

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should be mounted without genres options (no genres)`, () => {
        const addMovieComponent = mountComponent(true, noGenres);

        expect(addMovieComponent.find(AddMovie))
            .toHaveLength(1);
        expect(addMovieComponent.find(Modal))
            .toHaveLength(1);
        expect(addMovieComponent.find(Form))
            .toHaveLength(1);
        expect(addMovieComponent.find(AddMovieField))
            .toHaveLength(6);
        expect(addMovieComponent.find('#formGenres')
            .props().children)
            .toEqual(undefined);

        expect(addMovieComponent)
            .toMatchSnapshot();

        addMovieComponent.unmount();
    });

    it(`${componentToTest.title} should not mount Form component`, () => {
        const addMovieComponent = mountComponent(false, validGenres);

        expect(addMovieComponent.find(AddMovie))
            .toHaveLength(1);
        expect(addMovieComponent.find(Modal))
            .toHaveLength(1);
        expect(addMovieComponent.find(Form))
            .toHaveLength(0);
        expect(addMovieComponent.find(AddMovieField))
            .toHaveLength(0);

        expect(addMovieComponent)
            .toMatchSnapshot();

        addMovieComponent.unmount();
    });
});
