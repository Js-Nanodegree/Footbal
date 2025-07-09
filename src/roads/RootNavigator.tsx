import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FinishedMatchesScreen from 'src/features/home-screen/components/FinishedMatchesScreen';
import { footballApi } from 'src/features/team-api/services/footballApi';
import HomeScreen from 'src/screens/HomeScreen';
import MatchHistoryScreen from '../features/match-history/Screen';
import { Competition } from '../features/team-api/types/competition';

export type RootStackParamList = {
    MainTabs: undefined;
    CompetitionDetails: { competition: Competition };
    Standings: { competitionId: number };
    TeamDetails: { teamId: number };
    TeamPastMatches: { teamId: number; teamName: string };
    ActionListDemo: undefined;
    CollapsibleHeaderDemo: undefined;
    ErrorStateDemo: undefined;
    FABScrollToTopDemo: undefined;
    FinishedMatches: undefined;
    MatchHistory:
    | {
        matchId?: number;
        homeId?: number;
        awayId?: number;
        venue?: 'home' | 'away';
        season?: string;
    }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const RootNavigator = () =>
{
    const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {} );

    return (
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen
                name="MainTabs"
                component={HomeScreen}
                options={{ headerShown: false }}
                initialParams={{
                  competitions: competitions?.[ 0 ] || {},
              }}
          />
          <Stack.Screen
              name="MatchHistory"
              component={MatchHistoryScreen}
              options={{ title: 'История матчей', headerShown: false }}
              getId={( props ) => props.params?.matchId?.toString() || ''}
          />
          <Stack.Screen
              name="FinishedMatches"
              component={FinishedMatchesScreen}
              options={{ title: 'Завершённые матчи', headerShown: false }}
            />
    </Stack.Navigator>
  );
};

export default RootNavigator;
