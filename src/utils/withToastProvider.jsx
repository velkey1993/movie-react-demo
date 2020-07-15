import { ToastProvider } from 'react-toast-notifications';
import React from 'react';

const withToastProvider = Component => props => (
    <ToastProvider>
        <Component {...props} />
    </ToastProvider>
);

export default withToastProvider;
