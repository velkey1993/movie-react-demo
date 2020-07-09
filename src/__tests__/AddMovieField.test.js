import { shallow } from 'enzyme';
import React from 'react';
import AddMovieField from '../components/stateless/AddMovieField';

test('shallow renders app component', () => {
    shallow(<AddMovieField />);
});
