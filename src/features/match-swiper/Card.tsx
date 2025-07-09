import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from 'src/shared/ui/typography/Typography';
import { MatchCardProps } from './types';
import useSvgDownload from './hooks/useSvgDownload';
import { formatDateTime } from 'src/shared/utils/dateFormat';

interface CardProps extends MatchCardProps
{
  index: number;
  currentIndex: number;
  onPress?: () => void;
}

// Определяет цвета градиента по статусу матча
const getGradientByStatus = ( status: string ): string[] =>
{
  switch ( status )
  {
    case 'finished':
      return [ '#8e2de2', '#4a00e0' ]; // Пурпурный → синий
    case 'live':
      return [ '#E32C2C', '#FF9800' ]; // Красный → оранжевый
    case 'scheduled':
      return [ '#757F9A', '#D7DDE8' ]; // Серый → голубой
    case 'postponed':
      return [ '#FFD600', '#757F9A' ]; // Желтый → серый
    default:
      return [ '#E32C2C', '#2C5DE3' ]; // Красный → синий (дефолт)
  }
};

// --- ДОБАВЛЯЕМ: функция для заголовка и объяснения ---
const getHeaderTitle = ( status?: string ) =>
{
  switch ( ( status || '' ).toUpperCase() )
  {
    case 'SCHEDULED':
      return 'Запланирован';
    case 'LIVE':
    case 'IN_PLAY':
      return 'Идёт матч';
    case 'PAUSED':
      return 'Перерыв';
    case 'FINISHED':
      return 'Матч завершён';
    case 'POSTPONED':
      return 'Перенесён';
    case 'SUSPENDED':
      return 'Остановлен';
    case 'CANCELLED':
      return 'Отменён';
    default:
      return 'Матч';
  }
};
const getHeaderSubtitle = ( status?: string ) =>
{
  switch ( ( status || '' ).toUpperCase() )
  {
    case 'LIVE':
      return 'Матч идёт прямо сейчас';
    case 'FINISHED':
      return 'Матч завершён';
    case 'SCHEDULED':
      return 'Матч ещё не начался';
    default:
      return '';
  }
};

const TextComposer = ( {
  title,
  score,
  reverse,
}: {
  title: string;
  score: string;
  reverse: boolean;
} ) =>
{
  if ( typeof score === 'string' && /\d/.test( score ) )
  {
    if ( reverse )
    {
      return (
        <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={{ fontSize: 12 }}>
          {score} :{title}
        </Typography>
      );
    }
    return (
      <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={{ fontSize: 12 }}>
        {title}: {score}
      </Typography>
    );
  }
  return <View />;
};

const Card: React.FC<CardProps> = ( props ) =>
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

  const isCheckNumberExtra = [ rest.score.extraTime?.home, rest.score.extraTime?.away ].every(
    ( item ) => typeof item === 'number',
  );
  const isCheckNumberHalf = [ rest.score.halfTime?.home, rest.score.halfTime?.away ].every(
    ( item ) => typeof item === 'number',
  );
  const isCheckNumberPenalty = [ rest.score.penalties?.home, rest.score.penalties?.away ].every(
    ( item ) => typeof item === 'number',
  );

  return (
    <Pressable style={styles.cardPressable} onPress={onPress}>
      <Animated.View style={[ styles.card, { transform: [ { scale: scaleAnim } ] } ]}>
        {/* Градиент: фирменные цвета приложения (красный/синий) — динамика, спорт, live-акцент */}
        <LinearGradient
          colors={getGradientByStatus( rest.status ?? 'default' )}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {rest.homeTeam.logo && (
          <Image
            source={{ uri: rest.homeTeam.logo }}
            style={[ styles.leagueBgLogo, { left: -40 } ]}
            resizeMode="contain"
          />
        )}
        {rest.awayTeam.logo && (
          <Image
            source={{ uri: rest.awayTeam.logo }}
            style={[ styles.leagueBgLogo, { right: -40 } ]}
            resizeMode="contain"
          />
        )}
        <View style={styles.leagueBlock}>
          {rest.league && (
            <View style={styles.leagueRow}>
              {rest.backgroundLogo && (
                <Image
                  source={{ uri: rest.backgroundLogo }}
                  style={[ { width: 42, height: 42 } ]}
                  resizeMode="contain"
                />
              )}
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
              {formatDateTime( rest.time )}
            </Typography>
          )}
        </View>

        <View style={styles.liveBlock}>
          <Typography
            variant="caption"
            weight="bold"
            font="Oswald"
            color="#fff"
            style={styles.liveText}
          >
            {getHeaderTitle( rest.status )}
          </Typography>
          <View style={styles.liveDot} />
        </View>
        <View style={[ styles.scoreRow, { position: 'absolute', bottom: 80, left: 0, right: 0 } ]}>
          <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={styles.score}>
            {rest.score.fullTime.home || '0'}
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
            {rest.score.fullTime.away || '0'}
          </Typography>
        </View>
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
            style={[ styles.teamName, { textAlign: 'right', marginLeft: 8, flex: 1 } ]}
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
        <View style={[ styles.bottomBlock, { position: 'absolute', bottom: 16, left: 0, right: 0 } ]}>
          {rest.badgeText && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                {isCheckNumberExtra && (
                  <TextComposer title="EXTRA" score={rest?.score?.extraTime?.away || '0'} reverse />
                )}
                {isCheckNumberHalf && (
                  <TextComposer title="HALF" score={rest.score.halfTime?.away || '0'} reverse />
                )}
                {isCheckNumberPenalty && (
                  <TextComposer title="PEN" score={rest?.score?.penalties?.away || '0'} reverse />
                )}
              </View>
              <View style={styles.badge}>
                <Typography
                  variant="body"
                  weight="bold"
                  font="Oswald"
                  color="#1ED760"
                  style={styles.badgeText}
                >
                  {rest?.badgeText}
                </Typography>
              </View>
              <View>
                {isCheckNumberExtra && (
                  <TextComposer title="EXTRA" score={rest.score.extraTime?.away || '0'} />
                )}
                {isCheckNumberHalf && (
                  <TextComposer title="HALF" score={rest.score.halfTime?.away || '0'} />
                )}
                {isCheckNumberPenalty && (
                  <TextComposer title="PEN" score={rest.score.penalties?.away || '0'} />
                )}
              </View>
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

const styles = StyleSheet.create( {
  cardPressable: {
    width: Dimensions.get( 'window' ).width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get( 'window' ).width - 32,
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
    paddingVertical: Math.round( Dimensions.get( 'window' ).width * 0.06 ),
    paddingHorizontal: Math.round( Dimensions.get( 'window' ).width * 0.055 ),
    justifyContent: 'space-between',
  },
  headerBlock: {
    top: Math.round( Dimensions.get( 'window' ).width * 0.06 ),
    left: Math.round( Dimensions.get( 'window' ).width * 0.055 ),
    zIndex: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  leagueBlock: {
    position: 'absolute',
    top: Math.round( Dimensions.get( 'window' ).width * 0.06 ),
    left: Math.round( Dimensions.get( 'window' ).width * 0.055 ),
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
    fontWeight: '500',
    fontSize: 16,
    width: '70%',
  },
  weekText: {
    opacity: 0.85,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: '500',
  },
  liveBlock: {
    position: 'absolute',
    top: Math.round( Dimensions.get( 'window' ).width * 0.06 ),
    right: Math.round( Dimensions.get( 'window' ).width * 0.055 ),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 110,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 20,
  },
  liveText: {
    marginRight: 6,
    textAlign: 'right',
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
  leagueBgLogo: {
    position: 'absolute',
    right: 0,
    bottom: -21,
    width: 160,
    height: 160,
    opacity: 0.08,
    zIndex: 1,
  },
} );

export default React.memo( Card );
