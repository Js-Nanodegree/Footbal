import React, { useCallback, useMemo, useState } from 'react';
import AllMatchesSection from 'src/features/home-screen/components/AllMatchesSection';
import MatchSwiperSection from 'src/features/home-screen/components/MatchSwiperSection';
import TeamListSection from 'src/features/home-screen/components/TeamListSection';
import TodayMatchSection from 'src/features/home-screen/components/TodayMatchSection';
import Header from 'src/screens/HomeScreen/Header';
import LeagueFilterBar from 'src/screens/HomeScreen/LeagueFilterBar';
import { useAppContext } from '../context';
import Typography from 'src/shared/ui/typography/Typography';
import { Competition } from 'src/features/team-api/types/competition';
import { Team } from 'src/features/team-api/types/team';
import { Match } from 'src/features/team-api/types/match';

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

  // ЛОГИ ДЛЯ ОТЛАДКИ

  // Дефолтный выбор лиги при первом рендере
  React.useEffect( () =>
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
  const filteredTeams = useMemo(
    () =>
      teams.filter(
        ( team ) => selectedLeagueId == null || ( team.area && team.area.id === selectedLeagueId ),
      ),
    [ selectedLeagueId, teams ],
  );

  // Фильтрация матчей по выбранной лиге и командам
  const filteredMatches = useMemo(
    () =>
      matches?.filter( ( match ) =>
      {
        if ( selectedLeagueId && match.competition?.id !== selectedLeagueId ) return false;
        if (
          selectedTeamIds.length > 0 &&
          !selectedTeamIds.some(
            ( teamId ) => teamId === match.homeTeam?.id || teamId === match.awayTeam?.id,
          )
        )
          return false;
        return true;
      } ) || [],
    [ selectedLeagueId, selectedTeamIds, matches ],
  );

  const now = new Date();
  const actualMatches = useMemo(
    () =>
      matches
        .filter(
          ( match ) =>
            match.status === 'SCHEDULED' &&
            ( selectedLeagueId == null || match.competition?.id === selectedLeagueId ) &&
            new Date( match.utcDate ) > now,
        )
        .sort( ( a, b ) => new Date( a.utcDate ).getTime() - new Date( b.utcDate ).getTime() ),
    [ matches, selectedLeagueId ],
  );

  const finishedMatches = useMemo(
    () =>
      matches
        .filter(
          ( match ) =>
            match.status === 'FINISHED' &&
            ( selectedLeagueId == null || match.competition?.id === selectedLeagueId ) &&
            new Date( match.utcDate ) < now,
        )
        .sort( ( a, b ) => new Date( b.utcDate ).getTime() - new Date( a.utcDate ).getTime() ),
    [ matches, selectedLeagueId ],
  );

  // Фильтрация LIVE-матчей для MatchSwiper и TodayMatch
  const swiperMatches = useMemo( () => matches.filter( ( m ) => m.status === 'LIVE' ), [ matches ] );
  const todayMatches = swiperMatches; // для MVP — совпадает с swiperMatches

  const today = new Date();
  const todayStr = today.toISOString().slice( 0, 10 ); // 'YYYY-MM-DD'
  const liveMatches = useMemo(
    () =>
      matches.filter(
        ( match ) =>
          match.status === 'LIVE' &&
          ( selectedLeagueId == null || match.competition?.id === selectedLeagueId ) &&
          match.utcDate?.slice( 0, 10 ) === todayStr,
      ),
    [ matches, selectedLeagueId ],
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
      dataState.push(
        { title: 'Today Match', data: [ 'today-match' ], renderItem: renderTodayMatch }
      )
      dataState.push( {
        title: 'Актуальные матчи',
        data: actualMatches,
        renderItem: ( { item }: { item: Match } ) => renderAllMatches( item ),
      } );
    } else
    {
      dataState.push(
        {
          title: 'Today Match', data: [ 'today-match' ], renderItem: () =>
          {
            return (
              <TodayMatchSection matches={[]} error={error || localError} />
            )
          }
        }
      )
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
