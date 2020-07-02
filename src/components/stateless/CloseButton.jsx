import React from 'react';
import handleKeyDown from '../../utils/handleKeyDown';

const CloseButton = ({ close }) => (
    <div
        role='button'
        tabIndex={0}
        className='x-close'
        onClick={close}
        onKeyDown={handleKeyDown(close, ['Enter', 'Escape', ' '])}
    >
        ╳
    </div>
);

export default CloseButton;
