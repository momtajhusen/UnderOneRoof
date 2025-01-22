import React,{useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, ActivityIndicator, RefreshControl} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../Service/themes/responsive';
import SearchDesigne from '../../../components/Search/searchDesigne';
import HomeSlider from '../../../components/Sliders/HomeSlider';
import ExploreMoreSlider from '../../../components/Sliders/ExploreMoreSlider';
import BestSellers from './HomeComponents/BestSellers';
import ShopByCategory from './HomeComponents/ShopByCategory';
import RefreshYourDay from './HomeComponents/RefreshYourDay';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../Service/apiClient';
import { AppContext } from '../../../context/AppContext';


const HomeScreen = () => {
    const {state, dispatch } = useContext(AppContext);

  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  

  const [HomeSliderData, setHomeSliderData] = useState([]);


  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#FF6D6D");
  });

    const onRefresh = async () => {
        dispatch({
          type: 'HOME_REFRESH',
          payload: {
            isHomeRefresh: Math.ceil(Math.random() * 100),
          },
        });
    };

      // Fetch slider image from API
      useEffect(() => {
        const fetchHomeSliderData = async () => {
          try {
            const response = await apiClient.get('/home');
            const slider = response.data.data.slider;
            setHomeSliderData(slider);
            dispatch({
              type: 'HOME_REFRESH',
              payload: {
                isHomeRefresh: Math.ceil(Math.random() * 100),
              },
            });
          } catch (error) {
            console.error('Error fetching slider data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchHomeSliderData();
      }, [state.isHomeRefresh]);

  return (
    <ScrollView
        refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
    >
     <StatusBar barStyle="dark-content" backgroundColor="#FF6D6D" />

      <View style={styles.container}>
        {/* Header Section */}
        <LinearGradient
          colors={['#FF6D6D', '#FF6D6D33']} s
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={{position:"absolute", top:rh(4), zIndex:100}}>
            <Text style={styles.headerTitle}>Shop Your Daily Essentials</Text>
            <Text style={styles.headerSubtitle}>
              From groceries to personal care, everything you {'\n'} need in one place.
            </Text>
          </View>
          <Animatable.Image animation="fadeInUp"  source={require('../../../assets/HeaderImage/image1.png')} style={styles.imageCup} resizeMode="cover" />
          <Animatable.Image animation="fadeInRight"  source={require('../../../assets/HeaderImage/Cheaseedsleaves.png')} style={{position:"absolute", width:rw(25), height:rh(22), right:rw(0), top:rh(0)}}   />
          <Image source={require('../../../assets/HeaderImage/image4.png')} style={{width:rw(25), height:rh(18), position:"absolute", left:rw(0), top:rh(0)}} resizeMode="cover" />
          <View style={{position:"absolute", bottom:rh(10)}}>
             <SearchDesigne onPress={()=>navigation.navigate('SearchScreen')} />
          </View>
        </LinearGradient>
        {/* Slider & Categories Section */}
        <View style={styles.SliderCategoryContainer}>
          {/* Slider Container */}
          <View style={{ paddingTop: rh(5) }}>
            <HomeSlider sliderData={HomeSliderData} sliderStyle={{width: rw(80), height: rh(17)}}/>
          </View>
          {/* Bestsellers Category Container */}
          <View style={{marginTop:rh(2)}}>
            <BestSellers  />
          </View>
          {/* Shop By Category Container */}
          <View>
            <ShopByCategory />
          </View>
          {/* Explore More Slider Container */}
          <View>
            <ExploreMoreSlider />
          </View>
          {/* Refresh Your Day Container */}
          <View>
            <RefreshYourDay />
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
    backgroundColor: '#fff',
    marginTop: -rh(5), // To create a floating effect below the header
    backgroundColor: "#F3F3F3",
  },
  categoryText: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: rh(2),
  },
  imageCup:{
    position:"absolute",
    width:rw(80),
    height:rh(13),
    bottom:rh(3)
  }
});
