import React from 'react';
import { withFilter } from '../../utils/Custom';

const ThreeDots = ({ onClick }) => (
    <div
        tabIndex='0'
        role='button'
        className='dots'
        onClick={onClick}
        onKeyDown={withFilter(onClick, 13)}
    >
        <strong>&nbsp;&nbsp;⋮&nbsp;&nbsp;</strong>
    </div>
);

export default ThreeDots;
