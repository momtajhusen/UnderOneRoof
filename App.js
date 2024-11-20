import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';

const App = () => {
  return (
          <NavigationContainer>
              <StatusBar barStyle="light-content" backgroundColor="black" />
              <StackNavigation />
          </NavigationContainer>
  );
};


export default App;
