import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = ( { message }: { message: string } ) => (
    <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
    </View>
);

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 120,
    },
    text: {
        color: '#888',
        fontSize: 18,
        textAlign: 'center',
    },
} );

export default EmptyState; 