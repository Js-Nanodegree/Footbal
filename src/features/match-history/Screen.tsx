// Экран истории очных матчей: секции собираются через SectionList, все параметры берутся из navigation params, DateSeasonProvider и DateSeasonSwitcher больше не используются
// [ПРАВИЛО] Тесты для этого экрана писать не обязательно, по решению команды.
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/roads/RootNavigator';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useMemo, useCallback } from 'react';
import { Alert, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { usePullToRefresh } from 'src/shared/hooks/usePullToRefresh';
import {
  useGetMatchDetailsQuery,
  useGetTeamMatchesQuery,
  footballApi,
} from '../../features/team-api/services/footballApi';
import MatchSwiperSection from '../home-screen/components/MatchSwiperSection';
import { MatchHistoryPlayersSection } from '../match-history-players/Section';
import { MatchHistoryStatsSection } from '../match-history-stats/Section';
import { MatchHistoryItem } from '../team-api/types/match';
import { adaptSeasonMatchesToMatch } from './adapters';
import Typography from 'src/shared/ui/typography/Typography';
import { colors } from 'src/shared/ui/theme/colors';
import { DateFormatAdapter } from './adapters';
import Header from 'src/shared/ui/header/Header';
import { useMatchHistoryParams } from './hooks/useMatchHistoryParams';

const MatchHistoryScreenContent: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MatchHistory'>>();
  const { matchId, venue, homeId, awayId, season } = useMatchHistoryParams();
  const isValid = !!matchId && !!homeId && !!awayId;
  const { data: match, refetch: refetchMatch } = useGetMatchDetailsQuery(
    isValid ? matchId : skipToken,
  );
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Меморизация вычисления teamId и opponentId
  const { teamId, opponentId } = { teamId: homeId, opponentId: awayId };

  // DEBUG: логируем параметры для диагностики
  console.log(
    'matchId:',
    matchId,
    'homeId:',
    homeId,
    'awayId:',
    awayId,
    'venue:',
    venue,
    'teamId:',
    teamId,
    'opponentId:',
    opponentId,
  );

  const { data: matches, refetch: refetchMatches } = useGetTeamMatchesQuery(
    teamId && opponentId ? { teamId, opponentId } : skipToken,
  );

  useFocusEffect(
    useCallback(() => {
      if (isValid && typeof refetchMatch === 'function') refetchMatch();
      if (teamId && opponentId) {
        dispatch(
          footballApi.endpoints.getTeamMatches.initiate(
            { teamId, opponentId },
            { forceRefetch: true },
          ),
        );
      }
    }, [isValid, teamId, opponentId, refetchMatch]),
  );

  const onRefresh = useCallback(() => {
    if (isValid && typeof refetchMatch === 'function') refetchMatch();
    if (teamId && opponentId) {
      dispatch(
        footballApi.endpoints.getTeamMatches.initiate(
          { teamId, opponentId },
          { forceRefetch: true },
        ),
      );
    }
  }, [dispatch, isValid, teamId, opponentId, refetchMatch]);

  const { refreshControl } = usePullToRefresh({ onRefresh });

  // Группируем матчи по сезону и сортируем по дате
  const matchesBySeason: Record<string, any[]> = {};
  (matches || []).forEach((m: any) => {
    const seasonKey = m.season?.startDate?.slice(0, 4) + '/' + m.season?.endDate?.slice(0, 4);
    if (!matchesBySeason[seasonKey]) matchesBySeason[seasonKey] = [];
    matchesBySeason[seasonKey].push(m);
  });
  // Полифиллы для Object.entries и Object.values (ручная реализация)
  const objectEntries = (obj: any) => Object.keys(obj).map((key) => [key, obj[key]]);
  const objectValues = (obj: any) => Object.keys(obj).map((key) => obj[key]);
  (objectValues(matchesBySeason) as any[]).forEach((arr: any[]) =>
    arr.sort((a: any, b: any) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()),
  );

  const sections = [
    {
      title: 'Карточка',
      data: [{ matchId }], // теперь data зависит от matchId
      renderItem: () => (
        <>
          <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
            <Header title="Назад" onBack={() => navigation.goBack()} />
          </View>

          <MatchSwiperSection
            matches={match ? adaptSeasonMatchesToMatch([match]) : []}
            loading={!matches}
            error={null}
            selectedMatchId={matchId}
            onMatchPress={(m) =>
              navigation.navigate('MatchHistory', {
                matchId: m.id,
                homeId: m.homeTeam?.id,
                awayId: m.awayTeam?.id,
                venue,
                season,
              })
            }
            // initialMatchId нужен для автоскролла к текущему матчу
            initialMatchId={matchId}
          />
          {/* Удалён DateSeasonSwitcher и вложенный блок */}
        </>
      ),
    },
    {
      title: 'Статистика',
      data: [{}],
      renderItem: () => <MatchHistoryStatsSection match={match} loading={false} error={null} />,
    },
    {
      title: 'Игроки',
      data: [{}],
      renderItem: () => <MatchHistoryPlayersSection match={match} loading={false} error={null} />,
    },
    // Новая секция: все матчи сезона свайпером
    {
      title: 'Все матчи сезона',
      data: objectEntries(matchesBySeason) as [string, MatchHistoryItem[]][],
      renderItem: ({ item }: { item: any }) => {
        const [season, seasonMatches] = item;
        const index = seasonMatches.findIndex((m) => {
          if (venue === 'home') {
            return m.homeTeam.id === teamId;
          } else {
            return m.awayTeam.id === opponentId;
          }
        });
        const initialMatchId = index !== -1 ? seasonMatches[index].id : undefined;
        // Форматируем дату для каждого матча
        const matchesWithFormattedDate = adaptSeasonMatchesToMatch(seasonMatches).map((m) => ({
          ...m,
          date: DateFormatAdapter.formatCompactDate(m.utcDate),
        }));
        // Кастомный обработчик нажатия
        const handleMatchPress = (m: any) => {
          navigation.navigate('MatchHistory', {
            matchId: m.id,
            homeId: m.homeTeam?.id,
            awayId: m.awayTeam?.id,
            venue,
            season,
          });
        };
        return (
          <>
            <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
              <Typography variant="h2" style={{ marginTop: 12, fontWeight: '700' }}>
                Ближайшие события
              </Typography>
            </View>
            <MatchSwiperSection
              matches={matchesWithFormattedDate}
              loading={!matches}
              error={null}
              selectedMatchId={matchId}
              onMatchPress={handleMatchPress}
              initialMatchId={initialMatchId}
            />
          </>
        );
      },
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => {
          // Для секции 'Карточка' используем matchId, чтобы SectionList реагировал на смену матча
          if (item && typeof item === 'object' && 'matchId' in item) return String(item.matchId);
          return String(idx);
        }}
        renderItem={({ section, item }) => section.renderItem({ item })}
        renderSectionHeader={({ section }) => null}
        contentContainerStyle={[
          styles.list,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        refreshControl={refreshControl}
      />
    </View>
  );
};

const MatchHistoryScreen: React.FC = () => {
  return <MatchHistoryScreenContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // TODO: заменить на colors.background
  },
  list: {
    paddingBottom: 32,
  },
});

export default MatchHistoryScreen;
