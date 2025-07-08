import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type MatchHistoryQueryState = {
  teamId: number;
  matchId: number;
  season: string;
  venue: 'home' | 'away';
};

interface MatchHistoryQueryContextValue extends MatchHistoryQueryState {
  setTeamId: (id: number) => void;
  setMatchId: (id: number) => void;
  setSeason: (season: string) => void;
  setVenue: (venue: 'home' | 'away') => void;
}

const MatchHistoryQueryContext = createContext<MatchHistoryQueryContextValue | undefined>(undefined);

export const MatchHistoryQueryProvider = ({ children, initial }: { children: ReactNode; initial?: Partial<MatchHistoryQueryState> }) => {
  const [teamId, setTeamId] = useState(initial?.teamId ?? 1);
  const [matchId, setMatchId] = useState(initial?.matchId ?? 123456);
  const [season, setSeason] = useState(initial?.season ?? '2023/2024');
  const [venue, setVenue] = useState<'home' | 'away'>(initial?.venue ?? 'home');

  const value: MatchHistoryQueryContextValue = {
    teamId,
    matchId,
    season,
    venue,
    setTeamId,
    setMatchId,
    setSeason,
    setVenue,
  };

  return <MatchHistoryQueryContext.Provider value={value}>{children}</MatchHistoryQueryContext.Provider>;
};

export const useMatchHistoryQueryState = () => {
  const ctx = useContext(MatchHistoryQueryContext);
  if (!ctx) throw new Error('useMatchHistoryQueryState должен использоваться внутри MatchHistoryQueryProvider');
  return ctx;
}; 