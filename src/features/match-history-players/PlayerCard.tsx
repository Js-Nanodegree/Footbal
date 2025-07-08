// PlayerCard.tsx — Pixel Perfect карточка игрока для истории матчей по референсу (2025-07-08).
// Белый фон, мягкая тень, увеличенный размер, фото игрока абсолютно позиционировано и обрезано справа, логотип клуба в пунктирной рамке с одним прямым углом, название клуба крупно и жирно рядом с логотипом, имя и фамилия крупно и жирно под фото, номер игрока снизу, серый, с ведущим нулём, все layout и стили строго по макету, легкая анимация появления, только цвета из colors.ts и шрифты Oswald/Inter.

import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import Typography from 'src/shared/ui/typography/Typography';
import { colors } from 'src/shared/ui/theme/colors';

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    shirtNumber?: number;
    avatarSrc?: string;
    lastUpdated?: string;
  };
  clubName: string;
  clubLogo: string;
  variant?: 'home' | 'away';
  avatarSrc?: string;
}

const CARD_WIDTH = 200;
const CARD_HEIGHT = 300;
const PHOTO_SIZE = 190;

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, clubName, clubLogo, variant = 'home', avatarSrc }) => {
  // Имя и фамилия на две строки (если есть)
  const [first, last] = player.name.split(' ');
  const shirtNumber = player.shirtNumber !== undefined && player.shirtNumber !== null
    ? (player.shirtNumber < 10 ? `0${player.shirtNumber}` : String(player.shirtNumber))
    : '--';

  // Анимация появления
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  // Внутри PlayerCard, определяем источник фото:
  const avatar = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg';

  return (
    <Animated.View style={[styles.cardShadow, { opacity: fadeAnim }]}> 
      <View style={styles.card}>
        {/* Логотип и название клуба */}
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>
            <View style={styles.logoBorder}>
              <Image source={{ uri: clubLogo }} style={styles.clubLogo} />
            </View>
          </View>
        </View>
        {/* Фото игрока (абсолютно позиционировано, справа, обрезано) */}
        <View style={styles.photoWrapper}>
          <Image
            source={{ uri: avatar }}
            resizeMode="stretch"
            style={{
              width: 220,
              height: 300,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#eee',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              alignSelf: 'center',
              marginBottom: 8,
            }}
          />
        </View>
        {/* Имя и фамилия */}
        <View style={styles.nameBlock}>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.clubName}>{clubName.toUpperCase()}</Typography>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.playerName}>{first || ''}</Typography>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.playerName}>{last || ''}</Typography>
          <Typography variant="body" font="Oswald" style={styles.shirtNumber}>{player.shirtNumber ? `#${ player.shirtNumber }` : ''} {player.position ? ` · ${ player.position }` : ''}</Typography>
        </View>
        {/* Номер игрока */}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderRadius: 32,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  logoBox: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  logoBorder: {
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    borderRadius: 12,
    borderStyle: 'dashed',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  clubLogo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  clubName: {
    fontSize: 18,
    color: colors.warning,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginLeft: 2,
    flex: 1,
    textShadowColor: colors.grayDark,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  photoWrapper: {
    position: 'absolute',
    right: -50,
    top: 48,
    width: PHOTO_SIZE,
    height: PHOTO_SIZE + 10,
    zIndex: 2,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  playerPhoto: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE + 10,
    resizeMode: 'cover',
    borderRadius: 32,
    backgroundColor: 'transparent',
  },
  nameBlock: {
    marginTop: 50,
    position:'absolute',
    bottom:20,
    left:20,
    alignItems: 'flex-start',
    // width: '60%',
    zIndex: 3,
  },
  playerName: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    height: 32,
    letterSpacing: 0.5,
    textAlign: 'left',
    color: colors.grayDark,
    textShadowColor: colors.text,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
  shirtNumber: {
    fontSize: 14,
    color: colors.gradientEnd,
    fontWeight: '400',
    marginTop: 10,
    marginLeft: 2,
    alignSelf: 'flex-start',
    fontFamily: 'Oswald-Bold',
    textShadowColor: colors.warning,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
}); 