import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Team
{
    name: string;
    logo: string;
}

interface MatchListCardProps
{
    homeTeam: Team;
    awayTeam: Team;
    time: string; // '06:30'
    date: string; // '30 OCT'
    score: string; // '2:1'
    onPress?: () => void;
}

const MatchListCard: React.FC<MatchListCardProps> = ( { homeTeam, awayTeam, time, date, score, onPress } ) =>
{
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            <View style={styles.teamBlock}>
                <Image source={{ uri: homeTeam.logo }} style={styles.teamLogo} />
                <Text style={styles.teamName}>{homeTeam.name}</Text>
            </View>
            <View style={styles.centerBlock}>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.score}>{score}</Text>
            </View>
            <View style={styles.teamBlock}>
                <Image source={{ uri: awayTeam.logo }} style={styles.teamLogo} />
                <Text style={styles.teamName}>{awayTeam.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginVertical: 7,
        marginHorizontal: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    teamBlock: {
        alignItems: 'center',
        flex: 1.2,
    },
    teamLogo: {
        width: 36,
        height: 36,
        marginBottom: 2,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
    },
    teamName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        marginTop: 2,
        maxWidth: 80,
    },
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    time: {
        fontSize: 16,
        color: '#FF2D7A',
        marginBottom: 2,
        fontWeight: '500',
    },
    date: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 4,
    },
} );

export default MatchListCard; 