import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './EditOrDelete.css';
import Delete from '../stateless/Delete';
import Edit from './Edit';
import PopUp from '../stateless/PopUp';
import ThreeDots from '../stateless/ThreeDots';
import { editMovie as updateMovie, deleteMovie } from '../../redux/moviesActions';
import useDefaultToasts from '../../utils/useDefaultToasts';

function EditOrDelete({ movie }) {
    const dispatch = useDispatch();
    const [state, setState] = useState('closed');
    const addToast = useDefaultToasts();
    return (
        <>
            {state === 'closed' && (
                <ThreeDots onClick={() => setState('open')} />
            )}
            {state === 'open' && (
                <PopUp
                    close={() => setState('closed')}
                    openEdit={() => setState('edit')}
                    openDelete={() => setState('delete')}
                />
            )}
            {state === 'edit' && (
                <Edit
                    movie={movie}
                    updateMovie={data => dispatch(updateMovie(data))}
                    close={() => setState('closed')}
                    addToast={addToast}
                />
            )}
            {state === 'delete' && (
                <Delete
                    deleteMovie={() => dispatch(deleteMovie(movie.id))}
                    close={() => setState('closed')}
                    addToast={addToast}
                />
            )}
        </>
    );
}

export default EditOrDelete;
