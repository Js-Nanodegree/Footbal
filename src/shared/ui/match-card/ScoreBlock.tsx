import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scoreBlockColorMap } from './scoreBlockColorMap';

interface ScoreBlockProps
{
    homeScore: number | string;
    awayScore: number | string;
    backgroundColor?: string;
    color?: string;
    style?: object;
}

const theme = 'light'; // TODO: заменить на динамическую тему при необходимости

const ScoreBlock: React.FC<ScoreBlockProps> = ( { homeScore, awayScore, backgroundColor, color, style } ) =>
{
    const colors = scoreBlockColorMap[ theme ].default;
    const bg = backgroundColor || colors.background;
    const textColor = color || colors.text;
    return (
        <View style={[ styles.scoreBlock, { backgroundColor: bg }, style ]}>
            <Text style={[ styles.score, { color: textColor } ]}>{homeScore}</Text>
            <Text style={[ styles.vs, { color: textColor } ]}>{':'}</Text>
            <Text style={[ styles.score, { color: textColor } ]}>{awayScore}</Text>
        </View>
    );
};

const styles = StyleSheet.create( {
    scoreBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 72,
        justifyContent: 'center',
    },
    score: {
        fontWeight: 'bold',
        fontSize: 32,
        marginHorizontal: 2,
    },
    vs: {
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 2,
        opacity: 0.7,
    },
} );

export default ScoreBlock; 