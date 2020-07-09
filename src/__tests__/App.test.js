import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/stateful/App';

configure({ adapter: new Adapter() });

test('shallow renders app component', () => {
    shallow(<App />);
});
