import { useEffect, useState, useCallback } from 'react';
import { Competition } from '../types/competition';
import { CompetitionApiService } from '../services/competitionApi';
import { getCache, setCache } from '../../../memory-bank/watermelonMemoryBank';

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
    try {
      if (!forceRefresh && firstLoad) {
        const cached = await getCache<Competition[]>(CACHE_KEY);
        if (cached && cached.length > 0) {
          setCompetitions(cached);
          setLoading(false);
          setFirstLoad(false);
          return;
        }
      }
      const data = await CompetitionApiService.getCompetitions(client, API_KEY, axiosOptions);
      setCompetitions(data);
      setCache(CACHE_KEY, data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки турниров');
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