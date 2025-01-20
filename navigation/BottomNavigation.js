import React,{useEffect, useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable, Image } from 'react-native';

import HomeScreen from '../screens/B2C/HomeAndBrowse/HomeScreen';
import CartScreen from '../screens/CommonScreen/CartScreen';
import AccountScreen from '../screens/B2C/Accounts/AccountScreen';
import CategoryScreen from '../screens/CommonScreen/CategorysScreen';
import { rw, rh, rf } from '../Service/responsive';
import { AppContext } from '../context/AppContext';
import { useViewCartData } from '../utility/viewCardDataUtils';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { state, dispatch } = useContext(AppContext);

  const cartCount = state.viewCartData?.cartProduct?.length ?? 0;

  const { isViewCartLoading, viewCartData } = useViewCartData();

  const fetchCartDetails = async () => {
      const result = await viewCartData();
  };

  useEffect(() => {
      fetchCartDetails();
  }, []);

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
                    right: -10,
                    top: -5,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: rf(1.2) }}>
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>
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
