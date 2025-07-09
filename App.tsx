import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigator from './src/roads/RootNavigator';
import { store } from './src/shared/api/store';
import { NETWORK_STATUS_KEY, setCache } from './src/shared/memory-bank/mmkvMemoryBank';
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
