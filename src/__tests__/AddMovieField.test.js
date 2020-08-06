import { shallow } from 'enzyme';
import React from 'react';
import AddMovieField from '../components/stateless/AddMovieField';

jest.mock('formik', () => ({
    useField: () => [jest.fn(), jest.fn()],
}));

test('shallow renders app component', () => {
    shallow(<AddMovieField />);
});
