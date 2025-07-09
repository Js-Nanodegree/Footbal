import React, { useState } from 'react';
import { View } from 'react-native';
import ErrorState from '../shared/ui/error-state/ErrorState';
import { useTranslation } from 'react-i18next';

const ErrorStateDemoScreen = () =>
{
    const { t } = useTranslation();
    const [ retryCount, setRetryCount ] = useState( 0 );
    return (
        <View style={{ flex: 1 }}>
            <ErrorState message={t('error.retry', { count: retryCount })} onRetry={() => setRetryCount( c => c + 1 )} />
        </View>
    );
};

export default ErrorStateDemoScreen; 