import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamListScreen from '../screens/TeamListScreen';
import TeamDetailsScreen from '../screens/TeamDetailsScreen';
import StyleguideScreen from '../screens/StyleguideScreen';
import { Text } from 'react-native';
import ActionListDemoScreen from '../screens/ActionListDemoScreen';
import CollapsibleHeaderDemoScreen from '../screens/CollapsibleHeaderDemoScreen';
import ErrorStateDemoScreen from '../screens/ErrorStateDemoScreen';
import FABScrollToTopDemoScreen from '../screens/FABScrollToTopDemoScreen';

export type RootStackParamList = {
    MainTabs: undefined;
    TeamDetails: { teamId: number };
    ActionListDemo: undefined;
    CollapsibleHeaderDemo: undefined;
    ErrorStateDemo: undefined;
    FABScrollToTopDemo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={( { route } ) => ( {
            headerShown: false,
            tabBarLabel: ( { focused } ) =>
            {
                let label = '';
                if ( route.name === 'Teams' ) label = 'Команды';
                if ( route.name === 'Styleguide' ) label = 'Стайлгайд';
                return (
                    <Text style={{ color: focused ? '#E94057' : '#B0B0B0', fontWeight: focused ? 'bold' : 'normal', fontSize: 12 }}>{label}</Text>
                );
            },
            tabBarIcon: ( { focused } ) =>
            {
                let icon = '';
                if ( route.name === 'Teams' ) icon = '🏆';
                if ( route.name === 'Styleguide' ) icon = '🎨';
                return <Text style={{ fontSize: 20, color: focused ? '#E94057' : '#B0B0B0' }}>{icon}</Text>;
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
        <Tab.Screen name="Teams" component={TeamListScreen} />
        <Tab.Screen name="Styleguide" component={StyleguideScreen} />
    </Tab.Navigator>
);

const RootNavigator = () => (
    <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} options={{ title: 'Детали команды' }} />
        <Stack.Screen name="ActionListDemo" component={ActionListDemoScreen} options={{ title: 'Action List Demo' }} />
        <Stack.Screen name="CollapsibleHeaderDemo" component={CollapsibleHeaderDemoScreen} options={{ title: 'Collapsible Header Demo' }} />
        <Stack.Screen name="ErrorStateDemo" component={ErrorStateDemoScreen} options={{ title: 'Error State Demo' }} />
        <Stack.Screen name="FABScrollToTopDemo" component={FABScrollToTopDemoScreen} options={{ title: 'FAB Scroll To Top Demo' }} />
    </Stack.Navigator>
);

export default RootNavigator; 