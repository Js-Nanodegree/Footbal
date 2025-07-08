import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedShimmer from '../shimmer/AnimatedShimmer';
import { colors } from '../theme/colors';

const shimmerColors = [colors.grayLight, colors.grayMedium, colors.grayLight, '#f8f8fa'];

const TodayMatchCardSkeleton = () => (
    <View style={styles.cardShadow}>
        <View style={styles.card}>
            <AnimatedShimmer style={styles.teamNameLeft} borderRadius={12} colors={shimmerColors} />
            <AnimatedShimmer style={styles.logo} borderRadius={20} colors={shimmerColors} />
            <View style={styles.centerBlock}>
                <AnimatedShimmer style={styles.time} borderRadius={8} colors={shimmerColors} />
                <AnimatedShimmer style={styles.date} borderRadius={8} colors={shimmerColors} />
            </View>
            <AnimatedShimmer style={styles.logo} borderRadius={20} colors={shimmerColors} />
            <AnimatedShimmer style={styles.teamNameRight} borderRadius={12} colors={shimmerColors} />
        </View>
    </View>
);

const styles = StyleSheet.create( {
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
        borderRadius: 24,
        marginVertical: 12,
        backgroundColor: 'transparent',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 18,
        paddingHorizontal: 18,
        minHeight: 64,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    teamNameLeft: {
        flex: 1.2,
        width: 70,
        height: 18,
        borderRadius: 12,
        marginRight: 3,
        maxWidth: 90,
        backgroundColor: colors.grayLight,
    },
    teamNameRight: {
        flex: 1.2,
        width: 70,
        height: 18,
        borderRadius: 12,
        marginLeft: 3,
        maxWidth: 90,
        backgroundColor: colors.grayLight,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 6,
        backgroundColor: colors.grayLight,

    },
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,

    },
    time: {
        width: 48,
        height: 16,
        borderRadius: 8,
        marginBottom: 4,
        backgroundColor: colors.grayLight,

    },
    date: {
        width: 40,
        height: 12,
        borderRadius: 8,
        backgroundColor: colors.grayLight,

    },
} );

export default TodayMatchCardSkeleton; 