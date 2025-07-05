import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Typography from '../typography/Typography';
import Button from '../button/Button';

interface ErrorStateProps
{
    message?: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ( {
    message = 'Временная ошибка',
    onRetry,
} ) => (
    <View style={styles.container}>
        {/* <LottieView
            source={require( '../../../assets/lottie/penalty-miss.json' )}
            autoPlay
            loop={false}
            style={{ width: 180, height: 180 }}
        /> */}
        <Typography variant="h3" weight="bold" style={{ marginTop: 12 }}>
            {message}
        </Typography>
        <Typography variant="caption" color="#888" style={{ marginTop: 4 }}>
            Попробуйте обновить страницу или проверьте соединение
        </Typography>
        {onRetry && (
            <Button title="Попробовать снова" onPress={onRetry} style={{ marginTop: 16 }} />
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