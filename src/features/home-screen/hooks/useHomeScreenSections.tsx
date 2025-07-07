import React, { useCallback, useMemo, useState } from 'react';
import AllMatchesSection from 'src/features/home-screen/components/AllMatchesSection';
import MatchSwiperSection from 'src/features/home-screen/components/MatchSwiperSection';
import TeamListSection from 'src/features/home-screen/components/TeamListSection';
import TodayMatchSection from 'src/features/home-screen/components/TodayMatchSection';
import Header from 'src/screens/HomeScreen/Header';
import LeagueFilterBar from 'src/screens/HomeScreen/LeagueFilterBar';
import { useAppContext } from '../context';
import { exampleLeagues } from '../mocks/exampleLeagues';
import { exampleMatches } from '../mocks/exampleMatches';
import { exampleTeams } from '../mocks/exampleTeams';
import Typography from 'src/shared/ui/typography/Typography';

export function useHomeScreenSections()
{
  const { selectedLeagueId, setSelectedLeagueId, setSelectedTeamIds, selectedTeamIds, loading } =
    useAppContext();
  const [ error, setError ] = useState<string | null>( null );

  // Дефолтный выбор лиги при первом рендере
  React.useEffect( () =>
  {
    if ( ( selectedLeagueId == null || !exampleLeagues.some( l => l.id === selectedLeagueId ) ) && exampleLeagues.length > 0 )
    {
      setSelectedLeagueId( exampleLeagues[ 0 ].id );
    }
  }, [ selectedLeagueId, setSelectedLeagueId ] );

  // Мемоизированные фильтрации
  const filteredTeamIds = useMemo(
    () =>
      exampleTeams
        ?.filter( ( team ) => selectedLeagueId == null || team?.leagueId === selectedLeagueId )
        ?.map( ( team ) => team?.id ) || [],
    [ selectedLeagueId ],
  );

  // Мемоизированная фильтрация для матчей (теперь возвращает массив матчей, а не id)
  const filteredMatches = useMemo(
    () =>
      exampleMatches?.filter( ( match ) =>
      {
        if ( selectedLeagueId && match?.leagueId !== selectedLeagueId ) return false;
        if (
          selectedTeamIds.length > 0 &&
          !selectedTeamIds.some(
            ( teamId ) => teamId === match?.homeTeamId || teamId === match?.awayTeamId
          )
        )
          return false;
        return true;
      } ) || [],
    [ selectedLeagueId, selectedTeamIds ],
  );

  console.log( selectedLeagueId, 'root selectedLeagueId' );
  console.log( selectedTeamIds, 'root selectedTeamIds' );


  // Мемоизированная фильтрация для MatchSwiper
  const filteredSwiperMatches = useMemo(
    () =>
      exampleMatches
        ?.filter( ( match ) =>
        {
          console.log( match, 'match' );
          console.log( selectedLeagueId, 'selectedLeagueId' );
          console.log( selectedTeamIds, 'selectedTeamIds' );
          console.log( selectedTeamIds.some( ( teamId ) => teamId === match?.homeTeamId || teamId === match?.awayTeamId ), 'selectedTeamIds.some' );
          if ( selectedLeagueId && match?.leagueId !== selectedLeagueId ) return false;
          if (
            selectedTeamIds.length > 0 &&
            !selectedTeamIds.some(
              ( teamId ) => teamId === match?.homeTeamId || teamId === match?.awayTeamId
            )
          )
            return false;
          return true;
        } )
        ?.slice( 0, 15 ) || [],
    [ selectedLeagueId, selectedTeamIds ],
  );

  // Мемоизированные renderItem
  const renderHeader = useCallback( () => <Header avatarUrl={undefined} userInitial={'A'} />, [] );
  const renderLeagues = useCallback(
    () => (
      exampleLeagues.length === 0 ? (
        <Typography variant="body" font="Inter" style={{ marginLeft: 16, marginBottom: 8 }}>
          Нет доступных лиг
        </Typography>
      ) : (
          <LeagueFilterBar
            leagues={exampleLeagues || []}
            activeLeagueId={selectedLeagueId}
            onLeagueChange={( id ) =>
            {
              setSelectedLeagueId( id );
              setSelectedTeamIds( [] ); // сбрасываем выбранные команды при смене лиги
            }}
          />
        )
    ),
    [ selectedLeagueId, setSelectedLeagueId, setSelectedTeamIds ]
  );
  const renderMatchSwiper = useCallback(
    () => <MatchSwiperSection matches={filteredSwiperMatches || []} />,
    [ filteredSwiperMatches, selectedTeamIds ],
  );
  const renderTeams = useCallback(
    () => <TeamListSection teamIds={filteredTeamIds || []} loading={loading.teams} />,
    [ filteredTeamIds, loading.teams ],
  );
  const renderTodayMatch = useCallback( () => <TodayMatchSection />, [] );
  const renderAllMatches = useCallback(
    ( match: typeof exampleMatches[ number ] ) => <AllMatchesSection match={match} loading={loading.matches} />,
    [ loading.matches, selectedTeamIds ],
  );

  const sections = useMemo(
    () => [
      { title: 'Header', data: [ 'header' ], renderItem: renderHeader },
      { title: 'Leagues', data: [ 'leagues' ], renderItem: renderLeagues },
      { title: 'Match Swiper', data: [ 'match-swiper' ], renderItem: renderMatchSwiper },
      { title: 'Команды', data: [ 'teams' ], renderItem: renderTeams },
      { title: 'Today Match', data: [ 'today-match' ], renderItem: renderTodayMatch },
      {
        title: 'Все матчи',
        data: filteredMatches,
        renderItem: ( { item }: { item: typeof exampleMatches[ number ] } ) => renderAllMatches( item ),
      },
    ],
    [
      filteredMatches,
      renderHeader,
      renderLeagues,
      renderMatchSwiper,
      renderTeams,
      renderTodayMatch,
      renderAllMatches,
    ],
  );

  // Методы для refresh/paginate
  const onRefresh = () =>
  {
    setError( null );
    setTimeout( () => setError( 'Refresh not implemented' ), 1000 );
  };
  const onPaginate = () => { };

  return {
    sections,
    loading,
    error,
    onRefresh,
    onPaginate,
  };
}
