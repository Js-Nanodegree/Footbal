import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import Typography from '../typography/Typography';
import Badge from './Badge';
import ScoreBlock from './ScoreBlock';
import { matchCardColorMap } from './colorMap';
import { MatchCardProps } from './types';

const CARD_WIDTH = Math.min( Dimensions.get( 'window' ).width - 32, 360 );
const CARD_HEIGHT = 148;

const MatchCard: React.FC<MatchCardProps> = ( {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    league,
    status,
    time,
    stadium,
    isLive,
    badgeText,
    badgeColor,
    variant = 'gradient',
    backgroundLogo,
    homeLabel = 'Home',
    awayLabel = 'Away',
} ) =>
{
    // Фон для разных вариантов
    const renderBackground = () =>
    {
        if ( variant === 'gradient' )
        {
            return (
                <LinearGradient
                    colors={[ '#FF2D7A', '#6C63FF' ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBg}
                />
            );
        }
        if ( variant === 'purple' )
        {
            return <View style={styles.purpleBg} />;
        }
        return <View style={styles.whiteBg} />;
    };

    // Цвета для элементов карточки по variant
    const colorsForVariant = matchCardColorMap[ variant ];
    const textColor = colorsForVariant.text;
    const scoreColor = colorsForVariant.score;
    const badgeBg = colorsForVariant.badgeBg;
    const badgeTextColor = colorsForVariant.badgeText;
    const labelColor = colorsForVariant.label;
    const stadiumColor = colorsForVariant.stadium;
    const badgeTextRound = colorsForVariant.badgeTextRound;

    // Определяем вариант бейджа для текущей карточки
    const badgeVariant = variant === 'white' ? 'solid' : 'outline';
    const badgeStyle = variant === 'white' ? { backgroundColor: colors.badgeBgWhite } : undefined;

    return (
        <View style={styles.cardWrapper}>
            {renderBackground()}
            {/* Эмблема на фоне */}
            {backgroundLogo && (
                <Image source={{ uri: backgroundLogo }} style={styles.bgLogo} resizeMode="contain" />
            )}
            {/* Контент карточки */}
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Typography variant="h2" weight="bold" color={textColor} font="Inter" style={styles.league}>{league}</Typography>
                    {variant === 'white' && isLive && (
                        <Badge text="LIVE" variant={badgeVariant} style={badgeStyle} />
                    )}
                    {variant !== 'white' && isLive && (
                        <Badge text="LIVE" variant={badgeVariant} />
                    )}
                </View>
                <Typography variant="caption" color={textColor} font="Inter" style={styles.week}>{time}</Typography>
                <View style={styles.teamsRow}>
                    <View style={styles.teamBlock}>
                        <Image source={{ uri: homeTeam.logo }} style={styles.logo} />
                        <Typography variant="body" weight="bold" color={textColor} font="Inter" style={styles.teamName}>{homeTeam.name}</Typography>
                        <Typography variant="caption" color={labelColor} font="Inter" style={styles.label}>{homeLabel}</Typography>
                    </View>
                    <ScoreBlock homeScore={homeScore} awayScore={awayScore} backgroundColor={variant === 'white' ? colors.scoreBlockBgWhite : colors.scoreBlockBgGradient} color={scoreColor} />
                    <View style={styles.teamBlock}>
                        <Image source={{ uri: awayTeam.logo }} style={styles.logo} />
                        <Typography variant="body" weight="bold" color={textColor} font="Inter" style={styles.teamName}>{awayTeam.name}</Typography>
                        <Typography variant="caption" color={labelColor} font="Inter" style={styles.label}>{awayLabel}</Typography>
                    </View>
                </View>
                <View style={styles.footerRow}>
                    {badgeText && (
                        <Badge text={badgeText} variant={badgeVariant} />
                    )}
                    <Typography variant="caption" color={stadiumColor} font="Inter" style={styles.stadium}>{stadium}</Typography>
                </View>
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
        marginVertical: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 6,
        backgroundColor: '#fff',
    },
    gradientBg: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
        borderRadius: 20,
    },
    purpleBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.secondary,
        zIndex: 0,
        borderRadius: 20,
    },
    whiteBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
        zIndex: 0,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    bgLogo: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        width: 80,
        height: 80,
        opacity: 0.07,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
        zIndex: 2,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    league: {
        // color: '#fff',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 0.2,
    },
    week: {
        // color: '#fff',
        fontSize: 12,
        marginBottom: 2,
        marginTop: 2,
        fontWeight: '400',
        letterSpacing: 0.1,
    },
    teamsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    teamBlock: {
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 44,
        height: 44,
        marginBottom: 2,
        backgroundColor: '#fff',
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    teamName: {
        fontSize: 13.5,
        // color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 1,
        letterSpacing: 0.1,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    stadium: {
        // color: '#fff',
        fontSize: 12,
        opacity: 0.8,
        fontWeight: '400',
        marginLeft: 8,
        letterSpacing: 0.1,
    },
    label: {
        // color: '#fff',
        fontSize: 11.5,
        fontWeight: '400',
        marginTop: 1,
        letterSpacing: 0.1,
    },
} );

export default MatchCard; 