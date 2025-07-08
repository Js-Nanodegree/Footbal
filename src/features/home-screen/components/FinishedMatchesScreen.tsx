// FinishedMatchesScreen: экран завершённых матчей, поддержка единого стиля, локализации, типографики, accessibility
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '../context/AppContext';
import { footballApi, statusMatches } from 'src/features/team-api/services/footballApi';
import { useHomeScreenSections } from '../hooks/useHomeScreenSections';
import FinishedMatchesSection from './FinishedMatchesSection';
import { Match } from 'src/features/team-api/types/match';
import { AppContextProvider } from '../context';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

const log = ( msg: string, data?: any ) =>
{
 
  console.log( `[Reactotron] ${ msg }`, data );
};

const FinishedMatchesScreenInner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { leagueId } = route.params || {};
  const { selectedLeagueId } = useAppContext();

  // Получаем все соревнования, команды и матчи через RTK Query
  const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {} );
  const { data: teams } = footballApi.endpoints.getCompetitionsTeams.useQuery( {
    competitionId: leagueId || selectedLeagueId || competitions?.[ 0 ]?.id || 0,
  } );
  const { data: matches } = footballApi.endpoints.getLiveMatches.useQuery( {
    competitionId: competitions?.find( c => c.id === ( leagueId || selectedLeagueId ) )?.code || competitions?.[ 0 ]?.code || '',
    status: statusMatches.FINISHED,
  } );

  // Получаем finishedMatches из хука
  const { finishedMatches } = useHomeScreenSections( {
    loading: false,
    error: null,
    onRefresh: () => {},
    onPaginate: () => {},
  });

  // Фильтруем по выбранной лиге, если leagueId задан
  const filteredMatches = leagueId
    ? finishedMatches.filter((m) => m.competition?.id === leagueId)
    : finishedMatches;

  // Адаптер для передачи нужных полей
  const renderItem = ({ item }: { item: Match }) => {
    const adaptedMatch = {
      homeTeam: {
        name: item.homeTeam?.name,
        crest: ( item.homeTeam as any )?.crest || ( item.homeTeam as any )?.logo || '',
      },
      awayTeam: {
        name: item.awayTeam?.name,
        crest: ( item.awayTeam as any )?.crest || ( item.awayTeam as any )?.logo || '',
      },
      time: item.utcDate ? item.utcDate.split('T')[1]?.slice(0, 5) : '',
      date: item.utcDate ? item.utcDate.split('T')[0] : '',
      score: item.score,
    };
    return <FinishedMatchesSection match={adaptedMatch} />;
  };

  const insets = useSafeAreaInsets();

  // Отступ между карточками
  const renderSeparator = () => <View style={{ height: 16 }} />;

  useEffect( () =>
  {
    // debug
    // log('FinishedMatchesScreen: props', { leagueId, competitions, teams, matches });
    // log('FinishedMatchesScreen: matches', filteredMatches);
  }, [ leagueId, competitions, teams, matches, filteredMatches ] );

  // ... здесь должен быть SectionList или FlatList для отображения filteredMatches ...
  // Для примера:
  // return (
  //   <FlatList
  //     data={filteredMatches}
  //     renderItem={renderItem}
  //     keyExtractor={item => String(item.id)}
  //     ItemSeparatorComponent={renderSeparator}
  //     contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
  //   />
  // );
  return null; // TODO: реализовать UI
};

const FinishedMatchesScreen = () => {
  return (
    <AppContextProvider>
      <FinishedMatchesScreenInner />
    </AppContextProvider>
  );
};

export default FinishedMatchesScreen;
