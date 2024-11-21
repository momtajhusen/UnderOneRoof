import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content"
      />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
