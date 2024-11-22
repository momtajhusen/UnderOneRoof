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
import SignupOrLogin from '../screens/Auth/SignupOrLogin';
import VerifyOtp from '../screens/Auth/VerifyOtp';
import ShoppingMode from '../screens/Auth/ShoppingMode';
import AddressBook from '../screens/B2C/CartComponents/AddressBook';
import HelpSupport from '../screens/B2C/AccountComponents/HelpSupport';
import TermsConditions from '../screens/B2C/AccountComponents/TermsConditions';
import PrivacyPolicy from '../screens/B2C/AccountComponents/PrivacyPolicy';

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
        {/* Screen navigation  */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        {/* Auth navigation  */}
        <Stack.Screen name="SignupOrLogin" component={SignupOrLogin} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
        <Stack.Screen name="ShoppingMode" component={ShoppingMode} options={{ headerShown: false }} />
        <Stack.Screen name="AddressBook" component={AddressBook} options={{ headerShown: false }} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />

     </Stack.Navigator>
    );
};

//make this component available to the app
export default StackNavigation;
