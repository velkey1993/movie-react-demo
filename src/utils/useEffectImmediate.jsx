import { useEffect, useState } from 'react';

const useEffectImmediate = (callback, deps) => {
    const [isFirstLoad, setFirstLoad] = useState(true);

    if (isFirstLoad) {
        callback && callback();
    }

    useEffect(() => {
        if (!isFirstLoad) {
            return callback && callback();
        } return undefined;
    }, deps);

    useEffect(() => setFirstLoad(false), []);
};

export default useEffectImmediate;
