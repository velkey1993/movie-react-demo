import React from 'react';
import withFilter from '../../utils/withFilter';

const CloseButton = ({ close }) => (
    <div role='button' tabIndex={0} className='x-close' onClick={close} onKeyDown={withFilter(close, [13, 27])}>
        ╳
    </div>
);

export default CloseButton;
