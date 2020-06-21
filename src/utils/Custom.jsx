import React, { useState, useEffect, useRef } from "react";
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

export const withModal = (Component) => (props) => {
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

function extractIfFunction(initialState) {
    return initialState instanceof Function ? initialState() : initialState;
}

export function useStateWithLocaleStorage(key, initialState, callbacks) {
    const [value, setValue] = useState(() => {
        const rawItem = localStorage.getItem(key);

        if (rawItem !== "undefined" && rawItem) {
            const item = JSON.parse(rawItem);
            callbacks?.present && callbacks.present(item);
            return item;
        } else {
            callbacks?.missing && callbacks.missing();
            return extractIfFunction(initialState);
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export function usePrevious(value, initialValue) {
    const ref = useRef(initialValue);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
