// Компонент переключения сезона и типа матча (домашняя/гостевая) для экрана истории матчей
// Горизонтальный FlatList сезонов + две кнопки для venue, интеграция с DateSeasonContext
// [ПРАВИЛО] Тесты для этого компонента писать не обязательно, по решению команды.
import React, { useRef } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Button from '../../../shared/ui/button/Button';
import Typography from '../../../shared/ui/typography/Typography';
import { useMatchHistoryQueryState } from './MatchHistoryQueryContext';
import { useGetTeamMatchesQuery, useGetMatchDetailsQuery } from '../../team-api/services/footballApi';
import { skipToken } from '@reduxjs/toolkit/query';

export const DateSeasonSwitcher: React.FC<{ children: React.ReactNode }> = ( { children } ) =>
{
  const { matchId, venue, setVenue } = useMatchHistoryQueryState();
  const { data: match } = useGetMatchDetailsQuery( matchId );

  let teamId = undefined;
  let opponentId = undefined;
  if ( match && match.homeTeam && match.awayTeam )
  {
    if ( venue === 'home' )
    {
      teamId = match.homeTeam.id;
      opponentId = match.awayTeam.id;
    } else
    {
      teamId = match.awayTeam.id;
      opponentId = match.homeTeam.id;
    }
  }
  useGetTeamMatchesQuery( teamId && opponentId ? { teamId, opponentId } : skipToken );

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
        <Typography variant="h2" style={{ marginTop: 12, fontWeight: '700' }}>Тип матча</Typography>
      </View>
      {children}
      <View style={styles.venueRow}>
        <Button
          title="Домашняя"
          variant={venue === 'home' ? 'primary' : 'secondary'}
          onPress={() => setVenue('home')}
          style={styles.button}
          styleText={{
            fontSize: 12,
          }}
        />
        <Button
          title="Гостевая"
          variant={venue === 'away' ? 'primary' : 'secondary'}
          onPress={() => setVenue('away')}
          style={styles.button}
          styleText={{
            fontSize: 12,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#fff', // TODO: заменить на colors.background
  },
  list: {
    gap: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  button: {
    marginHorizontal: 4,
    paddingVertical: 4,
    minHeight: 32,
    height: 32
  },
  venueRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
}); 