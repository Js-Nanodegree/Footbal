import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompetitionsScreen from '../screens/CompetitionsScreen';
import CompetitionDetailsScreen from '../screens/CompetitionDetailsScreen';
import StandingsScreen from '../screens/StandingsScreen';
import TeamListScreen from '../screens/TeamListScreen';
import TeamDetailsScreen from '../screens/TeamDetailsScreen';
import StyleguideScreen from '../screens/StyleguideScreen';
import { Text } from 'react-native';
import ActionListDemoScreen from '../screens/ActionListDemoScreen';
import CollapsibleHeaderDemoScreen from '../screens/CollapsibleHeaderDemoScreen';
import ErrorStateDemoScreen from '../screens/ErrorStateDemoScreen';
import FABScrollToTopDemoScreen from '../screens/FABScrollToTopDemoScreen';
import TeamPastMatchesScreen from '../screens/TeamPastMatchesScreen';
import { Competition } from '../features/team-api/types/competition';
import NetworkStatusBar from '../shared/ui/tab-bar/NetworkStatusBar';
import HomeScreen from 'src/screens/HomeScreen';
import FinishedMatchesScreen from 'src/features/home-screen/components/FinishedMatchesScreen';
import { footballApi } from 'src/features/team-api/services/footballApi';
import MatchHistoryScreen from '../features/match-history/Screen';

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
    MatchHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <>
        <Tab.Navigator
            screenOptions={( { route } ) => ( {
                headerShown: false,
                tabBarLabel: ( { focused } ) =>
                {
                    let label = '';
            if ( route.name === 'Competitions' ) label = 'Турниры';
            if ( route.name === 'Teams' ) label = 'Команды';
            if ( route.name === 'Styleguide' ) label = 'Стайлгайд';
            return (
                        <Text
                            style={{
                                color: focused ? '#E94057' : '#B0B0B0',
                                fontWeight: focused ? 'bold' : 'normal',
                                fontSize: 12,
                            }}
                        >
                            {label}
                        </Text>
                    );
                },
                tabBarIcon: ( { focused } ) =>
                {
                    let icon = '';
                    if ( route.name === 'Competitions' ) icon = '🏆';
                    if ( route.name === 'Teams' ) icon = '👥';
                    if ( route.name === 'Styleguide' ) icon = '🎨';
                    return (
                        <Text style={{ fontSize: 20, color: focused ? '#E94057' : '#B0B0B0' }}>{icon}</Text>
                    );
                },
                tabBarStyle: {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    height: 64,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 8,
                    elevation: 8,
                },
            } )}
        >
            <Tab.Screen name="Competitions" component={HomeScreen} />
            <Tab.Screen name="Teams" component={TeamListScreen} />
            <Tab.Screen name="Styleguide" component={StyleguideScreen} />
        </Tab.Navigator>
        <NetworkStatusBar />
    </>
);

const RootNavigator = () =>
{
    const { data: competitions } = footballApi.endpoints.getLeagues.useQuery( {} );

    return (
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
              initialParams={{
                  competitions: competitions?.[ 0 ] || {},
              }}
          />
            <Stack.Screen
                name="MatchHistory"
                component={MatchHistoryScreen}
                options={{ title: 'История матчей', headerShown: false }}
            />
            <Stack.Screen
              name="FinishedMatches"
              component={FinishedMatchesScreen}
              options={{ title: 'Завершённые матчи', headerShown: false }}
          />
          {/* <Stack.Screen name="CompetitionDetails" component={CompetitionDetailsScreen} options={{ title: 'Детали турнира', headerShown: false }} />
        <Stack.Screen name="Standings" component={StandingsScreen} options={{ title: 'Турнирная таблица', headerShown: false }} />
        <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} options={{ title: 'Детали команды', headerShown: false }} />
        <Stack.Screen name="TeamPastMatches" component={TeamPastMatchesScreen} options={{ title: 'Прошедшие матчи', headerShown: false }} />
        <Stack.Screen name="ActionListDemo" component={ActionListDemoScreen} options={{ title: 'Action List Demo', headerShown: false }} />
        <Stack.Screen name="CollapsibleHeaderDemo" component={CollapsibleHeaderDemoScreen} options={{ title: 'Collapsible Header Demo', headerShown: false }} />
        <Stack.Screen name="ErrorStateDemo" component={ErrorStateDemoScreen} options={{ title: 'Error State Demo', headerShown: false }} />
        <Stack.Screen name="FABScrollToTopDemo" component={FABScrollToTopDemoScreen} options={{ title: 'FAB Scroll To Top Demo', headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
