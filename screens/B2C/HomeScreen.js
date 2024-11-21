import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/themes/responsive';
import SearchDesigne from '../../components/Search/searchDesigne';
import HomeSlider from '../../components/Sliders/HomeSlider';
import BestSellers from './HomeComponents/BestSellers';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Shop Your Daily Essentials</Text>
        <Text style={styles.headerSubtitle}>
          From groceries to personal care, everything you need in one place.
        </Text>
        <SearchDesigne />
      </View>
      {/* Slider & Categories Section */}
      <View style={styles.SliderCategoryContainer}>
        {/* Slider Container */}
        <View style={{paddingTop:rh(5)}}>
          <HomeSlider />        
        </View>
        {/* Bestsellers Category Container  */}
        <View>
            <BestSellers />
        </View>
        {/* Shop By Category Container  */}
        <View style={{height:rh(15)}}>
    
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#FF5454',
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
    backgroundColor:"#ddd"
  },
  categoryText: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: rh(2),
  },
});
