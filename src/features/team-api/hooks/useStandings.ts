import { useEffect, useState, useCallback } from 'react';
import { Standing } from '../types/standing';
import { CompetitionApiService } from '../services/competitionApi';

interface UseStandingsResult {
  standings: Standing[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useStandings(
  competitionId: number,
  client: 'fetch' | 'axios' = 'fetch',
  API_KEY: string,
  axiosOptions?: any
): UseStandingsResult {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CompetitionApiService.getStandings(competitionId, client, API_KEY, axiosOptions);
      setStandings(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки таблицы');
    } finally {
      setLoading(false);
    }
  }, [competitionId, client, API_KEY, axiosOptions]);

  useEffect(() => {
    if (competitionId) fetchStandings();
  }, [fetchStandings, competitionId]);

  return { standings, loading, error, refresh: fetchStandings };
} 