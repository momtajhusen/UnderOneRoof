import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { AppProvider } from './context/AppContext';
import { MenuProvider } from 'react-native-popup-menu';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <StatusBar
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      backgroundColor="transparent"
      translucent
    />
    <MenuProvider>
      <AppProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </AppProvider>
    </MenuProvider>
  </SafeAreaProvider>
);

export default App;
