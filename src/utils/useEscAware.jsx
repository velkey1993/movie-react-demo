import { useEffect } from 'react';
import withFilter from './withFilter';

const useEscAware = (callback) => {
    const handleEsc = withFilter(callback, 27);

    useEffect(() => {
        document.addEventListener('keydown', handleEsc, false);
        return () => {
            document.removeEventListener('keydown', handleEsc, false);
        };
    }, [handleEsc]);
};

export default useEscAware;
