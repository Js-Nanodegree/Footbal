import { useEffect, useState } from 'react';
import { Match } from '../types/match';
import { TeamApiService } from '../services/teamApi';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

interface UseTeamMatchesResult {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useTeamMatches(teamId: number): UseTeamMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TeamApiService.getTeamMatches(teamId);
      setMatches(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки матчей');
      showErrorNotification( e instanceof Error ? e.message : 'Ошибка загрузки матчей' );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return { matches, loading, error, refresh: fetchMatches };
} 