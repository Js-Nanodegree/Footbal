import React, { useState } from 'react';
import { View } from 'react-native';
import ErrorState from '../shared/ui/error-state/ErrorState';

const ErrorStateDemoScreen = () =>
{
    const [ retryCount, setRetryCount ] = useState( 0 );
    return (
        <View style={{ flex: 1 }}>
            <ErrorState message={`Ошибка! Попыток: ${ retryCount }`} onRetry={() => setRetryCount( c => c + 1 )} />
        </View>
    );
};

export default ErrorStateDemoScreen; 