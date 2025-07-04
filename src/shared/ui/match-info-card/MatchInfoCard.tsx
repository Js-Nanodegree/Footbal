import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MatchInfoCardProps } from './types';
import { matchInfoCardColorMap } from './colorMap';
import Typography from '../typography/Typography';

const MatchInfoCard: React.FC<MatchInfoCardProps> = ( {
    homeTeam,
    awayTeam,
    time,
    date,
    stadium,
    style,
} ) =>
{
    return (
        <View style={[ styles.card, { backgroundColor: matchInfoCardColorMap.background }, style ]}>
            <View style={styles.row}>
                <View style={styles.teamBlock}>
                    <Image source={{ uri: homeTeam.logo }} style={styles.logo} />
                    <Typography variant="body" weight="bold" color={matchInfoCardColorMap.teamName} style={styles.teamName}>{homeTeam.name}</Typography>
                </View>
                <View style={styles.centerBlock}>
                    <Typography variant="body" weight="bold" color={matchInfoCardColorMap.time} style={styles.time}>{time}</Typography>
                    {date && <Typography variant="caption" color={matchInfoCardColorMap.date} style={styles.date}>{date}</Typography>}
                    {stadium && <Typography variant="caption" color={matchInfoCardColorMap.date} style={styles.date}>{stadium}</Typography>}
                </View>
                <View style={styles.teamBlock}>
                    <Typography variant="body" weight="bold" color={matchInfoCardColorMap.teamName} style={styles.teamName}>{awayTeam.name}</Typography>
                    <Image source={{ uri: awayTeam.logo }} style={styles.logo} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    card: {
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    teamBlock: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
        minWidth: 80,
    },
    teamName: {
        marginLeft: 6,
        marginRight: 6,
        maxWidth: 80,
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
    },
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    time: {
        marginBottom: 2,
    },
    date: {
        marginTop: 0,
    },
} );

export default MatchInfoCard; 