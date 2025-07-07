import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedShimmer from '../shimmer/AnimatedShimmer';

const TodayMatchCardSkeleton = () => (
    <View style={styles.card}>
        <View style={styles.row}>
            <AnimatedShimmer style={styles.teamName} borderRadius={6} />
            <AnimatedShimmer style={styles.logo} borderRadius={18} />
            <View style={styles.centerBlock}>
                <AnimatedShimmer style={styles.time} borderRadius={6} />
                <AnimatedShimmer style={styles.date} borderRadius={6} />
            </View>
            <AnimatedShimmer style={styles.logo} borderRadius={18} />
            <AnimatedShimmer style={styles.teamName} borderRadius={6} />
        </View>
    </View>
);

const styles = StyleSheet.create( {
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 14,
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 10,
        minHeight: 56,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    teamName: {
        width: 60,
        height: 18,
        borderRadius: 6,
        marginHorizontal: 3,
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginHorizontal: 6,
    },
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    time: {
        width: 40,
        height: 16,
        borderRadius: 6,
        marginBottom: 4,
    },
    date: {
        width: 32,
        height: 12,
        borderRadius: 6,
    },
} );

export default TodayMatchCardSkeleton; 