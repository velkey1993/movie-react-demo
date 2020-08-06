import React, { useMemo } from 'react';
import { useStore } from 'react-redux';
import AppContext from '../components/stateful/AppContext';
import makeGetVisibleGenreFilters from '../redux/visibleFilterGenresSelector';

const withAppContextProvider = Component => (props) => {
    const state = useStore()
        .getState();
    const genresContext = useMemo(
        () => ({ genres: makeGetVisibleGenreFilters()(state, props) }),
        [state, props],
    );
    return (
        <AppContext.Provider value={genresContext}>
            <Component {...props} />
        </AppContext.Provider>
    );
};

export default withAppContextProvider;
