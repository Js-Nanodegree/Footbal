import React from 'react';
import { useAppContext } from '../home-screen/context/AppContext';
import { footballApi, statusMatches } from '../team-api/services/footballApi';
import { MatchCardProps } from './types';
import Wrapper from './Wrapper';

const MAX_CARDS = 15;

// Маппинг данных RTK Query -> MatchCardProps
const mapMatchToMatchCardProps = (match: any): MatchCardProps => ({
  homeTeam: {
    name: match.homeTeam?.name || '',
    logo:
      typeof (match.homeTeam as any)?.crest === 'string'
        ? (match.homeTeam as any).crest
        : match.homeTeam?.logo || '',
  },
  awayTeam: {
    name: match.awayTeam?.name || '',
    logo:
      typeof (match.awayTeam as any)?.crest === 'string'
        ? (match.awayTeam as any).crest
        : match.awayTeam?.logo || '',
  },
  homeScore: match.score?.fullTime?.homeTeam ?? '',
  awayScore: match.score?.fullTime?.awayTeam ?? '',
  league: match.competition?.name || '',
  status: match.status,
  time: match.week,
  stadium: match.area?.name || '',
  isLive: match.status === statusMatches.LIVE,
  badgeText: match.competition?.code || '',
  variant: 'gradient',
  backgroundLogo: match.competition?.emblem || '',
});

const Connector: React.FC = () => {
  const { selectedLeagueId } = useAppContext();
  const { data: competitions } = footballApi.endpoints.getLeagues.useQuery({});
  const league = competitions?.find((c) => c.id === selectedLeagueId);
  const leagueCode = league?.code || '';

  if (!selectedLeagueId || !leagueCode) return null;

  const {
    data: rtkMatches,
    isLoading,
    error: rtkError,
  } = footballApi.endpoints.getLiveMatches.useQuery({
    competitionId: leagueCode,
    status: statusMatches.LIVE,
  });

  const safeStoreMatches = Array.isArray(rtkMatches) ? rtkMatches : [];

  const data = safeStoreMatches
    .filter((m: any) => m && typeof m.homeTeam !== 'undefined' && typeof m.awayTeam !== 'undefined')
    .slice(0, MAX_CARDS)
    .map(mapMatchToMatchCardProps);

  const errorMsg =
    rtkError && typeof rtkError === 'string'
      ? rtkError
      : rtkError
        ? 'Ошибка загрузки матчей'
        : null;

  return <Wrapper data={data} loading={isLoading} error={errorMsg} />;
};

export default Connector;
