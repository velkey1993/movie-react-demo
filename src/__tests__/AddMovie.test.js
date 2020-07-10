import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import configureStore from 'redux-mock-store';
import { CloseButton, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AddMovie from '../components/stateful/AddMovie';
import AppContext from '../components/stateful/AppContext';
import AddMovieField from '../components/stateless/AddMovieField';

jest.mock('react-toast-notifications');
useToasts.mockReturnValue({});

const mockStore = configureStore([]);
const store = mockStore({});

describe('Basic AddMovie Component Tests', () => {
    it('should shallow render add movie component', () => {
        shallow(
            <Provider store={store}>
                <AddMovie />
            </Provider>,
        );
    });
});

describe('Advanced AddMovie Component Tests', () => {
    const validGenres = {
        genres: [
            {
                name: 'ALL',
                value: ['All'],
            },
            {
                name: 'DOCUMENTARY',
                value: ['Documentary'],
            },
            {
                name: 'COMEDY',
                value: ['Animated Comedy'],
            },
        ],
    };

    const emptyGenres = { genres: [] };

    const noGenres = {};

    const onHide = jest.fn();

    const componentToTest = {
        title: 'AddMovie',
        html: (show, genres) => (
            <AppContext.Provider value={genres}>
                <Provider store={store}>
                    <AddMovie show={show} onHide={onHide} />
                </Provider>
            </AppContext.Provider>
        ),
    };

    beforeEach(() => {
        // Avoid `attachTo: document.body` Warning
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

    function mountComponent(component, show, genres) {
        return mount(component(show, genres), { attachTo: document.getElementById('root') });
    }

    it(`${componentToTest.title} should be mounted without crashing`, () => {
        const addMovie = mountComponent(componentToTest.html, true, validGenres);

        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(1);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(6);

        expect(onHide)
            .toHaveBeenCalledTimes(0);

        expect(addMovie)
            .toMatchSnapshot();

        addMovie.unmount();
    });

    it(`${componentToTest.title} should be mounted and closed`, () => {
        const addMovie = mountComponent(componentToTest.html, true, validGenres);

        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(1);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(6);

        addMovie.find(CloseButton)
            .simulate('click');

        expect(onHide)
            .toHaveBeenCalledTimes(1);

        addMovie.unmount();
    });

    it(`${componentToTest.title} should be mounted without genres options`, () => {
        const addMovie = mountComponent(componentToTest.html, true, emptyGenres);

        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(1);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(6);

        expect(addMovie)
            .toMatchSnapshot();

        addMovie.unmount();
    });

    it(`${componentToTest.title} should not mount Form component`, () => {
        const addMovie = mountComponent(componentToTest.html, false, noGenres);

        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(0);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(0);

        expect(addMovie)
            .toMatchSnapshot();

        addMovie.unmount();
    });
});
