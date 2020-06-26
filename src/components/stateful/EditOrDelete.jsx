import React, { useState } from 'react';

import './EditOrDelete.css';
import Delete from '../stateless/Delete';
import Edit from './Edit';
import PopUp from '../stateless/PopUp';
import ThreeDots from '../stateless/ThreeDots';

function EditOrDelete({ movie, updateMovie, deleteMovie }) {
    const [state, setState] = useState('closed');
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
                    updateMovie={(movie) => {
                        updateMovie(movie);
                        setState('closed');
                    }}
                    close={() => setState('closed')}
                />
            )}
            {state === 'delete' && (
                <Delete
                    close={() => setState('closed')}
                    deleteMovie={() => {
                        deleteMovie(movie.id);
                        setState('closed');
                    }}
                />
            )}
        </>
    );
}

export default EditOrDelete;
