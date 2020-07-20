import React from 'react';
import CloseButton from './CloseButton';
import withModal from '../../utils/withModal';

const Delete = withModal(({ close, deleteMovie, addToast }) => (
    <>
        <div className='x-modal-delete-content'>
            <CloseButton
                close={close}
            />
            <div className='inner'>
                <h2>DELETE MOVIE</h2>
                <p>Are you sure you want to delete this movie?</p>
                <button
                    type='submit'
                    onClick={() => {
                        deleteMovie()
                            .then(() => addToast.addSuccessToast('Deleted Successfully'))
                            // delete will auto clean the relate movie so this modal will disappear
                            .catch(addToast.addErrorToast);
                    }}
                >
                    CONFIRM
                </button>
            </div>
        </div>
    </>
));

export default Delete;
