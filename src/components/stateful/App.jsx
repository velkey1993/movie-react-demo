import React, { useMemo } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import TopComponentContainer from '../containers/TopComponentContainer';
import { GenresList } from '../actions/filterAction';
import AppContext from './AppContext';
import ResultContainer from '../containers/ResultContainer';

function App() {
    const genresContext = useMemo(() => ({ genres: GenresList }), []);

    return (
        <>
            <div id='container' className='container'>
                <AppContext.Provider value={genresContext}>
                    <ErrorBoundary>
                        <TopComponentContainer />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <ResultContainer />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
