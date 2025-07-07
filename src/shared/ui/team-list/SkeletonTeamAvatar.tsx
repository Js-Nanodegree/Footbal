import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedShimmer from '../shimmer/AnimatedShimmer';

const SkeletonTeamAvatar = () => (
    <View style={styles.container}>
        <AnimatedShimmer style={styles.avatar} borderRadius={24} />
        <AnimatedShimmer style={styles.label} borderRadius={6} />
    </View>
);

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        marginHorizontal: 6,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginBottom: 6,
    },
    label: {
        width: 40,
        height: 12,
        borderRadius: 6,
    },
} );

export default SkeletonTeamAvatar; 