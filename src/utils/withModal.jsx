import React, { useState, useEffect } from 'react';
import useEscAware from './useEscAware';

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window?.innerWidth || 0);

    useEffect(() => {
        const resizeHandler = () => {
            setWindowWidth(() => window?.innerWidth || 0);
        };
        window && window.addEventListener('resize', resizeHandler);
        return () => window && window.removeEventListener('resize', resizeHandler);
    }, []);

    return windowWidth;
};

const getScrollWidth = () => {
    if (typeof window !== 'undefined') {
        const documentWidth = document.documentElement.clientWidth;
        const windowWidth = window.innerWidth;
        return windowWidth - documentWidth;
    }
    return 0;
};

const withModal = Component => (props) => {
    const size = useWindowWidth();

    const { close } = props;
    useEscAware(close);

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

export default withModal;
