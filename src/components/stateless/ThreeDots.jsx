import React from 'react';
import handleKeyDown from '../../utils/handleKeyDown';

const ThreeDots = ({ onClick }) => (
    <div
        tabIndex='0'
        role='button'
        className='dots'
        onClick={onClick}
        onKeyDown={handleKeyDown(onClick, ['Enter', ' '])}
    >
        <strong>&nbsp;&nbsp;⋮&nbsp;&nbsp;</strong>
    </div>
);

export default ThreeDots;
