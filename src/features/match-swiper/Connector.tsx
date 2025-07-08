import React from 'react';
import { useAppContext } from '../home-screen/context/AppContext';
import { footballApi, statusMatches } from '../team-api/services/footballApi';
import { MatchCardProps } from './types';
import Wrapper from './Wrapper';
import { Match } from '../team-api/types/match';

const MAX_CARDS = 15;

// Маппинг данных RTK Query -> MatchCardProps
const mapMatchToMatchCardProps = ( match: Match ): MatchCardProps => ( {
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
  score: match.score,
  league: match.competition?.name || '',
  status: match.status,
  time: match.utcDate,
  stadium: match.area?.name || '',
  isLive: match.status === statusMatches.LIVE,
  badgeText: match.competition?.code || '',
  variant: 'gradient',
  backgroundLogo: match.competition?.emblem || '',
});

const Connector: React.FC<{
  matches: Match[];
  loading: boolean;
  error: string | null;
}> = ( {
  matches,
} ) =>
  {
  return <Wrapper data={matches.map( mapMatchToMatchCardProps )} loading={false} error={null} />;
};

export default Connector;
