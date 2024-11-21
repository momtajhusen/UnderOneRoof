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
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FF3131",
        tabBarInactiveTintColor: "#6C6C6C",
        tabBarStyle: {
          backgroundColor: "white",
          height: rh(10),
          paddingTop: rh(1),
          borderTopWidth: 0,
          paddingBottom: rh(1),
        },
        tabBarLabelStyle: {
          fontSize: rf(1.5),
          paddingBottom: rh(1.5),
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? "home" : "home"} // Filled when active, outline when inactive
              color={color} 
              size={rf(3.5)} 
            />
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "widgets" : "widgets-outline"} // Filled when active, outline when inactive
              color={color} 
              size={rf(3.5)} 
            />
          ),
        }} 
      />

      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "cart" : "cart-outline"} // Filled when active, outline when inactive
              color={color} 
              size={rf(3.5)} 
            />
          ),
        }} 
      />

      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "account" : "account-outline"} // Filled when active, outline when inactive
              color={color} 
              size={rf(3.5)} 
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
