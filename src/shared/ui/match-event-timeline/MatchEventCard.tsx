import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MatchEvent } from './types';
import { matchEventColorMap } from './colorMap';
import Typography from '../typography/Typography';

const eventIcons: Record<string, string> = {
    goal: '⚽',
    'yellow-card': '🟨',
    'red-card': '🟥',
    substitution: '🔄',
    'own-goal': '🥅',
    penalty: '🎯',
    other: '•',
};

const MatchEventCard: React.FC<{ event: MatchEvent }> = ( { event } ) =>
{
    const color = matchEventColorMap[event.type] || matchEventColorMap.default;
    return (
        <View style={[ styles.card, { backgroundColor: matchEventColorMap.background } ]}>
            <View style={styles.header}>
                <Typography variant="caption" weight="bold" color={color} style={{ marginRight: 6 }}>
                    {eventIcons[ event.type ] || eventIcons.other}
                </Typography>
                <Typography variant="caption" weight="bold" color={color} style={{ flex: 1 }}>
                    {event.type === 'goal' ? 'GOOOLLL!!!' : event.type === 'yellow-card' ? 'Yellow Card' : event.type === 'substitution' ? 'Substitution' : event.type === 'red-card' ? 'Red Card' : event.type === 'own-goal' ? 'Own Goal' : event.type === 'penalty' ? 'Penalty' : 'Event'}
                </Typography>
                {event.score && (
                    <View style={styles.scoreBlock}>
                        {event.teamLogoLeft && <Image source={{ uri: event.teamLogoLeft }} style={styles.logo} />}
                        <Typography variant="body" weight="bold" style={{ marginHorizontal: 4 }}>{event.score}</Typography>
                        {event.teamLogoRight && <Image source={{ uri: event.teamLogoRight }} style={styles.logo} />}
                    </View>
                )}
            </View>
            {event.player && (
                <View style={styles.playerRow}>
                    {event.player.avatar && <Image source={{ uri: event.player.avatar }} style={styles.avatar} />}
                    <View style={{ flex: 1 }}>
                        <Typography variant="body" weight="bold">{event.player.name}</Typography>
                        <Typography variant="caption" color={matchEventColorMap.default}>
                            {event.player.position} #{event.player.number} • {event.player.team}
                        </Typography>
                    </View>
                </View>
            )}
            {event.assist && (
                <Typography variant="caption" color={matchEventColorMap.assist} style={{ marginTop: 2 }}>
                    Goal Assist: <Typography variant="caption" weight="bold" color={matchEventColorMap.assist}>{event.assist.name}</Typography>
                </Typography>
            )}
            {event.type === 'substitution' && event.inPlayer && event.outPlayer && (
                <View style={{ marginTop: 4 }}>
                    <View style={styles.playerRow}>
                        {event.inPlayer.avatar && <Image source={{ uri: event.inPlayer.avatar }} style={styles.avatar} />}
                        <View style={{ flex: 1 }}>
                            <Typography variant="caption" color={matchEventColorMap.in} style={{ fontWeight: 'bold' }}>IN</Typography>
                            <Typography variant="body" weight="bold">{event.inPlayer.name}</Typography>
                            <Typography variant="caption" color={matchEventColorMap.default}>
                                {event.inPlayer.position} #{event.inPlayer.number} • {event.inPlayer.team}
                            </Typography>
                        </View>
                    </View>
                    <View style={styles.playerRow}>
                        {event.outPlayer.avatar && <Image source={{ uri: event.outPlayer.avatar }} style={styles.avatar} />}
                        <View style={{ flex: 1 }}>
                            <Typography variant="caption" color={matchEventColorMap.out} style={{ fontWeight: 'bold' }}>OUT</Typography>
                            <Typography variant="body" weight="bold">{event.outPlayer.name}</Typography>
                            <Typography variant="caption" color={matchEventColorMap.default}>
                                {event.outPlayer.position} #{event.outPlayer.number} • {event.outPlayer.team}
                            </Typography>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create( {
    card: {
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    scoreBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    logo: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#fff',
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 2,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: '#eee',
    },
} );

export default MatchEventCard; 