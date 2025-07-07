import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AllMatchesSection from 'src/features/home-screen/components/AllMatchesSection';
import LeagueFilterBar from 'src/features/home-screen/components/LeagueFilterBar';
import MatchSwiperSection from 'src/features/home-screen/components/MatchSwiperSection';
import TeamListSection from 'src/features/home-screen/components/TeamListSection';
import TodayMatchSection from 'src/features/home-screen/components/TodayMatchSection';
import { Competition } from 'src/features/team-api/types/competition';
import { Match } from 'src/features/team-api/types/match';
import { Team } from 'src/features/team-api/types/team';
import Header from 'src/screens/HomeScreen/Header';
import Typography from 'src/shared/ui/typography/Typography';
import { useAppContext } from '../context';

interface UseHomeScreenSectionsParams
{
  competitions: Competition[];
  teams: Team[];
  matches: Match[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPaginate: () => void;
}

export function useHomeScreenSections( {
  competitions,
  teams,
  matches,
  loading,
  error,
  onRefresh,
  onPaginate,
}: UseHomeScreenSectionsParams )
{
  const { selectedLeagueId, setSelectedLeagueId, setSelectedTeamIds, selectedTeamIds } =
    useAppContext();
  const [ localError, setLocalError ] = useState<string | null>( null );

  // Дефолтный выбор лиги при первом рендере
  useEffect( () =>
  {
    if (
      ( selectedLeagueId == null || !competitions.some( ( l ) => l.id === selectedLeagueId ) ) &&
      competitions.length > 0
    )
    {
      setSelectedLeagueId( competitions[ 0 ].id );
    }
  }, [ selectedLeagueId, setSelectedLeagueId, competitions ] );

  // Фильтрация enriched команд по выбранной лиге
  const filteredTeams = useMemo( () => teams, [ selectedLeagueId, teams ] );

  // Фильтрация матчей по выбранной лиге и командам
  const matchesSafe = Array.isArray( matches ) ? matches : [];
  const filteredMatches = useMemo(
    () =>
      matchesSafe.filter( ( match ) =>
      {
        if (
          selectedTeamIds.length > 0 &&
          !selectedTeamIds.some(
            ( teamId ) => teamId === match.homeTeam?.id || teamId === match.awayTeam?.id,
          )
        )
        {
          return false;
        }
        return true;
      } ) || [],
    [ selectedLeagueId, selectedTeamIds, matchesSafe ],
  );

  // Возвращаем все матчи без фильтрации по статусу/дате/лиге
  const finishedMatches = useMemo(
    () =>
      [ ...matchesSafe ].sort( ( a, b ) => new Date( b.utcDate ).getTime() - new Date( a.utcDate ).getTime() ),
    [ matchesSafe ],
  );

  // Фильтрация liveMatches по выбранной лиге
  const liveMatches = useMemo(
    () =>
      matchesSafe.filter( ( match ) => !selectedLeagueId || match.competition?.id === selectedLeagueId ),
    [ matchesSafe, selectedLeagueId ],
  );

  // actualMatches и todayMatches теперь используют liveMatches (уже отфильтрованные по лиге и командам)
  const actualMatches = useMemo(
    () =>
      liveMatches.filter( ( match ) =>
      {
        if (
          selectedTeamIds.length > 0 &&
          !selectedTeamIds.some(
            ( teamId ) => teamId === match.homeTeam?.id || teamId === match.awayTeam?.id,
          )
        )
        {
          return false;
        }
        return true;
      } ),
    [ liveMatches, filteredMatches ],
  );
  const todayMatches = useMemo(
    () =>
      liveMatches.filter( ( match ) =>
      {
        if (
          selectedTeamIds.length > 0 &&
          !selectedTeamIds.some(
            ( teamId ) => teamId === match.homeTeam?.id || teamId === match.awayTeam?.id,
          )
        )
        {
          return false;
        }
        return true;
      } ),
    [ liveMatches, filteredMatches ],
  );

  // Рендеры секций
  const renderHeader = useCallback( () => <Header avatarUrl={undefined} userInitial={'A'} />, [] );
  const renderLeagues = useCallback(
    () =>
      competitions.length === 0 ? (
        <Typography variant="body" font="Inter" style={{ marginLeft: 16, marginBottom: 8 }}>
          Нет доступных лиг
        </Typography>
      ) : (
        <LeagueFilterBar
          leagues={competitions || []}
          activeLeagueId={selectedLeagueId}
          onLeagueChange={( id ) =>
          {
            setSelectedLeagueId( id );
            setSelectedTeamIds( [] ); // сбрасываем выбранные команды при смене лиги
          }}
        />
      ),
    [ competitions, selectedLeagueId, setSelectedLeagueId, setSelectedTeamIds ],
  );
  const renderMatchSwiper = useCallback(
    () => <MatchSwiperSection matches={liveMatches} />,
    [ liveMatches ],
  );
  const renderTeams = useCallback(
    () => <TeamListSection teams={filteredTeams || []} loading={loading} />,
    [ filteredTeams, loading ],
  );
  const renderTodayMatch = useCallback(
    () => <TodayMatchSection matches={todayMatches} error={error || localError} />,
    [ todayMatches, error, localError ],
  );
  const renderAllMatches = useCallback(
    ( match: Match ) =>
    {
      // Адаптируем под нужный интерфейс TodayMatchCard
      const adaptedMatch = {
        homeTeam: {
          name: match.homeTeam?.name,
          crestUrl: match.homeTeam?.crestUrl,
        },
        awayTeam: {
          name: match.awayTeam?.name,
          crestUrl: match.awayTeam?.crestUrl,
        },
        time: match.utcDate ? match.utcDate.split( 'T' )[ 1 ]?.slice( 0, 5 ) : '',
        date: match.utcDate ? match.utcDate.split( 'T' )[ 0 ] : '',
        ...match,
      };
      return <AllMatchesSection match={adaptedMatch} loading={loading} />;
    },
    [ loading ],
  );
  const renderLiveMatches = useCallback(
    ( match: Match ) => <AllMatchesSection match={match} loading={loading} />,
    [ loading, selectedTeamIds ],
  );

  const sections = useMemo( () =>
  {
    let dataState = [
      { title: 'Header', data: [ 'header' ], renderItem: renderHeader },
      { title: 'Leagues', data: [ 'leagues' ], renderItem: renderLeagues },
      { title: 'Match Swiper', data: [ 'match-swiper' ], renderItem: renderMatchSwiper },
      { title: 'Команды', data: [ 'teams' ], renderItem: renderTeams },
    ];

    if ( actualMatches.length > 0 )
    {
      dataState.push( { title: 'Today Match', data: [ 'today-match' ], renderItem: renderTodayMatch } );
      dataState.push( {
        title: 'Актуальные матчи',
        data: actualMatches,
        renderItem: ( { item }: { item: Match } ) => renderAllMatches( item ),
      } );
    } else
    {
      dataState.push( {
        title: 'Today Match',
        data: [ 'today-match' ],
        renderItem: () =>
        {
          return <TodayMatchSection matches={[]} error={error || localError} />;
        },
      } );
    }
    return dataState;
  }, [
    liveMatches,
    actualMatches,
    renderHeader,
    renderLeagues,
    renderMatchSwiper,
    renderTeams,
    renderLiveMatches,
    renderTodayMatch,
    renderAllMatches,
  ] );

  return {
    sections,
    loading,
    error: error || localError,
    onRefresh,
    onPaginate,
    finishedMatches,
  };
}
