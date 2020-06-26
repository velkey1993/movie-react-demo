import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import usePrevious from '../../utils/usePrevious';

const deserializer = str => str
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length !== 0);

const serializer = values => values.join(', ');

const MultiValueInput = ({ values = [], onChange }) => {
    const [text, setText] = useState(serializer(values));
    const previousText = usePrevious(text, text);
    useEffect(() => {
        setText(serializer(values));
    }, [values]);

    useEffect(() => {
        const previousMultiValues = deserializer(previousText);
        const currentMultiValues = deserializer(text);

        if (!_.isEqual(previousMultiValues, currentMultiValues)) {
            onChange(currentMultiValues);
        }
    }, [text, onChange, previousText]);

    return (
        <input
            className='MultiValueInput'
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={() => setText(input => serializer(deserializer(input)))}
        />
    );
};

export default MultiValueInput;
