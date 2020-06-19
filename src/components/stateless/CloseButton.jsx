import React from "react";
import { useEscAware } from "../../utils/Custom";

const CloseButton = ({ close }) => {
    useEscAware(close);
    return (
        <div className="x-close" onClick={close}>
            ╳
        </div>
    );
};

export default CloseButton;
