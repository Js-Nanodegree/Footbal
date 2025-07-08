import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatsBarProps } from './types';
import { statsBarColorMap } from './colorMap';
import Typography from '../typography/Typography';
import { colors } from '../theme/colors';

const StatsBar: React.FC<StatsBarProps> = ( {
    leftValue,
    rightValue,
    label,
    valueType = 'number',
    leftColor = statsBarColorMap.left,
    rightColor = statsBarColorMap.right,
    backgroundColor = statsBarColorMap.background,
    style,
} ) =>
{
    const leftNum = typeof leftValue === 'string' ? parseFloat( leftValue ) : leftValue;
    const rightNum = typeof rightValue === 'string' ? parseFloat( rightValue ) : rightValue;
    const max = Math.max( leftNum, rightNum, 1 );
    const leftPercent = ( leftNum / max ) * 100;
    const rightPercent = ( rightNum / max ) * 100;

    return (
        <View style={[ styles.root, style ]}>
            <View style={styles.row}>
                <Typography variant="body" style={styles.value} color={leftColor}>
                    {leftValue}
                </Typography>
                <Typography variant="caption" style={styles.label}>
                    {label}
                </Typography>
                <Typography
                    variant="body"
                    style={[ styles.value, { textAlign: 'right' } ]}
                    color={rightColor}
                >
                    {rightValue}
                </Typography>
            </View>
            <View style={styles.barRow}>
                <View style={[ styles.barBg, { backgroundColor } ]}>
                    <View
                        style={[
                            styles.bar,
                            leftPercent > 0 && { width: `${ leftPercent }%` },
                            { backgroundColor: leftColor, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 },
                        ]}
                    />
                </View>
                <View style={[ styles.barBg, { backgroundColor } ]}>
                    <View
                        style={[
                            styles.bar,
                            rightPercent > 0 && { width: `${ rightPercent }%` },
                            { backgroundColor: rightColor, borderTopRightRadius: 6, borderBottomRightRadius: 6 },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    root: {
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    value: {
        minWidth: 36,
        fontWeight: '400',
        fontSize: 12,
    },
    label: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.grayDark,
    },
    barRow: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
    },
    barBg: {
        flex: 1,
        height: 4,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: statsBarColorMap.background,
    },
    bar: {
        height: 5,
    },
} );

export default StatsBar;
