import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

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
            focused ? (
              <Image 
                source={require('../assets/navigation-icon/home-1.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            ) : (
              <Image 
                source={require('../assets/navigation-icon/home-2.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            )
            // <MaterialIcons 
            //   name={focused ? "home" : "home"} 
            //   color={color} 
            //   size={rf(3.5)} 
            // />
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, focused }) => (
            focused ? (
              <Image 
                source={require('../assets/navigation-icon/category-1.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            ) : (
              <Image 
                source={require('../assets/navigation-icon/category-2.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            )
            // <MaterialCommunityIcons 
            //   name={focused ? "widgets" : "widgets-outline"} 
            //   color={color} 
            //   size={rf(3.5)} 
            // />
          ),
        }} 
      />

      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            focused ? (
              <Image 
                source={require('../assets/navigation-icon/cart-1.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            ) : (
              <Image 
                source={require('../assets/navigation-icon/cart-2.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            )
            // <MaterialCommunityIcons 
            //   name={focused ? "cart" : "cart-outline"} 
            //   color={color} 
            //   size={rf(3.5)} 
            // />
          ),
        }} 
      />

      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            focused ? (
              <Image 
                source={require('../assets/navigation-icon/account-1.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            ) : (
              <Image 
                source={require('../assets/navigation-icon/account-2.png')} 
                resizeMode="cover" 
                style={{ width: rf(3.5), height: rf(3.5) }} 
              />
            )
            // <MaterialCommunityIcons 
            //   name={focused ? "account" : "account-outline"} 
            //   color={color} 
            //   size={rf(3.5)} 
            // />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
