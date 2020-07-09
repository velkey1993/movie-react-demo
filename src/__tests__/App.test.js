import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/stateful/App';

test('shallow renders app component', () => {
    shallow(<App />);
});
