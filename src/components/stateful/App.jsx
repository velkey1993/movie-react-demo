import React, { useMemo } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import TopComponentContainer from '../containers/TopComponentContainer';
import Result from './Result';
import { GenresList } from '../actions/filterAction';
import AppContext from './AppContext';

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
                        <Result />
                    </ErrorBoundary>
                </AppContext.Provider>
            </div>
        </>
    );
}

export default App;
