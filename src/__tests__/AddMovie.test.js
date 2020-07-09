import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { Modal } from 'react-bootstrap';
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
    const componentToTest = {
        title: 'AddMovie',
        html: show => (
            <AppContext.Provider value={{
                genres: [{
                    name: 'ALL',
                    value: ['All'],
                }],
            }}
            >
                <Provider store={store}>
                    <AddMovie show={show} />
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

    it(`${componentToTest.title} should be mounted without crashing`, () => {
        const addMovie = mount(componentToTest.html(true), { attachTo: document.getElementById('root') });
        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(1);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(6);
        expect(toJson(addMovie))
            .toMatchSnapshot();
    });

    it(`${componentToTest.title} should not render Form component`, () => {
        const addMovie = mount(componentToTest.html(false));
        expect(addMovie.find(AddMovie))
            .toHaveLength(1);
        expect(addMovie.find(Modal))
            .toHaveLength(1);
        expect(addMovie.find(Form))
            .toHaveLength(0);
        expect(addMovie.find(AddMovieField))
            .toHaveLength(0);
    });
});
