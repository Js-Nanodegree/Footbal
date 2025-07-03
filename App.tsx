/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text } from 'react-native';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';

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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppEntry />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
