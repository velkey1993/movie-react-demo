import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export const useEscAware = (callback) => {
    const escFunction = (callback) => (event) => {
        if (event.keyCode === 27) {
            callback && callback();
        }
    };

    const fun = escFunction(callback);

    useEffect(() => {
        document.addEventListener("keydown", fun, false);
        return () => {
            document.removeEventListener("keydown", fun, false);
        };
    }, [fun]);
};

export const useDisableScroll = () =>
    useEffect(() => {
        const initialOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = initialOverflow;
        };
    }, []);

export const withModel = (Component) => (props) => {
    useEffect(() => {
        ReactDOM.render(
            <div className="block blur container"></div>,
            document.getElementById("blur")
        );
        return () => {
            ReactDOM.render(null, document.getElementById("blur"));
        };
    }, []);
    return <Component {...props} />;
};
