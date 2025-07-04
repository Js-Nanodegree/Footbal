/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { View, Text, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
// @ts-ignore: redux-persist/integration/react не имеет явных типов
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/shared/api/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamListScreen from './src/features/team-api/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MainTabParamList = {
  Teams: undefined;
  Matches: undefined;
  Players: undefined;
  Styleguide: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MatchesScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Матчи (заглушка)</Text>
  </View>
);

const PlayersScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Игроки (заглушка)</Text>
  </View>
);

const StyleguideScreen = () =>
{
  const MatchCard = require( './src/shared/ui/match-card/MatchCard' ).default;
  const Button = require( './src/shared/ui/button/Button' ).default;
  const Typography = require( './src/shared/ui/typography/Typography' ).default;
  const { SectionList, FlatList, Text, View } = require( 'react-native' );

  const styleguideSections = [
    {
      title: 'Карточки MatchScore',
      data: [
        [
          {
            label: 'Gradient',
            element: <MatchCard
              variant="gradient"
              homeTeam={{ name: 'Man United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }}
              awayTeam={{ name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }}
              homeScore={2}
              awayScore={3}
              league="Premier League"
              time="Week 10"
              isLive
              badgeText="LIVE"
              stadium="Old Trafford"
              backgroundLogo="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
            />
          },
          {
            label: 'White',
            element: <MatchCard
              variant="white"
              homeTeam={{ name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' }}
              awayTeam={{ name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }}
              homeScore={0}
              awayScore={3}
              league="Premier League"
              time="Week 10"
              badgeText="FT"
              stadium="Stamford Bridge"
              backgroundLogo="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
            />
          },
          {
            label: 'Purple',
            element: <MatchCard
              variant="purple"
              homeTeam={{ name: 'Newcastle', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' }}
              awayTeam={{ name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' }}
              homeScore={1}
              awayScore={1}
              league="Premier League"
              time="Week 10"
              badgeText="45+2'"
              stadium="St. James Park"
              backgroundLogo="https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg"
            />
          },
        ],
      ],
    },
    {
      title: 'Кнопки',
      data: [
        [
          { label: 'Primary', element: <Button title="Primary" variant="primary" onPress={() => { }} /> },
          { label: 'Secondary', element: <Button title="Secondary" variant="secondary" onPress={() => { }} /> },
          { label: 'Disabled', element: <Button title="Disabled" variant="primary" disabled onPress={() => { }} /> },
          { label: 'Loading', element: <Button title="Loading" variant="secondary" loading onPress={() => { }} /> },
        ],
      ],
    },
    {
      title: 'Тексты (Typography) Oswald',
      data: [
        [
          { label: 'H1 Oswald', element: <Typography variant="h1" font="Oswald" color="#222">Заголовок H1 (Oswald)</Typography> },
          { label: 'H2 Oswald', element: <Typography variant="h2" font="Oswald" color="#222">Заголовок H2 (Oswald)</Typography> },
          { label: 'Body Oswald', element: <Typography variant="body" font="Oswald" color="#222">Текст Body (Oswald)</Typography> },
          { label: 'Caption Oswald', element: <Typography variant="caption" font="Oswald" color="#222">Подпись Caption (Oswald)</Typography> },
        ],
      ],
    },
    {
      title: 'Тексты (Typography) Inter',
      data: [
        [
          { label: 'H1 Inter', element: <Typography variant="h1" font="Inter">Заголовок H1 (Inter)</Typography> },
          { label: 'H2 Inter', element: <Typography variant="h2" font="Inter">Заголовок H2 (Inter)</Typography> },
          { label: 'Body Inter', element: <Typography variant="body" font="Inter">Текст Body (Inter)</Typography> },
          { label: 'Caption Inter', element: <Typography variant="caption" font="Inter">Подпись Caption (Inter)</Typography> },
        ],
      ],
    },
  ];

  const insets = useSafeAreaInsets()

  return (
    <SectionList
      sections={styleguideSections}
      keyExtractor={( _, idx ) => idx.toString()}
      renderSectionHeader={( { section: { title } } ) => (
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>{title}</Text>
      )}
      renderItem={( { item } ) => (
        <FlatList
          data={item}
          horizontal
          keyExtractor={( _, idx ) => idx.toString()}
          renderItem={( { item } ) => (
            <View style={{ alignItems: 'center', marginRight: 16 }}>
              <Text style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{item.label}</Text>
              {item.element}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 8, paddingHorizontal: 16 }}
        />
      )}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
      ListFooterComponent={<View style={{ height: 32 }} />}
    />
  );
};

const BottomTabs = () => (
  <Tab.Navigator
    id={undefined}
    screenOptions={( { route } ) => ( {
      headerShown: false,
      tabBarLabel: ( { focused } ) =>
      {
        let label = '';
        if ( route.name === 'Teams' ) label = 'Команды';
        if ( route.name === 'Matches' ) label = 'Матчи';
        if ( route.name === 'Players' ) label = 'Игроки';
        if ( route.name === 'Styleguide' ) label = 'Стайлгайд';
        return (
          <Text style={{ color: focused ? '#E94057' : '#B0B0B0', fontWeight: focused ? 'bold' : 'normal', fontSize: 12 }}>
            {label}
          </Text>
        );
      },
      tabBarIcon: ( { focused } ) =>
      {
        // Текстовые иконки-заглушки
        let icon = '';
        if ( route.name === 'Teams' ) icon = '🏆';
        if ( route.name === 'Matches' ) icon = '⚽';
        if ( route.name === 'Players' ) icon = '👤';
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
    <Tab.Screen name="Matches" component={MatchesScreen} />
    <Tab.Screen name="Players" component={PlayersScreen} />
    <Tab.Screen name="Styleguide" component={StyleguideScreen} />
  </Tab.Navigator>
);

let AppEntry: React.ComponentType = () => (
  <NavigationContainer>
    <BottomTabs />
  </NavigationContainer>
);

const SplashScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
    <Text>Загрузка...</Text>
  </View>
);

const App = () =>
{
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppEntry />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
