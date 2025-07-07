import React from 'react';
import { AppContextProvider, useAppContext } from 'src/features/home-screen/context';
import { footballApi, statusMatches } from 'src/features/team-api/services/footballApi';
import Screen from './screen';

const HomeScreenConnectedInner = () =>
{
  const { competition, refresh, lastFetched } = useAppContext();

  // Для RTK Query: если lastFetched меняется (refresh), refetch будет вызван
  const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {}, { refetchOnMountOrArgChange: !!lastFetched } );

  const { data: matchesData, refetch: refetchMatches } = footballApi.endpoints.getLiveMatches.useQuery(
    {
      competitionId: competition?.code || '',
      status: statusMatches.FINISHED,
    },
    { refetchOnMountOrArgChange: !!lastFetched }
  );
  const { data: teamsData, refetch: refetchTeams } = footballApi.endpoints.getCompetitionsTeams.useQuery(
    {
      competitionId: competition?.id ?? 0,
    },
    { refetchOnMountOrArgChange: !!lastFetched }
  );

  // Можно добавить useEffect для ручного force-refetch при refresh
  React.useEffect( () =>
  {
    if ( lastFetched )
    {
      refetchMatches();
      refetchTeams();
    }
  }, [ lastFetched ] );

  return (
    <Screen
      competitions={competitions || []}
      teams={teamsData || []}
      matches={matchesData || []}
      loading={false}
      error={null}
      onRefresh={refresh}
      onPaginate={() => { }}
    />
  );
};

export default function HomeScreenConnected()
{
  return (
    <AppContextProvider>
      <HomeScreenConnectedInner />
    </AppContextProvider>
  );
}
