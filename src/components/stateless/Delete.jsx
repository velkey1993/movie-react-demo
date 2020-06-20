import React from "react";
import CloseButton from "./CloseButton";
import { withModel, useDisableScroll } from "../../utils/Custom";
export const Delete = withModel(({ close, deleteMovie }) => {
    useDisableScroll();
    return (
        <>
            <div className="x-modal-delete-content">
                <CloseButton
                    close={() => {
                        close();
                    }}
                />
                <div className="inner">
                    <h2>DELETE MOVIE</h2>
                    <p>Are you sure you want to delete this movie?</p>
                    <button
                        onClick={() => {
                            deleteMovie();
                        }}
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </>
    );
});
