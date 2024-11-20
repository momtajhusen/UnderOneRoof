//import liraries
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigation';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from '../screens/Auth/splash';
import HomeScreen from '../screens/B2C/HomeScreen';
import CategoryScreen from '../screens/B2C/CategorysScreen';
import CartScreen from '../screens/B2C/CartScreen';
import AccountScreen from '../screens/B2C/AccountScreen';

const Stack = createNativeStackNavigator();

// create a component
const StackNavigation = () => {

    const navigation = useNavigation();
  
    return (
        <Stack.Navigator
        // screenOptions={{
        //   headerStyle: { backgroundColor: "white" },
        //   headerTitleStyle: { color: "black" },
        //   headerTintColor: "black",
        // }}
      > 
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
     </Stack.Navigator>
    );
};

//make this component available to the app
export default StackNavigation;
