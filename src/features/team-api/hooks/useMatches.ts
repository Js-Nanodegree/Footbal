import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchesThunk } from '../redux/matchSlice';
import { RootState } from '../../../shared/api/store';

export const useMatches = (teamId: number) => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state: RootState) => state.matches);

  useEffect(() => {
    if (teamId) {
      dispatch(fetchMatchesThunk(teamId));
    }
  }, [dispatch, teamId]);

  return { matches, loading, error };
}; 