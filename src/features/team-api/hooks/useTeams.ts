import { useEffect, useState } from 'react';
import { Team } from '../types/team';
import { TeamApiService } from '../services/teamApi';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';
import { mockTeams } from '../mocks/teams';

interface UseTeamsResult {
  teams: Team[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadNextPage: () => void;
  refresh: () => void;
}

export function useTeams(pageSize = 20): UseTeamsResult {
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchTeams(reset = false) {
    setLoading(true);
    setError(null);
    try {
      const data = await TeamApiService.getTeams(reset ? 1 : page, pageSize);
      console.log('TeamApiService.getTeams result in hook:', data);
      setTeams((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === pageSize);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки команд');
      showErrorNotification(e instanceof Error ? e.message : 'Ошибка загрузки команд');
      // Возвращаем моки при ошибке
      setTeams(mockTeams);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('useEffect triggered, page:', page);
    fetchTeams(page === 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadNextPage = () => {
    if (!loading && hasMore) setPage((p) => p + 1);
  };

  const refresh = () => {
    setPage(1);
    setTeams([]);
    fetchTeams(true);
  };

  return { teams, loading, error, page, hasMore, loadNextPage, refresh };
}
