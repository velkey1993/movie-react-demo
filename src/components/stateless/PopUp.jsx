import React from 'react';
import CloseButton from './CloseButton';
import handleKeyDown from '../../utils/handleKeyDown';

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
                        onKeyDown={handleKeyDown(openEdit, ['Enter', ' '])}
                    >
                        Edit
                    </div>
                </li>
                <li>
                    <div
                        tabIndex='0'
                        role='button'
                        onClick={openDelete}
                        onKeyDown={handleKeyDown(openDelete, ['Enter', ' '])}
                    >
                        Delete
                    </div>
                </li>
            </ul>
        </div>
    </>
);

export default PopUp;
