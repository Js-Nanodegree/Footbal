import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/roads/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/shared/api/store';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { setCache, NETWORK_STATUS_KEY } from './src/shared/memory-bank/mmkvMemoryBank';
import { useEffect } from 'react';
import { OverlayProvider } from './src/shared/ui/OverlayContext';

const NetworkStatusSync: React.FC = () =>
{
  useEffect( () =>
  {
    const unsubscribe = NetInfo.addEventListener( ( state ) =>
    {
      setCache( NETWORK_STATUS_KEY, !!state.isConnected );
    } );
    return () => unsubscribe();
  }, [] );
  return null;
};

const App = () => (
  <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <OverlayProvider>
          <NotifierWrapper>
            <NetworkStatusSync />
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </NotifierWrapper>
        </OverlayProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </Provider>
);

export default App;
