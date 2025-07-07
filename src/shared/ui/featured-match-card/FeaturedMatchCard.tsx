import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
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
} ) =>
{
    return (
        <View style={styles.cardWrapper}>
            <LinearGradient
                colors={[ '#FF2D7A', '#6C63FF' ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
            />
            {/* Фоновая эмблема лиги */}
            {backgroundLogo && (
                <Image
                    source={{ uri: backgroundLogo }}
                    style={styles.bgLogo}
                    resizeMode="contain"
                />
            )}
            <View style={styles.content}>
                {/* Верхняя строка: лига, неделя, LIVE */}
                <View style={styles.headerRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {leagueIcon && (
                            <Image source={{ uri: leagueIcon }} style={{ width: 18, height: 18, marginRight: 6 }} />
                        )}
                        <Typography variant="caption" font="Oswald" weight="bold" style={styles.league}>
                            {league}
                        </Typography>
                    </View>
                    {week && <Typography variant="caption" font="Inter" style={styles.week}>{week}</Typography>}
                    {isLive && (
                        <View style={styles.liveRow}>
                            <Typography variant="caption" font="Inter" weight="bold" style={styles.liveText}>LIVE</Typography>
                            <View style={styles.liveDot} />
                        </View>
                    )}
                </View>
                {/* Команды и счёт */}
                <View style={styles.teamsRow}>
                    <View style={styles.teamBlock}>
                        <Image source={{ uri: homeTeam.logo }} style={styles.teamLogo} />
                        <Typography variant="caption" font="Oswald" weight="bold" style={styles.teamName}>{homeTeam.name}</Typography>
                    </View>
                    <View style={styles.scoreBlock}>
                        <Typography variant="number" font="Oswald" weight="bold" style={styles.score}>{homeScore}</Typography>
                        <Typography variant="caption" font="Oswald" weight="bold" style={styles.vs}>vs</Typography>
                        <Typography variant="number" font="Oswald" weight="bold" style={styles.score}>{awayScore}</Typography>
                    </View>
                    <View style={styles.teamBlock}>
                        <Image source={{ uri: awayTeam.logo }} style={styles.teamLogo} />
                        <Typography variant="caption" font="Oswald" weight="bold" style={styles.teamName}>{awayTeam.name}</Typography>
                    </View>
                </View>
                {/* Бейдж времени */}
                {badgeText && (
                    <View style={styles.badge}>
                        <Typography variant="caption" font="Inter" weight="bold" style={styles.badgeText}>{badgeText}</Typography>
                    </View>
                )}
                {/* Стадион */}
                {stadium && <Typography variant="caption" font="Inter" style={styles.stadium}>{stadium}</Typography>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    cardWrapper: {
        width: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 6,
        backgroundColor: '#fff',
    },
    bgLogo: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 90,
        height: 90,
        opacity: 0.10,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 14,
        zIndex: 2,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    league: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.2,
    },
    week: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 8,
        marginRight: 8,
    },
    liveRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: 4,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF2D7A',
    },
    teamsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    teamBlock: {
        alignItems: 'center',
        flex: 1,
    },
    teamLogo: {
        width: 52,
        height: 52,
        marginBottom: 2,
        backgroundColor: '#fff',
        borderRadius: 26,
        borderWidth: 1.5,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    teamName: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 2,
        letterSpacing: 0.1,
    },
    scoreBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 6,
        minWidth: 80,
        justifyContent: 'center',
        marginHorizontal: 6,
    },
    score: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#fff',
        marginHorizontal: 2,
        fontFamily: 'Oswald-Bold',
    },
    vs: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
        marginHorizontal: 4,
        opacity: 0.7,
        fontFamily: 'Oswald-Bold',
    },
    badge: {
        alignSelf: 'center',
        backgroundColor: '#1ED760',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginTop: 2,
        marginBottom: 2,
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 0.1,
    },
    stadium: {
        color: '#fff',
        fontSize: 13,
        opacity: 0.85,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 2,
        letterSpacing: 0.1,
    },
} );

export default FeaturedMatchCard; 