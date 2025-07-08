import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/roads/RootNavigator';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useRef, useState } from 'react';
import
{
    Animated,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import { FeaturedMatchCardProps } from '../../shared/ui/featured-match-card/FeaturedMatchCard';
import { MatchCardProps } from '../../shared/ui/match-card/types';
import Typography from '../../shared/ui/typography/Typography';
import { footballApi, statusMatches } from '../team-api/services/footballApi';
import EmptyState from './EmptyState';
import SkeletonSwiper from './SkeletonSwiper';
import { formatDateTime } from 'src/shared/utils/dateFormat';

const { width: SCREEN_WIDTH } = Dimensions.get( 'window' );
const CARD_WIDTH = SCREEN_WIDTH;
const MAX_CARDS = 15;
const CARD_VERTICAL_PADDING = Math.round( SCREEN_WIDTH * 0.06 ); // ~6% от ширины экрана
const CARD_HORIZONTAL_PADDING = Math.round( SCREEN_WIDTH * 0.055 ); // ~5.5% от ширины экрана

// Маппинг FeaturedMatchCardProps -> MatchCardProps (минимальный для отображения)
const mapFeaturedToMatchCardProps = ( match: FeaturedMatchCardProps ): MatchCardProps => ( {
    homeTeam: {
        name: match.homeTeam?.name || '',
        logo:
            typeof ( match.homeTeam as any )?.crest === 'string'
                ? ( match.homeTeam as any ).crest
                : match.homeTeam?.logo || '',
    },
    awayTeam: {
        name: match.awayTeam?.name || '',
        logo:
            typeof ( match.awayTeam as any )?.crest === 'string'
                ? ( match.awayTeam as any ).crest
                : match.awayTeam?.logo || '',
    },
    homeScore: match.score?.fullTime?.homeTeam ?? '',
    awayScore: match.score?.fullTime?.awayTeam ?? '',
    league: match.competition?.name,
    status: match.status,
    time: match.utcDate ? formatDateTime( match.utcDate ) : match.week, // форматируем дату, если есть utcDate
    stadium: match.area?.name,
    isLive: match.status === statusMatches.LIVE,
    badgeText: match.competition?.code,
    variant: 'gradient',
    backgroundLogo: match.competition?.emblem,
} );

// Универсальный геттер счёта: ищет по fullTime, halfTime, extraTime, penalties
function getScore( score: any, type: 'home' | 'away' )
{
    if ( !score ) return '-';
    if ( score.fullTime && score.fullTime[ type ] != null ) return score.fullTime[ type ];
    if ( score.halfTime && score.halfTime[ type ] != null ) return score.halfTime[ type ];
    if ( score.extraTime && score.extraTime[ type ] != null ) return score.extraTime[ type ];
    if ( score.penalties && score.penalties[ type ] != null ) return score.penalties[ type ];
    return '-';
}

// Маппинг Match -> MatchCardProps (для redux/моков)
const mapMatchToMatchCardProps = ( match: any ): MatchCardProps =>
{
    const isFinished = match.status === 'FINISHED';
    return {
        homeTeam: {
            name: match.homeTeam?.name || '',
            logo:
                typeof ( match.homeTeam as any )?.crest === 'string'
                    ? ( match.homeTeam as any ).crest
                    : match.homeTeam?.logo || '',
        },
        awayTeam: {
            name: match.awayTeam?.name || '',
            logo:
                typeof ( match.awayTeam as any )?.crest === 'string'
                    ? ( match.awayTeam as any ).crest
                    : match.awayTeam?.logo || '',
        },
        homeScore: isFinished ? getScore( match.score, 'home' ) : '-',
        awayScore: isFinished ? getScore( match.score, 'away' ) : '-',
        league: match.competition?.name || '',
        status: match.status,
        time: match.utcDate ? formatDateTime( match.utcDate ) : match.week, // форматируем дату, если есть utcDate
        stadium: match.area?.name || '',
        isLive: match.status === statusMatches.LIVE,
        badgeText: match.competition?.code || '',
        variant: 'gradient',
        backgroundLogo: match.competition?.emblem || '',
    };
};

interface MatchSwiperProps
{
    matches?: FeaturedMatchCardProps[];
    selectedMatchId?: number;
    initialMatchId?: number; // Новый проп для автоскролла
    onMatchPress?: ( match: any ) => void;
}

// --- Новый компонент карточки ---
interface MatchSwiperCardProps extends MatchCardProps
{
    index: number;
    currentIndex: number;
    onPress?: () => void;
    isSelected?: boolean;
}

const useSvgDownload = () =>
{
    const [ svg, setSvg ] = useState<{ [ x: string ]: string }>( {} );
    return {
        downloadSvg: async ( url: string, name: string ) =>
        {
            const response = await fetch( url );
            const text = await response.text();
            setSvg( { ...svg, [ url ]: text } );
            return svg;
        },
        svg,
    };
};

const MatchSwiperCard: React.FC<MatchSwiperCardProps> = ( props ) =>
{
    const { index, currentIndex, onPress, ...rest } = props;

    const { downloadSvg, svg } = useSvgDownload();

    React.useEffect( () =>
    {
        if ( rest.homeTeam?.logo ) downloadSvg( rest.homeTeam.logo, 'homeTeam' );
        if ( rest.awayTeam?.logo ) downloadSvg( rest.awayTeam.logo, 'awayTeam' );
    }, [ rest.homeTeam?.logo, rest.awayTeam?.logo ] );

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
        <Pressable style={styles.cardPressable} onPress={onPress}>
            <Animated.View style={[ styles.card, { transform: [ { scale: scaleAnim } ] } ]}>
                <LinearGradient
                    colors={[ '#E32C2C', '#2C5DE3' ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />
                {/* Эмблема лиги на фоне */}
                {rest.backgroundLogo && (
                    <Image
                        source={{ uri: rest.backgroundLogo }}
                        style={styles.leagueBgLogo}
                        resizeMode="contain"
                    />
                )}
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
                            bottom: 80,
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
                {/* Названия и эмблемы команд */}
                <View
                    style={[
                        styles.teamsRow,
                        {
                            position: 'absolute',
                            bottom: 10,
                            left: 20,
                            width: '35%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexDirection: 'row',
                        },
                    ]}
                >
                    <Typography
                        variant="caption"
                        weight="bold"
                        font="Oswald"
                        color="#fff"
                        style={[ styles.teamName, { textAlign: 'right', marginLeft: 8 } ]}
                        numberOfLines={1}
                    >
                        {rest.homeTeam?.name}
                    </Typography>
                </View>
                <View
                    style={[
                        styles.teamsRow,
                        {
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            width: '35%',
                            flexDirection: 'row',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <View style={{ position: 'absolute', zIndex: 100 }}>
                        <Typography
                            variant="caption"
                            weight="bold"
                            font="Oswald"
                            color="#fff"
                            style={[ styles.teamName, { textAlign: 'left', marginRight: 8 } ]}
                            numberOfLines={1}
                        >
                            {rest.awayTeam?.name}
                        </Typography>
                    </View>
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

const MatchSwiper: React.FC<MatchSwiperProps> = ( {
    matches,
    selectedMatchId,
    initialMatchId,
    onMatchPress,
} ) =>
{
    // const { selectedLeagueId } = useAppContext(); // не используется
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MatchHistory'>>();
    let data: MatchCardProps[] = [];
    let loading = false;
    let error: string | null = null;

    if ( matches && matches.length > 0 )
    {
        data = matches.slice( 0, MAX_CARDS ).map( ( m: any ) =>
        {
            // Если матч уже приведён к MatchCardProps (есть homeScore/awayScore), не адаптируем повторно
            if ( typeof m.homeScore !== 'undefined' && typeof m.awayScore !== 'undefined' )
            {
                return m;
            }
            // Если матч "сырой" (из API), адаптируем
            return mapMatchToMatchCardProps( m );
        } );
    } else
    {
        // Получаем code лиги по selectedLeagueId (если есть)
        const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {} );
        const league = competitions?.find( ( c ) => c.id === matches?.[ 0 ]?.competition?.id );
        const leagueCode = league?.code || '';
    // Получаем матчи только если есть selectedLeagueId
        const {
            data: rtkMatches,
            isLoading,
            error: rtkError,
        } = footballApi.endpoints.getLiveMatches.useQuery(
            leagueCode ? { competitionId: leagueCode, status: statusMatches.LIVE } : skipToken,
        );
        const safeStoreMatches = Array.isArray( rtkMatches ) ? rtkMatches : [];
        data = safeStoreMatches
            .filter(
                ( m: any ) => m && typeof m.homeTeam !== 'undefined' && typeof m.awayTeam !== 'undefined',
            )
            .map( mapMatchToMatchCardProps );
        loading = isLoading;
        error = rtkError ? ( typeof rtkError === 'string' ? rtkError : 'Ошибка загрузки матчей' ) : null;
    }

  // Скелетон при загрузке
    if ( loading )
        return (
            <View style={styles.container}>
                <SkeletonSwiper />
            </View>
        );
  // Ошибка
    if ( error )
        return (
            <View style={styles.container}>
                <ErrorState message={error} />
            </View>
        );
  // Нет данных
    if ( !data || data.length === 0 )
        return (
            <View style={styles.container}>
                <EmptyState message="Нет матчей" />
            </View>
        );

    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const flatListRef = useRef( null );
    const safeMatches: any[] = Array.isArray( matches ) ? matches : [];

  // Автоскролл к initialMatchId при первом рендере
    useEffect( () =>
    {
        if ( typeof initialMatchId === 'number' && safeMatches.length > 0 )
        {
            const idx = safeMatches.findIndex( ( m ) => m.id === initialMatchId );
            if ( idx >= 0 && flatListRef.current )
            {
                // @ts-ignore
                flatListRef.current.scrollToIndex( { index: idx, animated: false } );
                setCurrentIndex( idx );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ initialMatchId, safeMatches.length ] );

  // Скроллим к выбранному матчу при смене selectedMatchId (но не при первом рендере)
    useEffect( () =>
    {
        if ( selectedMatchId && safeMatches.length > 0 )
        {
            const idx = safeMatches.findIndex( ( m ) => m.id === selectedMatchId );
            if ( idx >= 0 && flatListRef.current )
            {
                // @ts-ignore
                flatListRef.current.scrollToIndex( { index: idx, animated: true } );
                setCurrentIndex( idx );
            }
        }
    }, [ selectedMatchId, safeMatches.length ] );

    const onMomentumScrollEnd = ( e: NativeSyntheticEvent<NativeScrollEvent> ) =>
    {
        const offset = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round( offset / CARD_WIDTH );
        setCurrentIndex( newIndex );
    };

    const handleCardPress = ( index: number ) =>
    {
        if ( safeMatches[ index ] && typeof safeMatches[ index ].id !== 'undefined' )
        {
            if ( onMatchPress )
            {
                onMatchPress( safeMatches[ index ] );
            } else
            {
                navigation.navigate( 'MatchHistory', {
                    matchId: safeMatches[ index ].id,
                    homeId: safeMatches[ index ].homeTeam?.id,
                    awayId: safeMatches[ index ].awayTeam?.id,
                    venue: 'home',
                } );
            }
        }
    };

    const renderItem = ( { item, index }: { item: MatchCardProps; index: number } ) => (
        <MatchSwiperCard
            {...item}
            index={index}
            currentIndex={currentIndex}
            onPress={() => handleCardPress( index )}
            isSelected={Boolean( selectedMatchId && safeMatches[ index ]?.id === selectedMatchId )}
        />
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
    teamLogo: {
        width: 44,
        height: 44,
        position: 'absolute',
        bottom: 12,
        zIndex: 10,
        borderRadius: 22,
    },
    leagueBgLogo: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 80,
        height: 80,
        opacity: 0.08,
        zIndex: 1,
    },
} );
export { default } from './index';
