import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMMKVNetworkStatus } from '../../memory-bank/mmkvMemoryBank';

const NetworkStatusBar: React.FC = () => {
    const isConnected = useMMKVNetworkStatus();
    if (isConnected) return null;
    return (
        <View style={styles.bar}>
            <Text style={styles.text}>Нет соединения</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 64, // высота таб-бара
        height: 28,
        backgroundColor: '#ff69b4',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 8,
        elevation: 8,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default NetworkStatusBar; 