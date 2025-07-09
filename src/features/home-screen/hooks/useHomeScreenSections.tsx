import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllMatchesSection from 'src/features/home-screen/components/AllMatchesSection';
import LeagueFilterBar from 'src/features/home-screen/components/LeagueFilterBar';
import MatchSwiperSection from 'src/features/home-screen/components/MatchSwiperSection';
import TeamListSection from 'src/features/home-screen/components/TeamListSection';
import TodayMatchSection from 'src/features/home-screen/components/TodayMatchSection';
import { Competition } from 'src/features/team-api/types/competition';
import { Match } from 'src/features/team-api/types/match';
import { Team } from 'src/features/team-api/types/team';
import Header from 'src/screens/HomeScreen/Header';
import { useSelectMode } from 'src/screens/HomeScreen/connected';
import Typography from 'src/shared/ui/typography/Typography';
import { useAppContext } from '../context';
import { selectSelectedLeagueId, setSelectedLeagueId } from '../leagueSlice';
import {
  filterTeamsByLeague,
  filterMatchesByLeague,
  filterMatchesByTeams,
} from '../filters/filters';
import { View } from 'react-native';
import { shadows } from 'src/shared/ui/theme/shadows';
import { colors } from 'src/shared/ui/theme/colors';
import Loader from 'src/shared/ui/loader';
import { useTranslation } from 'react-i18next';

interface UseHomeScreenSectionsParams {
  competitions: Competition[];
  teams: Team[];
  matches: Match[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPaginate: () => void;
}

export function useHomeScreenSections({ onRefresh, onPaginate }: UseHomeScreenSectionsParams) {
  const dispatch = useDispatch();
  const selectedLeagueId = useSelector(selectSelectedLeagueId);
  const {  selectedTeamIds, refreshTeams } = useAppContext();
  const [localError] = useState<string | null>(null);
  const { competitions, teams, matches, loading, error } = useSelectMode();
  const { t } = useTranslation();

  const [ loadingTeams, setLoadingTeams ] = useState( false );

  // Дефолтный выбор лиги при первом рендере
  useEffect(() => {
    if (
      (selectedLeagueId == null || !competitions.some((l) => l.id === selectedLeagueId)) &&
      competitions.length > 0
    ) {
      dispatch(setSelectedLeagueId(competitions[0].id));
    }
  }, [selectedLeagueId, competitions, dispatch]);

  React.useEffect( () =>
  {
    setLoadingTeams( true );
    refreshTeams();
    requestAnimationFrame( () =>
    {
      setLoadingTeams( false );
    } );
  }, [ selectedLeagueId ] );



  // Фильтрация команд по выбранной лиге
  const filteredTeams = useMemo(
    () => filterTeamsByLeague(teams?.teams || []),
    [teams, selectedLeagueId],
  );

  // Live-матчи по выбранной лиге
  const liveMatches = useMemo(
    () => filterMatchesByLeague(matches?.matches || []),
    [matches, selectedLeagueId],
  );

  // Актуальные матчи (live + фильтр по командам)
  const actualMatches = useMemo(
    () => filterMatchesByTeams(liveMatches, selectedTeamIds),
    [liveMatches, selectedTeamIds],
  );

  // Матчи на сегодня (можно доработать по дате)
  const todayMatches = useMemo(() => actualMatches, [actualMatches]);

  // Приведение error к строке
  const errorString = useMemo(() => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if ('message' in error) return String(error.message);
    return 'Ошибка загрузки';
  }, [error]);

  // Рендеры секций
  const renderHeader = useCallback(() => <Header avatarUrl={undefined} userInitial={'A'} />, []);
  const renderLeagues = useCallback(
    () =>
      competitions.length === 0 ? (
        <Typography variant="body" font="Inter" style={{ marginLeft: 16, marginBottom: 8 }}>
          {t( 'homeScreen.noLeagues' )}
        </Typography>
      ) : (
        <LeagueFilterBar leagues={competitions} />
      ),
    [competitions],
  );
  const renderMatchSwiper = useCallback(
    () => <MatchSwiperSection matches={liveMatches} />,
    [liveMatches],
  );
  const renderTeams = useCallback(
    () => <TeamListSection teams={filteredTeams || []} loading={loading} />,
    [filteredTeams, loading],
  );
  const renderTodayMatch = useCallback(
    () => <TodayMatchSection matches={todayMatches} error={null} />,
    [todayMatches],
  );
  const renderAllMatches = useCallback(
    (match: Match) => {
      // Адаптируем под нужный интерфейс TodayMatchCard
      const adaptedMatch = {
        ...match,
        homeTeam: {
          id: match.homeTeam?.id,
          name: match.homeTeam?.name,
          crest: (match.homeTeam as any)?.crest || (match.homeTeam as any)?.logo || '',
        },
        awayTeam: {
          id: match.awayTeam?.id,
          name: match.awayTeam?.name,
          crest: (match.awayTeam as any)?.crest || (match.awayTeam as any)?.logo || '',
        },
        time: match.utcDate ? match.utcDate.split('T')[1]?.slice(0, 5) : '',
        date: match.utcDate ? match.utcDate.split('T')[0] : '',
      };
      return <AllMatchesSection match={adaptedMatch} loading={loading} />;
    },
    [loading],
  );

  const sections = useMemo(() => {
    let dataState: any[] = [
      { title: 'Header', data: ['header'], renderItem: renderHeader },
      { title: 'Leagues', data: ['leagues'], renderItem: renderLeagues },
    ];

    dataState.push({
      title: 'Match Swiper',
      data: ['match-swiper'],
      renderItem: renderMatchSwiper,
    });

    if (filteredTeams.length > 0) {
      dataState.push({ title: 'Команды', data: ['teams'], renderItem: renderTeams });
    }

    if (actualMatches.length === 0) {
      dataState.push({
        title: 'Today Match',
        data: ['today-match'],
        renderItem: () => (
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 32,
                paddingHorizontal: 16,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 28,
              },
              shadows.section,
            ]}
          >
            <Typography variant="body" font="Inter" style={{ marginBottom: 8 }}>
              {t('homeScreen.noMatches')}
            </Typography>
          </View>
        ),
      });
      return dataState;
    }

    dataState.push({ title: 'Today Match', data: ['today-match'], renderItem: renderTodayMatch });
    dataState.push({
      title: 'Актуальные матчи',
      data: actualMatches,
      renderItem: ({ item }: { item: Match }) => renderAllMatches(item),
    });
    return dataState;
  }, [
    loadingTeams,
    liveMatches,
    actualMatches,
    renderHeader,
    renderLeagues,
    renderMatchSwiper,
    renderTeams,
    renderTodayMatch,
    renderAllMatches,
    errorString,
    localError,
  ]);

  return {
    loadingTeams,
    sections,
    loading,
    error: errorString || localError,
    onRefresh,
    onPaginate,
  };
}
