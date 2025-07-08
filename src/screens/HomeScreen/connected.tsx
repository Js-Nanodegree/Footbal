import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContextProvider } from 'src/features/home-screen/context/AppContext';
import { selectSelectedLeagueId } from 'src/features/home-screen/leagueSlice';
import { footballApi, statusMatches } from 'src/features/team-api/services/footballApi';
import Screen from './screen';

const HomeScreenConnectedInner = ( {
  competitions,
  teams,
  matches,
  loading,
  error,
  onRefresh,
  onPaginate,
}: any ) =>
{
  // useAppContext можно использовать для других целей, если нужно
  return (
    <Screen
      competitions={competitions}
      teams={teams}
      matches={matches}
      loading={loading}
      error={error}
      onRefresh={onRefresh}
      onPaginate={onPaginate}
    />
  );
};

export const useSelectMode = () =>
{
  const selectedLeagueId = useSelector( selectSelectedLeagueId );
  const competitionIdStr = selectedLeagueId ? String( selectedLeagueId ) : '';

  const {
    data: competitions = [],
    isLoading: loadingLeagues,
    error: errorLeagues,
  } = footballApi.endpoints.getLeagues.useQueryState( {} );

  const {
    data: teams = [],
    isLoading: loadingTeams,
    error: errorTeams,
  } = footballApi.endpoints.getCompetitionsTeams.useQueryState( {
    competitionId: selectedLeagueId ?? 0,
  } );
  const {
    data: matches = [],
    isLoading: loadingMatches,
    error: errorMatches,
  } = footballApi.endpoints.getLiveMatches.useQueryState( {
    competitionId: competitionIdStr,
    status: statusMatches.SCHEDULED,
  } );
  const {
    data: matchesLives = [],
    isLoading: loadingMatchesLives,
    error: errorMatchesLives,
  } = footballApi.endpoints.getLiveMatches.useQueryState( {
    competitionId: competitionIdStr,
    status: statusMatches.LIVE,
  } );


  return {
    matchesLives,
    competitions,
    teams,
    matches,
    loading: loadingTeams || loadingMatches || loadingLeagues || loadingMatchesLives,
    error: {
      teams: errorTeams,
      matches: errorMatches,
      competitions: errorLeagues,
      matchesLives: errorMatchesLives,
    },
  };
};

const HomeScreenConnected = () =>
{
  footballApi.endpoints.getLeagues.useQuery( {} );
  const selectedLeagueId = useSelector( selectSelectedLeagueId );
  const competitionIdStr = selectedLeagueId ? String( selectedLeagueId ) : '';
  const dispatch = useDispatch();
  // Получаем команды и матчи для выбранной лиги
  footballApi.endpoints.getCompetitionsTeams.useQuery(
    { competitionId: selectedLeagueId ?? 0 },
    { skip: !selectedLeagueId },
  );
  footballApi.endpoints.getLiveMatches.useQuery(
    { competitionId: competitionIdStr, status: statusMatches.SCHEDULED },
    { skip: !selectedLeagueId },
  );
  footballApi.endpoints.getLiveMatches.useQuery(
    { competitionId: competitionIdStr, status: statusMatches.LIVE },
    { skip: !selectedLeagueId },
  );

  // onRefresh/onPaginate заглушки (можно доработать)
  const onRefresh = () =>
  {
    dispatch( footballApi.endpoints.getLeagues.initiate( {} ) );
    dispatch( footballApi.endpoints.getCompetitionsTeams.initiate(
      { competitionId: selectedLeagueId ?? 0 },
      { forceRefetch: true },
    ) );
    dispatch( footballApi.endpoints.getLiveMatches.initiate(
      { competitionId: competitionIdStr, status: statusMatches.SCHEDULED },
      { forceRefetch: true },
    ) );
    dispatch( footballApi.endpoints.getLiveMatches.initiate(
      { competitionId: competitionIdStr, status: statusMatches.LIVE },
      { forceRefetch: true },
    ) );
  };
  const onPaginate = () => { };

  return (
    <AppContextProvider>
      <HomeScreenConnectedInner onRefresh={onRefresh} onPaginate={onPaginate} />
    </AppContextProvider>
  );
};

export default HomeScreenConnected;
