import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Image } from 'react-native';

import HomeScreen from '../screens/B2C/HomeAndBrowse/HomeScreen';
import CartScreen from '../screens/B2C/Cart&Checkout/CartScreen';
import AccountScreen from '../screens/B2C/Accounts/AccountScreen';
import CategoryScreen from '../screens/B2C/Categorys/CategorysScreen';
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
        component={CategoryScreen}
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
        component={AccountScreen}
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

export default BottomNavigator;
