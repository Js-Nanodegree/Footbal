import React, { useRef, useState, useEffect } from 'react';
import
{
    Alert,
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FeaturedMatchCardProps } from '../../shared/ui/featured-match-card/FeaturedMatchCard';
import { MatchCardProps } from '../../shared/ui/match-card/types';
import Typography from '../../shared/ui/typography/Typography';
import { useMatches } from '../team-api/hooks/useMatches';
import useMatchSwiperAnimation from './hooks/useMatchSwiperAnimation';
import { useIsFocused } from '@react-navigation/native';
import SkeletonSwiper from './SkeletonSwiper';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import EmptyState from './EmptyState';

const { width: SCREEN_WIDTH } = Dimensions.get( 'window' );
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_SPACING = -40; // чтобы сзади были видны края следующих карточек
const MAX_CARDS = 15;
const CARD_VERTICAL_PADDING = Math.round( SCREEN_WIDTH * 0.06 ); // ~6% от ширины экрана
const CARD_HORIZONTAL_PADDING = Math.round( SCREEN_WIDTH * 0.055 ); // ~5.5% от ширины экрана

// Маппинг FeaturedMatchCardProps -> MatchCardProps (минимальный для отображения)
const mapFeaturedToMatchCardProps = ( match: FeaturedMatchCardProps ): MatchCardProps => ( {
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    league: match.league,
    status: match.isLive ? 'IN_PLAY' : 'SCHEDULED',
    time: match.week,
    stadium: match.stadium,
    isLive: match.isLive,
    badgeText: match.badgeText,
    variant: 'gradient',
    backgroundLogo: match.backgroundLogo,
} );

// Маппинг Match -> MatchCardProps (для redux/моков)
const mapMatchToMatchCardProps = ( match: any ): MatchCardProps => ( {
    homeTeam: {
        name: match.homeTeam?.name || '',
        logo: match.homeTeam?.crestUrl || '',
    },
    awayTeam: {
        name: match.awayTeam?.name || '',
        logo: match.awayTeam?.crestUrl || '',
    },
    homeScore: match.score?.fullTime?.homeTeam ?? '',
    awayScore: match.score?.fullTime?.awayTeam ?? '',
    league: match.competition?.name || '',
    status: match.status,
    time: match.utcDate,
    stadium: match.stadium || '',
    isLive: match.status === 'IN_PLAY',
    badgeText: match.badgeText || '',
    variant: 'gradient',
    backgroundLogo: match.competition?.emblemUrl || '',
} );

interface MatchSwiperProps
{
    matches?: FeaturedMatchCardProps[];
}

// --- Новый компонент карточки ---
interface MatchSwiperCardProps extends MatchCardProps
{
    index: number;
    currentIndex: number;
    onPress?: () => void;
}

const MatchSwiperCard: React.FC<MatchSwiperCardProps> = ( props ) =>
{
    const { index, currentIndex, onPress, ...rest } = props;
    const scaleAnim = useRef( new Animated.Value( index === currentIndex ? 1 : 0.8 ) ).current;
    useEffect( () =>
    {
        Animated.timing( scaleAnim, {
            toValue: index === currentIndex ? 1 : 0.8,
            duration: 300,
            useNativeDriver: true,
        } ).start();
    }, [ currentIndex, index ] );

    return (
        <Pressable
            style={styles.cardPressable}
            onPress={onPress}
        >
            <Animated.View style={[ styles.card, { transform: [ { scale: scaleAnim } ] } ]}>
                <LinearGradient
                    colors={[ '#E32C2C', '#2C5DE3' ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />
                {/* Верхний блок: лига и неделя */}
                <View style={styles.leagueBlock}>
                    {rest.league && (
                        <View style={styles.leagueRow}>
                            <Text style={styles.leagueIcon}>🏆</Text>
                            <Typography
                                variant="body"
                                weight="bold"
                                font="Oswald"
                                color="#fff"
                                style={styles.leagueText}
                            >
                                {rest.league.split( /\n|\r\n/ )[ 0 ]}
                            </Typography>
                        </View>
                    )}
                    {rest.time && (
                        <Typography
                            variant="caption"
                            weight="regular"
                            font="Oswald"
                            color="#fff"
                            style={styles.weekText}
                        >
                            {rest.time.split( /\n|\r\n/ )[ 0 ]}
                        </Typography>
                    )}
                </View>
                {/* LIVE */}
                {rest.isLive && (
                    <View style={styles.liveBlock}>
                        <Typography
                            variant="caption"
                            weight="bold"
                            font="Oswald"
                            color="#fff"
                            style={styles.liveText}
                        >
                            LIVE
                        </Typography>
                        <View style={styles.liveDot} />
                    </View>
                )}
                {/* Счёт и vs */}
                <View
                    style={[
                        styles.scoreRow,
                        {
                            position: 'absolute',
                            bottom: 100,
                            left: 0,
                            right: 0,
                        },
                    ]}
                >
                    <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={styles.score}>
                        {rest.homeScore}
                    </Typography>
                    <View style={styles.vsCircle}>
                        <Typography
                            variant="body"
                            weight="bold"
                            font="Oswald"
                            color="#fff"
                            style={styles.vsText}
                        >
                            vs
                        </Typography>
                    </View>
                    <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={styles.score}>
                        {rest.awayScore}
                    </Typography>
                </View>
                {/* Названия команд */}
                <View
                    style={[
                        styles.teamsRow,
                        {
                            position: 'absolute',
                            bottom: 40,
                            left: 20,
                            width: '35%',
                            justifyContent: 'flex-end',
                        },
                    ]}
                >
                    <Typography
                        variant="caption"
                        weight="bold"
                        font="Oswald"
                        color="#fff"
                        style={[ styles.teamName, { textAlign: 'right' } ]}
                        numberOfLines={1}
                    >
                        {rest.homeTeam?.name}
                    </Typography>
                </View>
                <View
                    style={[ styles.teamsRow, { position: 'absolute', bottom: 40, right: 20, width: '35%' } ]}
                >
                    <Typography
                        variant="caption"
                        weight="bold"
                        font="Oswald"
                        color="#fff"
                        style={[ styles.teamName, { textAlign: 'left' } ]}
                        numberOfLines={1}
                    >
                        {rest.awayTeam?.name}
                    </Typography>
                </View>
                {/* Бейдж и стадион */}
                <View
                    style={[
                        styles.bottomBlock,
                        {
                            position: 'absolute',
                            bottom: 16,
                            left: 0,
                            right: 0,
                        },
                    ]}
                >
                    {rest.badgeText && (
                        <View style={styles.badge}>
                            <Typography
                                variant="body"
                                weight="bold"
                                font="Oswald"
                                color="#1ED760"
                                style={styles.badgeText}
                            >
                                {rest.badgeText}
                            </Typography>
                        </View>
                    )}
                    {rest.stadium && (
                        <Typography
                            variant="caption"
                            weight="regular"
                            font="Oswald"
                            color="#888"
                            style={styles.stadium}
                        >
                            {rest.stadium}
                        </Typography>
                    )}
                </View>
            </Animated.View>
        </Pressable>
    );
};

const MatchSwiper: React.FC<MatchSwiperProps> = ( { matches } ) =>
{
    // Гарантируем, что matches всегда массив
    const safeMatches = Array.isArray( matches ) ? matches : [];
    let data: MatchCardProps[] = [];
    let loading = false;
    let error: string | null = null;

    if ( safeMatches.length > 0 )
    {
        data = safeMatches.slice( 0, MAX_CARDS ).map( mapFeaturedToMatchCardProps );
    } else
    {
        const matchesHook = useMatches();
        const safeStoreMatches = Array.isArray( matchesHook.matches ) ? matchesHook.matches : [];
        // Используем mapMatchToMatchCardProps для redux/моков
        data = safeStoreMatches
            .filter( ( m: any ) => m && typeof m.homeTeam !== 'undefined' && typeof m.awayTeam !== 'undefined' )
            .slice( 0, MAX_CARDS )
            .map( mapMatchToMatchCardProps );
        loading = matchesHook.loading;
        error = matchesHook.error;
    }

    // Скелетон при загрузке
    if ( loading ) return <View style={styles.container}><SkeletonSwiper /></View>;
    // Ошибка
    if ( error ) return <View style={styles.container}><ErrorState message={error} /></View>;
    // Нет данных
    if ( !data || data.length === 0 ) return <View style={styles.container}><EmptyState message="Нет матчей" /></View>;

    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const flatListRef = useRef( null );

    const onMomentumScrollEnd = ( e: NativeSyntheticEvent<NativeScrollEvent> ) =>
    {
        const offset = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round( offset / CARD_WIDTH );
        setCurrentIndex( newIndex );
    };

    const renderItem = ( { item, index }: { item: MatchCardProps; index: number } ) => (
        <MatchSwiperCard {...item} index={index} currentIndex={currentIndex} onPress={() => Alert.alert( 'Переход на детали матча' )} />
    );

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={( _, i ) => i.toString()}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={CARD_WIDTH}
                decelerationRate={0.92}
                onMomentumScrollEnd={onMomentumScrollEnd}
                style={{ flexGrow: 0 }}
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        minHeight: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardPressable: {
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: SCREEN_WIDTH - 32,
        height: 220,
        borderRadius: 28,
        overflow: 'hidden',
        marginHorizontal: 0,
        backgroundColor: 'transparent',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 36,
        elevation: 0,
        paddingVertical: CARD_VERTICAL_PADDING,
        paddingHorizontal: CARD_HORIZONTAL_PADDING,
        justifyContent: 'space-between',
    },
    leagueBlock: {
        position: 'absolute',
        top: CARD_VERTICAL_PADDING,
        left: CARD_HORIZONTAL_PADDING,
        zIndex: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    leagueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    leagueIcon: {
        fontSize: 22,
        marginRight: 8,
    },
    leagueText: {
        fontWeight: '700',
        fontSize: 20,
    },
    weekText: {
        opacity: 0.85,
        marginBottom: 2,
        fontSize: 12,
        fontWeight: '700',
    },
    liveBlock: {
        position: 'absolute',
        top: CARD_VERTICAL_PADDING,
        right: CARD_HORIZONTAL_PADDING,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        zIndex: 20,
    },
    liveText: {
        marginRight: 6,
        fontSize: 12,
    },
    liveDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E32C2C',
        borderWidth: 2,
        borderColor: '#fff',
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    score: {
        marginHorizontal: 16,
        fontWeight: '700',
        fontSize: 48,
    },
    vsCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.22)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    vsText: {
        fontSize: 16,
        fontWeight: '400',
    },
    teamsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    teamName: {
        textAlign: 'center',
        fontWeight: '600',
        maxWidth: 140,
        flexShrink: 1,
        fontSize: 16,
        color: '#fff',
    },
    bottomBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 6,
    },
    badge: {
        backgroundColor: 'rgba(30,215,96,0.12)',
        borderRadius: 16,
        paddingHorizontal: 22,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderColor: '#1ED760',
        minWidth: 80,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
    },
    stadium: {
        textAlign: 'center',
        opacity: 0.85,
        fontSize: 14,
        marginTop: 6,
        color: '#fff',
    },
} );

export default React.memo( MatchSwiper );
