import React from 'react';
import MultiValueInput from '../stateful/MultiValueInput';
import './MultiValueSelector.css';
import withFilter from '../../utils/withFilter';


const Item = ({ selected, value, onChangeSelect }) => (
    <li>
        <div
            role='option'
            aria-selected={selected}
            tabIndex={0}
            className={`Item${selected ? ' selected' : ''}`}
            onClick={onChangeSelect}
            onKeyDown={withFilter(onChangeSelect, ' ')}
        >
            {value}
        </div>
    </li>
);

const MultiValueSelector = ({ options = [], values = [], onChange }) => (
    <div className='MultiValueSelector'>
        <MultiValueInput onChange={onChange} values={values} />
        <ul>
            {[...new Set([...values, ...options])]
                .sort((a, b) => a.localeCompare(b))
                .map(item => (
                    <Item
                        key={item}
                        value={item}
                        selected={values.includes(item)}
                        onChangeSelect={() => {
                            const list = values.includes(item)
                                ? values.filter(value => value !== item)
                                : [...new Set([...values, item])];
                            onChange(list);
                        }}
                    />
                ))}
        </ul>
    </div>
);

export default MultiValueSelector;
