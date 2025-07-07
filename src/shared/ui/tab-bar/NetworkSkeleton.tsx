import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View, StyleSheet } from 'react-native';

const NetworkSkeleton: React.FC = () => (
    <View style={styles.container}>
        <SkeletonPlaceholder borderRadius={12} backgroundColor="#f3c1d8" highlightColor="#ffe4f5">
            {[ ...Array( 5 ) ].map( ( _, i ) => (
                <View key={i} style={styles.item}>
                    <View style={styles.avatar} />
                    <View style={styles.textBlock}>
                        <View style={styles.lineShort} />
                        <View style={styles.lineLong} />
                    </View>
                </View>
            ) )}
        </SkeletonPlaceholder>
    </View>
);

const styles = StyleSheet.create( {
    container: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    textBlock: {
        flex: 1,
    },
    lineShort: {
        width: '60%',
        height: 16,
        marginBottom: 8,
    },
    lineLong: {
        width: '90%',
        height: 14,
    },
} );

export default NetworkSkeleton; 