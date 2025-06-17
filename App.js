import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { AppProvider } from './context/AppContext';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
    <AppProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppProvider>
    </MenuProvider>
  );
};

export default App;