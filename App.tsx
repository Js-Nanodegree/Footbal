/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
// @ts-ignore: redux-persist/integration/react не имеет явных типов
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/shared/api/store';

const SplashScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
    <Text>Загрузка...</Text>
  </View>
);

const isStorybook = process.env.USE_STORYBOOK === 'true';

let AppEntry: React.ComponentType = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>FOOTBAL App</Text>
  </View>
);

if ( isStorybook )
{
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const StorybookUIRoot = require( './storybook' ).default;
  AppEntry = StorybookUIRoot;
}

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
