// Section.tsx — UI секция игроков для истории матчей. Мок-данные, два горизонтальных FlatList (домашние/гостевые), анимация появления карточек. Без интеграции с API.

import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import Typography from 'src/shared/ui/typography/Typography';
import { PlayerCard } from './PlayerCard';

const mockHomePlayers = [
  {
    id: 1,
    name: 'KURT ZOUMA',
    firstName: 'Kurt',
    lastName: 'Zouma',
    position: 'Defender',
    shirtNumber: 5,
    avatarSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastUpdated: '',
  },
  {
    id: 3,
    name: 'JORDAN PICKFORD',
    firstName: 'Jordan',
    lastName: 'Pickford',
    position: 'Goalkeeper',
    shirtNumber: 1,
    avatarSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastUpdated: '',
  },
];
const mockAwayPlayers = [
  {
    id: 2,
    name: 'LUCAS DIGNE',
    firstName: 'Lucas',
    lastName: 'Digne',
    position: 'Defender',
    shirtNumber: 10,
    avatarSrc: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastUpdated: '',
  },
  {
    id: 4,
    name: 'AARON RAMSDALE',
    firstName: 'Aaron',
    lastName: 'Ramsdale',
    position: 'Goalkeeper',
    shirtNumber: 1,
    avatarSrc: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastUpdated: '',
  },
];
const homeTeam = {
  name: 'Everton',
  logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
};
const awayTeam = {
  name: 'Arsenal',
  logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
};

// Типизация пропсов для AnimatedPlayerCard
interface AnimatedPlayerCardProps {
  player: any;
  clubName: string;
  clubLogo: string;
  variant: 'home' | 'away';
}

const AnimatedPlayerCard: React.FC<AnimatedPlayerCardProps> = ({ player, clubName, clubLogo, variant }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <PlayerCard player={player} clubName={clubName} clubLogo={clubLogo} variant={variant} avatarSrc={player.avatarSrc} />
    </Animated.View>
  );
};

export interface MatchHistoryPlayersSectionProps {
  match?: any;
  loading?: boolean;
  error?: any;
}

export const MatchHistoryPlayersSection: React.FC<MatchHistoryPlayersSectionProps> = ({ match, loading, error }) => {
  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка загрузки</Typography>;
  if (!match) return <Typography>Нет данных</Typography>;

  const homePlayers = match.homeTeam?.lineup || [];
  const awayPlayers = match.awayTeam?.lineup || [];
  const homeTeam = { name: match.homeTeam?.name, logo: match.homeTeam?.crest };
  const awayTeam = { name: match.awayTeam?.name, logo: match.awayTeam?.crest };

  return (
    <View style={styles.container}>
      <Typography variant="h2" weight="bold" style={styles.sectionTitle}>Домашние</Typography>
      <FlatList
        data={homePlayers}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AnimatedPlayerCard player={item} clubName={homeTeam.name} clubLogo={homeTeam.logo} variant="home" />
        )}
        ListEmptyComponent={<Typography variant="caption">Нет игроков</Typography>}
      />
      <Typography variant="h2" weight="bold" style={styles.sectionTitle}>Гостевые</Typography>
      <FlatList
        data={awayPlayers}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AnimatedPlayerCard player={item} clubName={awayTeam.name} clubLogo={awayTeam.logo} variant="away" />
        )}
        ListEmptyComponent={<Typography variant="caption">Нет игроков</Typography>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 24, marginBottom: 32 },
  sectionTitle: { marginLeft: 12, marginBottom: 8 },
  list: { paddingHorizontal: 4, marginBottom: 20 },
}); 