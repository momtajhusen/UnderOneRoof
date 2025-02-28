import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  RefreshControl,
  Clipboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../Service/themes/responsive';
import SearchDesigne from '../../../components/Search/searchDesigne';
import HomeSlider from '../../../components/Sliders/HomeSlider';
import ExploreMoreSlider from '../../../components/Sliders/ExploreMoreSlider';
import BestSellers from './HomeComponents/BestSellers';
import ShopByCategory from './HomeComponents/ShopByCategory';
import Section1 from './HomeComponents/section1';
import Section2 from './HomeComponents/section2';
import Catsection from './HomeComponents/Catsection';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../Service/apiClient';
import { AppContext } from '../../../context/AppContext';
import { registerForPushNotificationsAsync } from '../../../NotificationService';

const HomeScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);
  const [homeData, setHomeData] = useState(null);

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#FF6D6D');
  });

  const onRefresh = async () => {
    fetchHomeData();
  };

  const fetchHomeData = async () => {
    try {
      const response = await apiClient.get('/home');
      setHomeData(response.data.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  // Notification Expo Token Update
  useEffect(() => {
    const updateExpoToken = async () => {
      try {
        const expoPushToken = await registerForPushNotificationsAsync();
        console.log('Expo Token:', expoPushToken);

        if (expoPushToken) {
          dispatch({
            type: 'SET_EXPO_TOKEN',
            payload: { expoToken: expoPushToken },
          });
          // Update token in API
          const updateResponse = await apiClient.post('/notifications/update-expo-token', {
            expo_token: expoPushToken,
          });
          console.log('Update response:', updateResponse.data);
        } else {
          console.log('Expo push token not received.');
          dispatch({
            type: 'SET_EXPO_TOKEN',
            payload: {
              expoToken: 'Push notification token was not received. Please check your permissions.',
            },
          });
        }
      } catch (error) {
        console.error('Error updating expo token:', error);
      }
    };

    updateExpoToken();
  }, [state.userId]);

  // Fetch data once the screen is considered "loaded"
  useEffect(() => {
    if (isScreenLoaded) {
      fetchHomeData();
    }
  }, [isScreenLoaded]);

  // Force a refresh once on mount
  useEffect(() => {
    dispatch({
      type: 'HOME_REFRESH',
      payload: { isHomeRefresh: Math.ceil(Math.random() * 100) },
    });
  }, []);

  // Mark screen as loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const lastTapRef = useRef(0);
  // Double-tap header to copy expoToken
  const handleHeaderTap = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      // Double tap detected
      if (state.expoToken) {
        Clipboard.setString(state.expoToken);
      }
    }
    lastTapRef.current = now;
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FF6D6D" />

      <View style={styles.container}>
        {/* ----------------- Header Section ----------------- */}
        <LinearGradient
          colors={['#FF6D6D', '#FF6D6D33']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <TouchableOpacity
            onPress={handleHeaderTap}
            style={{ position: 'absolute', top: rh(4), zIndex: 100 }}
          >
            <Text style={styles.headerTitle}>Shop Your Daily Essentials</Text>
            <Text style={styles.headerSubtitle}>
              From groceries to personal care, everything you {'\n'} need in one place.
            </Text>
          </TouchableOpacity>

          {/* Image #1: fadeInUp for 1s, stays visible afterwards */}
          <Animatable.Image
            animation="fadeInUp"
            duration={1000}
            iterationCount={1}
            useNativeDriver={true}
            source={require('../../../assets/HeaderImage/image1.png')}
            style={styles.imageCup}
            resizeMode="cover"
          />

          {/* Image #2: fadeInRight (default ~1s) */}
          <Animatable.Image
            animation="fadeInRight"
            iterationCount={1}
            useNativeDriver={true}
            source={require('../../../assets/HeaderImage/Cheaseedsleaves.png')}
            style={{
              position: 'absolute',
              width: rw(25),
              height: rh(22),
              right: rw(0),
              top: rh(0),
            }}
          />

          <Animatable.Image
            source={require('../../../assets/HeaderImage/image4.png')}
            useNativeDriver={true}
            animation="fadeInLeft"
            style={{
              width: rw(25),
              height: rh(18),
              position: 'absolute',
              left: rw(0),
              top: rh(0),
            }}
            resizeMode="cover"
          />

          {/* Search bar at the bottom of the header */}
          <View style={{ position: 'absolute', bottom: rh(10) }}>
            <SearchDesigne onPress={() => navigation.navigate('SearchScreen')} />
          </View>
        </LinearGradient>
        {/* ----------------- End Header Section ----------------- */}

        {/* Slider & Categories Section */}
        <View style={styles.SliderCategoryContainer}>
          <View style={{ paddingTop: rh(5) }}>
            <HomeSlider
              sliderData={homeData?.slider?.length ? homeData.slider : []}
              sliderStyle={{ width: rw(80), height: rh(17) }}
            />
          </View>

          <View style={{ marginTop: rh(2) }}>
            <BestSellers data={homeData} />
          </View>

          {/* Shop By Category */}
          <View>
            <ShopByCategory data={homeData} />
          </View>

          {/* Explore More Slider */}
          <View>
            <ExploreMoreSlider data={homeData} />
          </View>

          {/* Section 1 */}
          <View>
            <Section1 data={homeData} />
          </View>

          {/* Category Section */}
          <View>
            <Catsection data={homeData} />
          </View>

          {/* Section 2 */}
          <View style={{ marginBottom: rh(2), paddingLeft: rw(2) }}>
            <Section2 data={homeData} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: rh(30),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(5),
    paddingVertical: rh(2),
  },
  headerTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: rf(1.5),
    color: '#fff',
    textAlign: 'center',
    marginTop: rh(1),
  },
  SliderCategoryContainer: {
    // Positions content above the background color
    marginTop: -rh(5),
    backgroundColor: '#F3F3F3',
  },
  imageCup: {
    position: 'absolute',
    width: rw(80),
    height: rh(13),
    bottom: rh(3),
    // If you see any clipping, try adding zIndex:
    // zIndex: 10,
  },
});
