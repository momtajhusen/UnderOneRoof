import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
