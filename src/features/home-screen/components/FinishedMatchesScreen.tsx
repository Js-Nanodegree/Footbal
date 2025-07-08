// FinishedMatchesScreen: экран завершённых матчей, поддержка единого стиля, локализации, типографики, accessibility
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { DateFormatAdapter } from 'src/features/match-history/adapters';
import { footballApi, statusMatches } from 'src/features/team-api/services/footballApi';
import { Match } from 'src/features/team-api/types/match';
import Typography from 'src/shared/ui/typography/Typography';
import { AppContextProvider } from '../context';
import { selectSelectedLeagueId } from '../leagueSlice';
import FinishedMatchesSection from './FinishedMatchesSection';
import Header from 'src/shared/ui/header/Header';


const FinishedMatchesScreenInner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { leagueId } = route.params || {};
  const selectedLeagueId = useSelector( selectSelectedLeagueId );
  const { t } = useTranslation();

  // Получаем все соревнования через RTK Query
  const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {} );

  // Вычисляем competitionId (code)
  const competitionId = competitions?.find( ( c ) => c.id === ( leagueId || selectedLeagueId ) )?.code || competitions?.[ 0 ]?.code || '';

  // Получаем завершённые матчи через RTK Query
  const { data, isLoading, isError } = footballApi.endpoints.getLiveMatches.useQuery( {
    competitionId,
    status: statusMatches.FINISHED,
  });
  const matches = data?.matches || [];

  // DEBUG: выводим competitions, competitionId, matches
  React.useEffect( () =>
  {
    console.log( 'competitions', competitions );
    console.log( 'competitionId', competitionId );
    console.log( 'matches', matches );
  }, [ competitions, competitionId, matches ] );

  // Вернуть фильтрацию по лиге
  const filteredMatches = React.useMemo( () =>
  {
    if ( !matches ) return [];
    if ( leagueId )
    {
      return matches.filter( ( m: Match ) => m.competition?.id === leagueId );
    }
    return matches;
  }, [ matches, leagueId ] );

  const insets = useSafeAreaInsets();

  // Адаптер для передачи нужных полей
  const renderItem = ({ item }: { item: Match }) => {
    const homeScore = item.score?.fullTime?.home ?? '';
    const awayScore = item.score?.fullTime?.away ?? '';
    const adaptedMatch = {
      id: item.id,
      homeTeam: {
        name: item.homeTeam?.name,
        crest: ( item.homeTeam as any )?.crest || ( item.homeTeam as any )?.logo || '',
      },
      awayTeam: {
        name: item.awayTeam?.name,
        crest: ( item.awayTeam as any )?.crest || ( item.awayTeam as any )?.logo || '',
      },
      time: `${ homeScore } : ${ awayScore }`,
      date: DateFormatAdapter.formatCompactDate( item.utcDate ),
      score: item.score,
    };
    return <FinishedMatchesSection match={adaptedMatch} onPress={() => navigation.navigate( 'MatchHistory', { matchId: item.id } )} />;
  };

  const renderSeparator = () => <View style={{ height: 16 }} />;

  if ( isLoading )
  {
    return (
      <View style={[ styles.centered, { paddingTop: insets.top, paddingBottom: insets.bottom } ]}>
        <Typography variant="h2" font="Oswald">{t( 'Загрузка...' )}</Typography>
      </View>
    );
  }

  if ( isError )
  {
    return (
      <View style={[ styles.centered, { paddingTop: insets.top, paddingBottom: insets.bottom } ]}>
        <Typography variant="h2" font="Oswald" style={{ color: 'red' }}>{t( 'Ошибка загрузки матчей' )}</Typography>
      </View>
    );
  }

  if ( !filteredMatches || filteredMatches.length === 0 )
  {
    return (
      <View style={[ styles.centered, { paddingTop: insets.top, paddingBottom: insets.bottom } ]}>
        <Header title={t( 'Завершённые матчи' )} onBack={() => navigation.goBack()} />
        <Typography variant="h2" font="Oswald">{t( 'Завершённых матчей нет' )}</Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredMatches}
      renderItem={renderItem}
      keyExtractor={( item ) => String( item.id )}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Header title={t( 'Завершённые матчи' )} onBack={() => navigation.goBack()} />
      }
    />
  );
};

const styles = StyleSheet.create( {
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
} );

const FinishedMatchesScreen = () => {
  return (
    <AppContextProvider>
      <FinishedMatchesScreenInner />
    </AppContextProvider>
  );
};

export default FinishedMatchesScreen;
