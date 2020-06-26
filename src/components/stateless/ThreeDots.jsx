import React from 'react';

const ThreeDots = ({ onClick }) => (
  <div className='dots' onClick={onClick}>
    <strong>&nbsp;&nbsp;⋮&nbsp;&nbsp;</strong>
  </div>
);

export default ThreeDots;
