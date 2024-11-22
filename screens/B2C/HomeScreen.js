import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../Service/themes/responsive';
import SearchDesigne from '../../components/Search/searchDesigne';
import HomeSlider from '../../components/Sliders/HomeSlider';
import ExploreMoreSlider from '../../components/Sliders/ExploreMoreSlider';
import BestSellers from './HomeComponents/BestSellers';
import ShopByCategory from './HomeComponents/ShopByCategory';
import RefreshYourDay from './HomeComponents/RefreshYourDay';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  return (
    <ScrollView>
     {/* <StatusBar barStyle="dark-content" backgroundColor="#FF6D6D" /> */}

      <View style={styles.container}>
        {/* Header Section */}
        <LinearGradient
          colors={['#FF6D6D', '#FF6D6D33']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={{position:"absolute", top:rh(4), zIndex:100}}>
            <Text style={styles.headerTitle}>Shop Your Daily Essentials</Text>
            <Text style={styles.headerSubtitle}>
              From groceries to personal care, everything you need in one place.
            </Text>
          </View>
          <Animatable.Image animation="fadeInUp" source={require('../../assets/HeaderImage/image1.png')} style={styles.imageCup} resizeMode="cover" />
          <Animatable.Image animation="fadeInRight" source={require('../../assets/HeaderImage/Cheaseedsleaves.png')} style={{position:"absolute", right:rw(0), top:rh(4)}} resizeMode="cover" />
          <Animatable.Image animation="fadeInLeft" source={require('../../assets/HeaderImage/image4.png')} style={{position:"absolute", left:rw(-15), top:rh(-3)}} resizeMode="cover" />
          <View style={{position:"absolute", bottom:rh(10)}}>
             <SearchDesigne />
          </View>
        </LinearGradient>
        {/* Slider & Categories Section */}
        <View style={styles.SliderCategoryContainer}>
          {/* Slider Container */}
          <View style={{ paddingTop: rh(5) }}>
            <HomeSlider />
          </View>
          {/* Bestsellers Category Container */}
          <View>
            <BestSellers />
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
    fontSize: rf(3),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: rf(2),
    color: '#fff',
    textAlign: 'center',
    marginTop: rh(1),
  },
  SliderCategoryContainer: {
    backgroundColor: '#fff',
    marginTop: -rh(5), // To create a floating effect below the header
    backgroundColor: "#ddd",
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
