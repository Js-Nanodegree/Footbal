// Section.tsx — UI секция игроков для истории матчей. Мок-данные, два горизонтальных FlatList (домашние/гостевые), анимация появления карточек. Без интеграции с API.

import React from 'react';
import { FlatList, View } from 'react-native';
import { useGetTeamDetailsQuery } from 'src/features/team-api/services/footballApi';
import { useTranslation } from 'src/shared/i18n';
import Typography from 'src/shared/ui/typography/Typography';
import { PlayerCard } from '../PlayerCard';
import styles from './Section.styles';
import { skipToken } from '@reduxjs/toolkit/query';

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

export const MatchHistoryPlayersSection: React.FC<MatchHistoryPlayersSectionProps> = ( {
  match,
  loading,
  error,
} ) =>
{
  const { t } = useTranslation();
  // Все хуки до любых return!
  const {
    data: homeTeamDetails,
    isLoading: isHomeLoading,
    error: homeError,
  } = useGetTeamDetailsQuery( match?.homeTeam?.id ? match.homeTeam.id : skipToken );
  const {
    data: awayTeamDetails,
    isLoading: isAwayLoading,
    error: awayError,
  } = useGetTeamDetailsQuery( match?.awayTeam?.id ? match.awayTeam.id : skipToken );

  if ( !match )
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Typography>{t( 'section.noData' )}</Typography>
      </View>
    );
  if ( isHomeLoading || isAwayLoading )
    return <Typography>{t( 'section.loadingTeamComposition' )}</Typography>;
  if ( homeError || awayError ) return <Typography>{t( 'section.errorTeamComposition' )}</Typography>;
  if ( !homeTeamDetails || !awayTeamDetails )
    return <Typography>{t( 'section.noTeamData' )}</Typography>;

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
        <Typography
          variant="h2"
          weight="bold"
          numberOfLines={1}
          font="Oswald"
          style={[ styles.sectionTitle, { fontWeight: '800' } ]}
        >
          {t( 'section.teamComposition' )}
        </Typography>
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>
          {homeTeam.name}
        </Typography>
      </View>
      <FlatList
        data={homePlayers}
        keyExtractor={( item ) => String( item.id )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ styles.list, { paddingHorizontal: CARD_MARGIN } ]}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            clubName={homeTeam.name || ''}
            clubLogo={homeTeam.logo || ''}
            variant="home"
          />
        )}
        ListEmptyComponent={<Typography variant="caption">{t('section.noPlayers')}</Typography>}
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={( _, index ) => ( {
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        } )}
      />
      <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>
          {awayTeam.name}
        </Typography>
      </View>
      <FlatList
        data={awayPlayers}
        keyExtractor={( item ) => String( item.id )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ styles.list, { paddingHorizontal: CARD_MARGIN } ]}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            clubName={awayTeam.name || ''}
            clubLogo={awayTeam.logo || ''}
            variant="away"
          />
        )}
        ListEmptyComponent={<Typography variant="caption">{t('section.noPlayers')}</Typography>}
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={( _, index ) => ( {
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        } )}
      />
    </View>
  );
};
