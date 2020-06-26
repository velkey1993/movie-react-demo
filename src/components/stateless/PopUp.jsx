import React from 'react';
import CloseButton from './CloseButton';

const PopUp = ({ openEdit, openDelete, close }) => (
    <>
        <div
            className='x-modal-popup-content'
        >
            <CloseButton close={close} />
            <ul>
                <li onClick={openEdit}>Edit</li>
                <li onClick={openDelete}>Delete</li>
            </ul>
        </div>
    </>
);

export default PopUp;
