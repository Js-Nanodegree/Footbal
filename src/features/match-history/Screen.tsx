// Экран истории очных матчей: секции собираются через SectionList, используется DateSeasonProvider и DateSeasonSwitcher
// [ПРАВИЛО] Тесты для этого экрана писать не обязательно, по решению команды.
import { useRoute } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import
{
  useGetMatchDetailsQuery,
  useGetTeamMatchesQuery,
} from '../../features/team-api/services/footballApi';
import MatchSwiperSection from '../home-screen/components/MatchSwiperSection';
import { MatchHistoryPlayersSection } from '../match-history-players/Section';
import { MatchHistoryStatsSection } from '../match-history-stats/Section';
import { MatchHistoryItem } from '../team-api/types/match';
import { adaptSeasonMatchesToMatch } from './adapters';
import { DateSeasonSwitcher } from './context/DateSeasonSwitcher';
import
{
  MatchHistoryQueryProvider,
  useMatchHistoryQueryState,
} from './context/MatchHistoryQueryContext';

const MatchHistoryScreenContent: React.FC = () => {
  const { matchId, venue, setMatchId } = useMatchHistoryQueryState();
  const { data: match } = useGetMatchDetailsQuery( matchId );
  const insets = useSafeAreaInsets();

  // Меморизация вычисления teamId и opponentId
  const { teamId, opponentId } = useMemo( () =>
  {
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
    return { teamId, opponentId };
  }, [ match, venue ] );

  const { data: matches } = useGetTeamMatchesQuery(
    teamId && opponentId ? { teamId, opponentId } : skipToken,
  );

  // Группируем матчи по сезону и сортируем по дате
  const matchesBySeason: Record<string, any[]> = {};
  ( matches || [] ).forEach( ( m: any ) =>
  {
    const seasonKey = m.season?.startDate?.slice( 0, 4 ) + '/' + m.season?.endDate?.slice( 0, 4 );
    if ( !matchesBySeason[ seasonKey ] ) matchesBySeason[ seasonKey ] = [];
    matchesBySeason[ seasonKey ].push( m );
  } );
  // Полифиллы для Object.entries и Object.values (ручная реализация)
  const objectEntries = ( obj: any ) => Object.keys( obj ).map( ( key ) => [ key, obj[ key ] ] );
  const objectValues = ( obj: any ) => Object.keys( obj ).map( ( key ) => obj[ key ] );
  ( objectValues( matchesBySeason ) as any[] ).forEach( ( arr: any[] ) =>
    arr.sort( ( a: any, b: any ) => new Date( b.utcDate ).getTime() - new Date( a.utcDate ).getTime() ),
  );


  const sections = [
    {
      title: 'Карточка',
      data: [ {} ],
      renderItem: () => (
        <>
          <MatchSwiperSection
            matches={match ? adaptSeasonMatchesToMatch( [ match ] ) : []}
            loading={!matches}
            error={null}
            selectedMatchId={matchId}
            onMatchPress={( m ) => setMatchId( m.id )}
            // initialMatchId нужен для автоскролла к текущему матчу
            initialMatchId={matchId}
          />
          <DateSeasonSwitcher />
        </>
      ),
    },
    {
      title: 'Статистика',
      data: [ {} ],
      renderItem: () => <MatchHistoryStatsSection match={match} loading={false} error={null} />,
    },
    {
      title: 'Игроки',
      data: [ {} ],
      renderItem: () => <MatchHistoryPlayersSection match={match} loading={false} error={null} />,
    },
    // Новая секция: все матчи сезона свайпером
    {
      title: 'Все матчи сезона',
      data: objectEntries( matchesBySeason ) as [ string, MatchHistoryItem[] ][],
      renderItem: ( { item }: { item: any } ) =>
      {
        const [ season, seasonMatches ] = item;
        const index = seasonMatches.findIndex( m =>
        {
          if ( venue === 'home' )
          {
            return m.homeTeam.id === teamId;
          } else
          {
            return m.awayTeam.id === opponentId;
          }
        } );
        const initialMatchId = index !== -1 ? seasonMatches[ index ].id : undefined;
        return (
          <MatchSwiperSection
            matches={adaptSeasonMatchesToMatch( seasonMatches )}
            loading={!matches}
            error={null}
            selectedMatchId={matchId}
            onMatchPress={( m ) => setMatchId( m.id )}
            // initialMatchId нужен для автоскролла к текущему матчу
            initialMatchId={initialMatchId}
          />
        );
      },
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={( { section, item } ) => section.renderItem( { item } )}
        renderSectionHeader={({ section }) => null}
        contentContainerStyle={[ styles.list, { paddingTop: insets.top, paddingBottom: insets.bottom } ]}
      />
    </View>
  );
};

const MatchHistoryScreen: React.FC = () => {
  const route = useRoute();
  // @ts-ignore
  const matchId = route.params?.matchId ?? 123456; // fallback на дефолтный id
  return (
    <MatchHistoryQueryProvider initial={{ matchId }}>
      <MatchHistoryScreenContent />
    </MatchHistoryQueryProvider>
  );
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
