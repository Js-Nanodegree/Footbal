import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedShimmer from 'src/shared/ui/shimmer/AnimatedShimmer';
import { colors } from 'src/shared/ui/theme/colors';

const EmptyState = () => (
    <View style={styles.container}>
        <AnimatedShimmer style={styles.shimmer} borderRadius={32} />
    </View>
);

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 220,
        width: '100%',
        backgroundColor: colors.grayLight,
    },
    shimmer: {
        width: 180,
        height: 180,
        borderRadius: 32,
        backgroundColor: colors.grayMedium,
    },
} );

export default EmptyState; 