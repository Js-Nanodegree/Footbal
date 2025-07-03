import React from 'react';
import { View, Text } from 'react-native';

export default {
  title: 'Welcome',
  component: () => (
    <View>
      <Text>Storybook работает!</Text>
    </View>
  ),
};

export const Default = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Storybook работает!</Text>
  </View>
);
