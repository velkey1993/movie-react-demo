import { useEffect } from 'react';
import usePrevious from './usePrevious';

function useEffectOnChange(callback, dep) {
    const previousDep = usePrevious(dep, dep);

    useEffect(() => {
        if (previousDep !== dep) return callback && callback();
        return undefined;
    }, [dep]);
}

export default useEffectOnChange;
