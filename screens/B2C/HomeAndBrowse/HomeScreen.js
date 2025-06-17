import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Clipboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
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
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../Service/apiClient';
import { AppContext } from '../../../context/AppContext';
import { registerForPushNotificationsAsync } from '../../../NotificationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Wrap native Image for animation
const AnimImage = Animatable.createAnimatableComponent(Image);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);
  const [homeData, setHomeData] = useState(null);

  const onRefresh = async () => fetchHomeData();

  const fetchHomeData = async () => {
    try {
      const response = await apiClient.get('/home');
      setHomeData(response.data.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    const updateExpoToken = async () => {
      try {
        const expoPushToken = await registerForPushNotificationsAsync();
        if (expoPushToken) {
          dispatch({ type: 'SET_EXPO_TOKEN', payload: { expoToken: expoPushToken } });
          await apiClient.post('/notifications/update-expo-token', {
            expo_token: expoPushToken,
          });
        }
      } catch (error) {
        console.error('Error updating expo token:', error);
      }
    };

    updateExpoToken();
  }, [state.userId]);

  useEffect(() => {
    if (isScreenLoaded) fetchHomeData();
  }, [isScreenLoaded]);

  useEffect(() => {
    dispatch({
      type: 'HOME_REFRESH',
      payload: { isHomeRefresh: Math.ceil(Math.random() * 100) },
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsScreenLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const lastTapRef = useRef(0);
  const handleHeaderTap = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300 && state.expoToken) {
      Clipboard.setString(state.expoToken);
    }
    lastTapRef.current = now;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      <StatusBar hidden />

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* -------- Header -------- */}
        <LinearGradient
          colors={['#FF6D6D', '#FF6D6D33']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.headerContainer,
            {
              paddingTop: rh(2),
              height: rh(30),
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleHeaderTap}
            style={{ zIndex: 100 }}
          >
            <View style={styles.textWrapper}>
              <Text style={styles.headerTitle}>Shop Your Daily Essentials</Text>
              <Text style={styles.headerSubtitle}>
                From groceries to personal care, everything you {'\n'} need in one place.
              </Text>
            </View>
          </TouchableOpacity>

          <AnimImage
            animation="fadeInUp"
            duration={1000}
            source={require('../../../assets/HeaderImage/image1.png')}
            style={styles.imageCup}
            resizeMode="cover"
          />

          <AnimImage
            animation="fadeInRight"
            duration={1000}
            source={require('../../../assets/HeaderImage/Cheaseedsleaves.png')}
            style={styles.imageRight}
            resizeMode="cover"
          />

          <AnimImage
            animation="fadeInLeft"
            duration={1000}
            source={require('../../../assets/HeaderImage/image4.png')}
            style={styles.imageLeft}
            resizeMode="cover"
          />
        </LinearGradient>

        <View style={styles.searchWrapper}>
          <SearchDesigne onPress={() => navigation.navigate('SearchScreen')} />
        </View>

        {/* -------- Body -------- */}
        <View style={styles.SliderCategoryContainer}>
          <View style={{ paddingTop: rh(5) }}>
            <HomeSlider
              sliderData={homeData?.slider || []}
              sliderStyle={{ width: rw(80), height: rh(17) }}
            />
          </View>

          <View style={{ marginTop: rh(2) }}>
            <BestSellers data={homeData} />
          </View>

          <ShopByCategory data={homeData} />
          <ExploreMoreSlider data={homeData} />

          <View style={{ marginTop: rh(2) }}>
            <Section1 data={homeData} />
          </View>

          <Catsection data={homeData} />

          <View style={{ marginBottom: rh(2), paddingLeft: rw(2) }}>
            <Section2 data={homeData} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'absolute',
    top: rh(23),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(5),
    position: 'relative',
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: rh(3),
    marginBottom: rh(13),
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
    marginTop: rh(0),
  },
  SliderCategoryContainer: {
    marginTop: -rh(5),
    backgroundColor: '#F3F3F3',
    paddingHorizontal: rw(3),
  },
  imageCup: {
    position: 'absolute',
    width: rw(80),
    height: rh(13),
    bottom: rh(3),
  },
  imageRight: {
    position: 'absolute',
    width: rw(25),
    height: rh(22),
    right: rw(0),
    top: rh(0),
  },
  imageLeft: {
    position: 'absolute',
    width: rw(25),
    height: rh(18),
    left: rw(0),
    top: rh(0),
  },
});
