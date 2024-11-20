import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/B2C/HomeScreen';
import CategoryScreen from '../screens/B2C/CategorysScreen';
import CartScreen from '../screens/B2C/CartScreen';
import AccountScreen from '../screens/B2C/AccountScreen';
import { rw, rh, rf } from '../Service/responsive';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#FF3131", // Corrected spelling
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
          height: rh(10), // Responsive tab bar height
          paddingTop: rh(1), // Adjusted padding to ensure space for icons and text
          borderTopWidth: 0,
          paddingBottom: rh(1),
        },
        tabBarLabelStyle: { 
          fontSize: rf(1.5), // Responsive font size for label
          paddingBottom: rh(1.5), // Adjusted padding for label space
          fontWeight: 'bold', 
          textAlign: 'center', // Ensures label is centered below the icon
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home', 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }} 
      />
      
     <Tab.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{
          title: 'Category', 
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="widgets" color={color} size={size} />
          ),
        }} 
      />

      <Tab.Screen 
        name="CartScreen" 
        component={CartScreen} 
        options={{
          title: 'CartScreen', 
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }} 
      />

     <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          title: 'Account', 
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} 
      />

    </Tab.Navigator>
  );
};

export default BottomNavigator;
