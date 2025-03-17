import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable, Image } from 'react-native';

import B2BHomeScreen from '../screens/B2B/HomeAndBrowse/B2BHomeSceeen';
import B2BAccountScreen from '../screens/B2B/Accounts/B2BAccountScreen';
import CategoryScreen from '../screens/CommonScreen/CategorysScreen';
import CartScreen from '../screens/CommonScreen/CartScreen';
import { AppContext } from '../context/AppContext';
import { useViewCartData } from '../utility/viewCardDataUtils';

import { rw, rh, rf } from '../Service/responsive';

const Tab = createBottomTabNavigator();

const B2BBottomNavigator = () => {
  const { state, dispatch } = useContext(AppContext);

  const cartCount = state.viewCartData?.cartProduct?.length ?? 0;

  const { isViewCartLoading, viewCartData } = useViewCartData();

  useEffect(() => {
    let isMounted = true;

    const fetchCartDetails = async () => {
      if (viewCartData && isMounted) {
        await viewCartData();
      }
    };

    fetchCartDetails();

    return () => {
      isMounted = false; 
    };
  }, [state.isHomeRefresh]);

  return (
    <Tab.Navigator
      lazy={true}
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
        name="B2BHome"
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
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        }}
      />

      <Tab.Screen
        name="B2BCategory"
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
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        }}
      />

      <Tab.Screen
        name="B2BCart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={
                  focused
                    ? require('../assets/navigation-icon/cart-1.png')
                    : require('../assets/navigation-icon/cart-2.png')
                }
                resizeMode="cover"
                style={{ width: rf(3.5), height: rf(3.5) }}
              />
              {cartCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: 5,  
                    top: 0, 
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: rf(1.2), fontWeight: 'bold' }}>
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        }}
      />

      <Tab.Screen
        name="B2BAccount"
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
          tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default B2BBottomNavigator;
