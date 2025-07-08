import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from 'src/shared/ui/typography/Typography';
import { MatchCardProps } from './types';
import useSvgDownload from './hooks/useSvgDownload';

interface CardProps extends MatchCardProps
{
  index: number;
  currentIndex: number;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ( props ) =>
{
  const { index, currentIndex, onPress, ...rest } = props;
  const { downloadSvg } = useSvgDownload();

  useEffect( () =>
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
                  style={[ { width: 42, height: 42,} ]}
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
              {rest.time.split( /\n|\r\n/ )[ 0 ]}
            </Typography>
          )}
        </View>
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
        <View style={[ styles.scoreRow, { position: 'absolute', bottom: 80, left: 0, right: 0 } ]}>
          <Typography variant="h1" weight="bold" font="Oswald" color="#fff" style={styles.score}>
            {rest.homeScore || '0'}
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
            {rest.awayScore || '0'}
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
        <View style={[ styles.bottomBlock, { position: 'absolute', bottom: 16, left: 0, right: 0 } ]}>
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
    fontWeight: '600',
    fontSize: 16,
    width: '70%',
  },
  weekText: {
    opacity: 0.85,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: '700',
  },
  liveBlock: {
    position: 'absolute',
    top: Math.round( Dimensions.get( 'window' ).width * 0.06 ),
    right: Math.round( Dimensions.get( 'window' ).width * 0.055 ),
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
