import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchesThunk } from '../redux/matchSlice';
import { RootState } from '../../../shared/api/store';
import { mockMatches } from '../mocks/matches';

export const useMatches = (teamId?: number) => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state: RootState) => state.matches);

  useEffect(() => {
    if (teamId) {
      dispatch(fetchMatchesThunk(teamId));
    }
  }, [dispatch, teamId]);

  // Если matches пустой — возвращаем моки
  return { matches: matches && matches.length > 0 ? matches : mockMatches, loading, error };
}; 