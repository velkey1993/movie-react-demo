import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!isFetching) return;
        savedCallback.current();
    }, [isFetching]);

    function isScrolling() {
        if (
            window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight
      || isFetching
        ) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', isScrolling);
        return () => window.removeEventListener('scroll', isScrolling);
    }, []);
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
