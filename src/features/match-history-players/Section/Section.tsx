// Section.tsx — UI секция игроков для истории матчей. Мок-данные, два горизонтальных FlatList (домашние/гостевые), анимация появления карточек. Без интеграции с API.

import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import Typography from 'src/shared/ui/typography/Typography';
import { PlayerCard } from '../PlayerCard';
import { useGetTeamDetailsQuery } from 'src/features/team-api/services/footballApi';
import styles from './Section.styles';
import { useTranslation } from 'src/shared/i18n';

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

export interface MatchHistoryPlayersSectionProps {
  match?: any;
  loading?: boolean;
  error?: any;
}

export const MatchHistoryPlayersSection: React.FC<MatchHistoryPlayersSectionProps> = ({ match, loading, error }) => {
  const { t } = useTranslation();
  // Все хуки до любых return!
  const { data: homeTeamDetails, isLoading: isHomeLoading, error: homeError } = useGetTeamDetailsQuery( match?.homeTeam?.id );
  const { data: awayTeamDetails, isLoading: isAwayLoading, error: awayError } = useGetTeamDetailsQuery( match?.awayTeam?.id );

  if (loading) return <Typography>{t('section.loading')}</Typography>;
  if (error) return <Typography>{t('section.error')}</Typography>;
  if (!match) return <Typography>{t('section.noData')}</Typography>;
  if ( isHomeLoading || isAwayLoading ) return <Typography>{t( 'section.loadingTeamComposition' )}</Typography>;
  if ( homeError || awayError ) return <Typography>{t( 'section.errorTeamComposition' )}</Typography>;
  if ( !homeTeamDetails || !awayTeamDetails ) return <Typography>{t( 'section.noTeamData' )}</Typography>;

  const homePlayers = homeTeamDetails.squad || [];
  const awayPlayers = awayTeamDetails.squad || [];
  const homeTeam = { name: homeTeamDetails.name, logo: homeTeamDetails.crest };
  const awayTeam = { name: awayTeamDetails.name, logo: awayTeamDetails.crest };

  const CARD_WIDTH = 200;
  const CARD_MARGIN = 12;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
        <Typography variant="h2" weight="bold" numberOfLines={1} font="Oswald" style={[ styles.sectionTitle, { fontWeight: '800' } ]}>{t('section.teamComposition')}</Typography>
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>{homeTeam.name}</Typography>
      </View>
      <FlatList
        data={homePlayers}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ styles.list, { paddingHorizontal: CARD_MARGIN } ]}
        renderItem={({ item }) => (
          <PlayerCard player={item} clubName={homeTeam.name || ''} clubLogo={homeTeam.logo || ''} variant="home" />
        )}
        ListEmptyComponent={<Typography variant="caption">{t('section.noPlayers')}</Typography>}
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={( _, index ) => ( { length: SNAP_INTERVAL, offset: SNAP_INTERVAL * index, index } )}
      />
      <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>{awayTeam.name}</Typography>
      </View>
      <FlatList
        data={awayPlayers}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ styles.list, { paddingHorizontal: CARD_MARGIN } ]}
        renderItem={({ item }) => (
          <PlayerCard player={item} clubName={awayTeam.name || ''} clubLogo={awayTeam.logo || ''} variant="away" />
        )}
        ListEmptyComponent={<Typography variant="caption">{t('section.noPlayers')}</Typography>}
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={( _, index ) => ( { length: SNAP_INTERVAL, offset: SNAP_INTERVAL * index, index } )}
      />
    </View>
  );
}; 