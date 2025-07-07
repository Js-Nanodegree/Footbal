import React, { useEffect } from 'react';
import Screen from './screen';
import { AppContextProvider } from 'src/features/home-screen/context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeScreenData } from 'src/features/home-screen/redux/homeScreenSlice';

export default function HomeScreenConnected() {
  const dispatch = useDispatch();
  const { competitions, teams, matches, loading, error, selectedLeagueId, selectedTeamIds } = useSelector((state: any) => state.homeScreen);

  useEffect(() => {
    dispatch(fetchHomeScreenData());
  }, [dispatch]);

  return (
    <AppContextProvider>
      <Screen
        competitions={competitions}
        teams={teams}
        matches={matches}
        loading={loading}
        error={error}
        onRefresh={() => dispatch(fetchHomeScreenData())}
        onPaginate={() => {}}
      />
    </AppContextProvider>
  );
}
