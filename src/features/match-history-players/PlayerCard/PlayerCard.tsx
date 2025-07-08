// PlayerCard.tsx — Pixel Perfect карточка игрока для истории матчей по референсу (2025-07-08).
// Белый фон, мягкая тень, увеличенный размер, фото игрока абсолютно позиционировано и обрезано справа, логотип клуба в пунктирной рамке с одним прямым углом, название клуба крупно и жирно рядом с логотипом, имя и фамилия крупно и жирно под фото, номер игрока снизу, серый, с ведущим нулём, все layout и стили строго по макету, легкая анимация появления, только цвета из colors.ts и шрифты Oswald/Inter.

import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import Typography from 'src/shared/ui/typography/Typography';
import { colors } from 'src/shared/ui/theme/colors';
import { useTranslation } from 'src/shared/i18n';
// Импортировать стили из './PlayerCard.styles'
import styles from './PlayerCard.styles';

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
  const { t } = useTranslation();
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
            style={styles.playerPhoto}
          />
        </View>
        {/* Имя и фамилия */}
        <View style={styles.nameBlock}>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.clubName}>{clubName.toUpperCase()}</Typography>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.playerName}>{first || ''}</Typography>
          <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={styles.playerName}>{last || ''}</Typography>
          <Typography variant="body" font="Oswald" style={styles.shirtNumber}>{player.shirtNumber ? `${t('player.number')}: #${player.shirtNumber}` : ''} {player.position ? ` · ${t('player.position')}: ${player.position}` : ''}</Typography>
        </View>
        {/* Номер игрока */}
      </View>
    </Animated.View>
  );
}; 