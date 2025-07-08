import React from 'react';
import { useAppContext } from '../home-screen/context/AppContext';
import { footballApi, statusMatches } from '../team-api/services/footballApi';
import { MatchCardProps } from './types';
import Wrapper from './Wrapper';
import { Match } from '../team-api/types/match';

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

const Connector: React.FC<{
  matches: Match[];
  loading: boolean;
  error: string | null;
}> = ( {
  matches,
} ) =>
  {
    return <Wrapper data={matches.map( mapMatchToMatchCardProps ).slice( 0, 25 )} loading={false} error={null} />;
};

export default Connector;
