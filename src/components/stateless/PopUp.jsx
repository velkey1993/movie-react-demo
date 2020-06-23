import React from "react";
import CloseButton from "./CloseButton";
export const PopUp = ({ openEdit, openDelete, close }) => {
    return (
        <>
            <div className="block"></div>
            <div className="x-modal-popup-content">
                <CloseButton close={close} />
                <ul>
                    <li onClick={openEdit}>Edit</li>
                    <li onClick={openDelete}>Delete</li>
                </ul>
            </div>
        </>
    );
};
