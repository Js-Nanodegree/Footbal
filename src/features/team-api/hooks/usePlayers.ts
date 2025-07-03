import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersThunk } from '../redux/playerSlice';
import { RootState } from '../../../shared/api/store';

export const usePlayers = (teamId: number) => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    if (teamId) {
      dispatch(fetchPlayersThunk(teamId));
    }
  }, [dispatch, teamId]);

  return { players, loading, error };
}; 