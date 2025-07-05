import { Notifier } from 'react-native-notifier';
import ErrorNotification from 'src/shared/ui/error-state/ErrorNotification';

type ErrorType = '400' | '403' | '404' | '429' | 'system';

export function showErrorNotification(
    message: string,
    errorType: ErrorType = 'system',
    title?: string,
    options?: {
        time?: string;
        primaryActionLabel?: string;
        onPrimaryAction?: () => void;
        secondaryActionLabel?: string;
        onSecondaryAction?: () => void;
    }
)
{
    Notifier.showNotification( {
        title,
        description: message,
        Component: ErrorNotification,
        componentProps: {
            errorType,
            time: options?.time,
            primaryActionLabel: options?.primaryActionLabel,
            onPrimaryAction: options?.onPrimaryAction,
            secondaryActionLabel: options?.secondaryActionLabel,
            onSecondaryAction: options?.onSecondaryAction,
        },
        duration: 4000,
        hideOnPress: false
    } );
} 