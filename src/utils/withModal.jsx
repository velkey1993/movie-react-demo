import React, { useState, useEffect } from 'react';
import useEscAware from './useEscAware';

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
