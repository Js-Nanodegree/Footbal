import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Typography from '../typography/Typography';
import Button from '../button/Button';

interface ErrorStateProps
{
    message?: string;
    description?: string;
    icon?: 'lock' | 'error' | 'network';
    actionLabel?: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ( {
    message = 'Временная ошибка',
    description = 'Попробуйте обновить страницу или проверьте соединение',
    icon = 'error',
    actionLabel,
    onRetry,
} ) => (
    <View style={styles.container}>
        {/* {icon === 'lock' && (
            <LottieView
                source={require( '../../../assets/lottie/penalty-miss.json' )}
                autoPlay
                loop={false}
                style={{ width: 180, height: 180 }}
            />
        )} */}
        <Typography variant="body" weight="bold" style={{ marginTop: 12 }}>
            {message}
        </Typography>
        {!!description && (
            <Typography variant="caption" color="#888" style={{ marginTop: 4 }}>
                {description}
            </Typography>
        )}
        {onRetry && (
            <Button title={actionLabel || 'Попробовать снова'} onPress={onRetry} style={{ marginTop: 16 }} />
        )}
    </View>
);

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        flex: 1,
    },
} );

export default ErrorState; 