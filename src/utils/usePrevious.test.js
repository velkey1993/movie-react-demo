import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './usePrevious';
import React from 'react';
import { mount } from 'enzyme';

test('should return initial value', () => {
    const { result } = renderHook(
        () => usePrevious('Text', 'Initial Text')
    );
    expect(result.current)
        .toBe('Initial Text');
});

describe('usePrevious', () => {
    function Comp() {
        const previous = usePrevious('Text', 'Initial Text');
        return <p id={'prev-paragraph'}>{previous}</p>;
    }

    const wrapper = mount(<Comp/>);

    it('should return initial value', function () {
        let paragraph = wrapper.find('#prev-paragraph')
            .props().children;
        expect(paragraph)
            .toBe('Initial Text');
    });
});
