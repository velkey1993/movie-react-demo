import { useState, useEffect } from 'react';

function extractIfFunction(initialState) {
    return initialState instanceof Function ? initialState() : initialState;
}

function useStateWithLocaleStorage(key, initialState, callbacks) {
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

export default useStateWithLocaleStorage;
