import { useEffect } from 'react';
import handleKeyDown from './handleKeyDown';

const useEscAware = (callback) => {
    const handleEsc = handleKeyDown(callback, 'Escape');

    useEffect(() => {
        document.addEventListener('keydown', handleEsc, false);
        return () => {
            document.removeEventListener('keydown', handleEsc, false);
        };
    }, [handleEsc]);
};

export default useEscAware;
