import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../typography/Typography';

interface Team
{
    crestUrl: string;
    name: string;
    logo: string;
}

export type FeaturedMatchCardProps = {
    score: any;
    competition: any;
    status: string | undefined;
    area: any;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number | string;
    awayScore: number | string;
    league: string;
    leagueIcon?: string;
    week?: string;
    isLive?: boolean;
    badgeText?: string;
    stadium?: string;
    backgroundLogo?: string;
};

const CARD_WIDTH = Math.min( Dimensions.get( 'window' ).width - 32, 360 );
const CARD_HEIGHT = 148;

const FeaturedMatchCard: React.FC<FeaturedMatchCardProps> = ( {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    league,
    leagueIcon,
    week,
    isLive,
    badgeText,
    stadium,
    backgroundLogo,
    area,
    competition,
    status,
    score,
} ) =>
{
    // Анимация появления
    const scaleAnim = React.useRef( new Animated.Value( 0.92 ) ).current;
    const opacityAnim = React.useRef( new Animated.Value( 0 ) ).current;
    React.useEffect( () =>
    {
        Animated.parallel( [
            Animated.timing( scaleAnim, { toValue: 1, duration: 340, useNativeDriver: true } ),
            Animated.timing( opacityAnim, { toValue: 1, duration: 340, useNativeDriver: true } ),
        ] ).start();
    }, [] );

    return (
        <Animated.View style={[ styles.cardWrapper, { transform: [ { scale: scaleAnim } ], opacity: opacityAnim } ]}>
            <LinearGradient
                colors={[ '#E32C2C', '#2C5DE3' ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Watermark-эмблема турнира */}
            {competition?.emblem && (
                <Image
                    source={{ uri: competition.emblem }}
                    style={styles.bgLogo}
                    resizeMode="contain"
                />
            )}
            <View style={styles.content}>
                {/* Турнир и эмблема */}
                <View style={styles.tournamentRow}>
                    {competition?.emblem && (
                        <Image source={{ uri: competition.emblem }} style={styles.tournamentLogo} />
                    )}
                    <Typography variant="caption" font="Oswald" weight="bold" style={styles.tournamentName}>
                        {competition?.name || league}
                    </Typography>
                </View>
                {/* Счёт и логотипы */}
                <View style={styles.scoreRow}>
                    <Image source={{ uri: homeTeam.logo }} style={styles.teamLogoBig} />
                    <Text style={styles.score}>{homeScore}</Text>
                    <View style={styles.vsCircle}><Text style={styles.vsText}>vs</Text></View>
                    <Text style={styles.score}>{awayScore}</Text>
                    <Image source={{ uri: awayTeam.logo }} style={styles.teamLogoBig} />
                </View>
                {/* Названия команд */}
                <View style={styles.teamsRow}>
                    <Text style={styles.teamName}>{homeTeam.name}</Text>
                    <Text style={styles.teamName}>{awayTeam.name}</Text>
                </View>
                {/* Бейдж турнира */}
                {competition?.code && (
                    <View style={styles.badge}><Text style={styles.badgeText}>{competition.code}</Text></View>
                )}
                {/* Страна и дата */}
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{area?.name || '—'}</Text>
                    <Text style={styles.metaText}>{week || ( score?.utcDate ? String( score.utcDate ).slice( 0, 10 ) : '' )}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create( {
    cardWrapper: {
        width: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        borderRadius: 28,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.13,
        shadowRadius: 24,
        elevation: 8,
        backgroundColor: '#fff',
    },
    bgLogo: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 110,
        height: 110,
        opacity: 0.10,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 22,
        paddingVertical: 18,
        zIndex: 2,
        justifyContent: 'space-between',
    },
    tournamentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    tournamentLogo: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    tournamentName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    teamLogoBig: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginHorizontal: 8,
        backgroundColor: '#fff2',
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 8,
    },
    vsCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff3',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    vsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    teamsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    teamName: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
    badge: {
        alignSelf: 'center',
        backgroundColor: '#fff2',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginTop: 8,
    },
    badgeText: {
        color: '#1ED760',
        fontWeight: 'bold',
        fontSize: 14,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    metaText: {
        color: '#fff9',
        fontSize: 12,
    },
} );

export default FeaturedMatchCard; 