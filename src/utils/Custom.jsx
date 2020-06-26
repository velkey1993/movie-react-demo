import React, { useState, useEffect, useRef } from 'react';

export const withFilter = (callback, keyCode, ref) => (event) => {
    if ((!keyCode || event.keyCode === keyCode)) {
        if ((!ref || event.target === ref.current)) {
            callback && callback(event);
        }
    }
};

export const useEscAware = (callback) => {
    const handleEsc = withFilter(callback, 27);

    useEffect(() => {
        document.addEventListener('keydown', handleEsc, false);
        return () => {
            document.removeEventListener('keydown', handleEsc, false);
        };
    }, [handleEsc]);
};

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resizeHandler = () => {
            setWindowWidth(() => window.innerWidth);
        };
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return windowWidth;
};

const getScrollWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    return windowWidth - documentWidth;
};

export const withModal = Component => (props) => {
    const size = useWindowWidth();

    const [resize, setResize] = useState(0);

    useEffect(() => {
        const scrollWidth = getScrollWidth();
        setResize(scrollWidth);
        const originalPadding = document.body.style.paddingRight;
        document.body.style.paddingRight = `${document.body.style.paddingRight + scrollWidth}px`;
        const initialOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.paddingRight = originalPadding;
            document.body.style.overflow = initialOverflow;
        };
    }, [size]);

    return (
        <div
            className='modal-wrapper blur'
            style={{ paddingRight: `${resize}px` }}
        >
            <Component {...props} />
        </div>
    );
};

function extractIfFunction(initialState) {
    return initialState instanceof Function ? initialState() : initialState;
}

export function useStateWithLocaleStorage(key, initialState, callbacks) {
    const [value, setValue] = useState(() => {
        const rawItem = localStorage.getItem(key);

        if (rawItem !== 'undefined' && rawItem) {
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
