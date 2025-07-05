import { useEffect, useState, useCallback } from 'react';
import { Competition } from '../types/competition';
import { CompetitionApiService } from '../services/competitionApi';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

interface UseCompetitionsResult {
  competitions: Competition[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const CACHE_KEY = 'competitions';

export function useCompetitions(
  client: 'fetch' | 'axios' = 'fetch',
  API_KEY: string,
  axiosOptions?: any
): UseCompetitionsResult {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchCompetitions = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try
    {
      const data = await CompetitionApiService.getCompetitions(client, API_KEY, axiosOptions);
      setCompetitions( data );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки турниров');
      showErrorNotification( e instanceof Error ? e.message : 'Ошибка загрузки турниров' );
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  }, [client, API_KEY, axiosOptions, firstLoad]);

  useEffect(() => {
    fetchCompetitions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCompetitions]);

  const refresh = useCallback(() => {
    fetchCompetitions(true);
  }, [fetchCompetitions]);

  return { competitions, loading, error, refresh };
} 