import { useEffect, useState } from 'react';
import { Team } from '../types/team';
import { TeamApiService } from '../services/teamApi';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

interface UseTeamDetailsResult {
  team: Team | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useTeamDetails(teamId: number): UseTeamDetailsResult {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TeamApiService.getTeamDetails(teamId);
      setTeam(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки команды');
      showErrorNotification( e instanceof Error ? e.message : 'Ошибка загрузки команды' );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return { team, loading, error, refresh: fetchDetails };
} 