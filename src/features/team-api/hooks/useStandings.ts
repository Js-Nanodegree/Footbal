import { useEffect, useState, useCallback } from 'react';
import { Standing } from '../types/standing';
import { CompetitionApiService } from '../services/competitionApi';
import { getCache, setCache } from '../../../shared/memory-bank/mmkvMemoryBank';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

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
  const [ firstLoad, setFirstLoad ] = useState( true );

  const CACHE_KEY = `standings_${ competitionId }`;

  const fetchStandings = useCallback( async ( forceRefresh = false ) =>
  {
    setLoading(true);
    setError(null);
    try {
      const data = await CompetitionApiService.getStandings(competitionId, client, API_KEY, axiosOptions);
      setStandings(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки таблицы');
      showErrorNotification( e instanceof Error ? e.message : 'Ошибка загрузки таблицы' );
    } finally {
      setLoading(false);
      setFirstLoad( false );
    }
  }, [ competitionId, client, API_KEY, axiosOptions, firstLoad ] );

  useEffect(() => {
    if (competitionId) fetchStandings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStandings, competitionId]);

  const refresh = useCallback( () =>
  {
    fetchStandings( true );
  }, [ fetchStandings ] );

  return { standings, loading, error, refresh };
} 