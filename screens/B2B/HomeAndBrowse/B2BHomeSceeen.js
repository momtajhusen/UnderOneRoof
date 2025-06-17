import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../Service/themes/responsive';
import SearchDesigne from '../../../components/Search/searchDesigne';
import HomeSlider from '../../../components/Sliders/HomeSlider';
import BestSellers from '../../B2C/HomeAndBrowse/HomeComponents/BestSellers';
import ShopByCategory from '../../B2C/HomeAndBrowse/HomeComponents/ShopByCategory';
import Essentials from './ComponentsSections/Essentials';
import PremiumDates from './ComponentsSections/PremiumDates';
import B2BSimilarProducts from './ComponentsSections/B2BSimilarProducts';
// import B2BCatSectionProducts from './ComponentsSections/B2BCatSectionProducts';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../../../context/AppContext';
import apiClient from '../../../Service/apiClient';

const B2BHomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);
  const [homeData, setHomeData] = useState(null);

  useFocusEffect(() => {
    // Android ke liye status bar background
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FBDFDF');
    }
  });

  const fetchHomeData = async () => {
    try {
      const response = await apiClient.get('/home');
      setHomeData(response.data.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    if (isScreenLoaded) fetchHomeData();
  }, [isScreenLoaded]);

  useEffect(() => {
    dispatch({
      type: 'HOME_REFRESH',
      payload: { isHomeRefresh: Math.ceil(Math.random() * 100) },
    });
  }, [isScreenLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = () => {
    dispatch({
      type: 'HOME_REFRESH',
      payload: { isHomeRefresh: Math.ceil(Math.random() * 100) },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBDFDF" />

      {/* Header Section with Gradient */}
      <LinearGradient
        colors={['#FBDFDF', '#EBEBEB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top + rh(2),
            height: insets.top + rh(15),
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>Find Your All Shop Need</Text>
          <Text style={styles.headerTitle}>UnderOneRoof</Text>
        </View>
      </LinearGradient>

      {/* Search bar outside gradient */}
      <View style={[styles.searchWrapper, { top: insets.top + rh(13) }]}>
        <SearchDesigne onPress={() => navigation.navigate('SearchScreen')} />
      </View>

      {/* Body Scrollable */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.SliderCategoryContainer}>
          <View style={{ paddingTop: rh(6) }}>
            <HomeSlider
              sliderData={homeData?.slider?.length ? homeData.slider : []}
              sliderStyle={{ width: rw(80), height: rh(20) }}
            />
          </View>

          <View style={{ marginTop: rh(2) }}>
            <BestSellers data={homeData} />
          </View>

          <View>
            <ShopByCategory data={homeData} />
          </View>

          <View>
            <HomeSlider
              sliderData={homeData?.slider?.length ? homeData.slider : []}
              sliderStyle={{ width: rw(80), height: rh(17) }}
            />
          </View>

          <View style={{ marginVertical: rh(2) }}>
            <Essentials />
          </View>

          <PremiumDates />

          {homeData?.section1 && (
            <View style={{ marginHorizontal: rw(4) }}>
              <B2BSimilarProducts data={homeData.section1} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default B2BHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingHorizontal: rw(5),
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: rf(1.5),
    color: '#FF5454',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: rf(3),
    fontWeight: 'bold',
    color: '#FF3131',
    textAlign: 'center',
    marginTop: rh(0.5),
  },
  searchWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  SliderCategoryContainer: {
    marginTop: rh(2),
    backgroundColor: '#F3F3F3',
  },
});
