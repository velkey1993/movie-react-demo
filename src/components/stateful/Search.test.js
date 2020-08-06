import Search from './Search';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn()
}));

jest.mock('react-toast-notifications');
const addToast = jest.fn();
useToasts.mockReturnValue({ addToast });

describe('Basic Search Component Tests', () => {
    it('should shallow render search component', function () {
        const searchComponent = shallow(
            <Search/>
        );
        expect(searchComponent)
            .toMatchSnapshot();
    });
});

describe('Advanced Search Component Tests', () => {
    it('should be mounted without crashing', function () {
        const searchComponent = mount(
            <Search />
        )

        expect(searchComponent)
            .toMatchSnapshot();

        searchComponent.unmount();
    });
})
