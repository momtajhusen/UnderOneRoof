import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Image } from 'react-native';

import B2BHomeScreen from '../screens/B2B/HomeAndBrowse/B2BHomeSceeen';
import CartScreen from '../screens/B2C/Cart&Checkout/CartScreen';
import B2BAccountScreen from '../screens/B2B/Accounts/B2BAccountScreen';
import B2BCategoryScreen from '../screens/B2B/HomeAndBrowse/B2BCategoryScreen';
import { rw, rh, rf } from '../Service/responsive';

const Tab = createBottomTabNavigator();

const B2BBottomNavigator = () => {
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
        component={B2BHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
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
          ),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />

      <Tab.Screen
        name="Category"
        component={B2BCategoryScreen}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ focused }) => (
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
          ),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
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
          ),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={B2BAccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => (
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
          ),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default B2BBottomNavigator;
