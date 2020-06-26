import React from 'react';
import CloseButton from './CloseButton';
import { withFilter } from '../../utils/Custom';

const PopUp = ({ openEdit, openDelete, close }) => (
    <>
        <div
            className='x-modal-popup-content'
        >
            <CloseButton close={close} />
            <ul>
                <li>
                    <div
                        tabIndex='0'
                        role='button'
                        onClick={openEdit}
                        onKeyDown={withFilter(openEdit, 13)}
                    >
                        Edit
                    </div>
                </li>
                <li>
                    <div
                        tabIndex='0'
                        role='button'
                        onClick={openDelete}
                        onKeyDown={withFilter(openDelete, 13)}
                    >
                        Delete
                    </div>
                </li>
            </ul>
        </div>
    </>
);

export default PopUp;
