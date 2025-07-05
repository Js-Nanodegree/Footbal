import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/roads/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/shared/api/store';

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  </React.StrictMode>
);

export default App;
