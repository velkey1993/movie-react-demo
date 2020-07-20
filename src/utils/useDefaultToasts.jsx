import { useToasts } from 'react-toast-notifications';

function useDefaultToasts(successMessage) {
    const { addToast } = useToasts();

    return {
        addSuccessToast: msg => addToast(msg || successMessage, { appearance: 'success', autoDismiss: true }),
        addErrorToast: (error) => {
            addToast(error.message,
                { appearance: 'error', autoDismiss: true });
        },
    };
}

export default useDefaultToasts;
