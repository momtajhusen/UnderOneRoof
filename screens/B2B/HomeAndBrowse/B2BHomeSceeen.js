import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../Service/themes/responsive';
import SearchDesigne from '../../../components/Search/searchDesigne';
import HomeSlider from '../../../components/Sliders/HomeSlider';
import B2BBestSellers from './ComponentsSections/B2BBestSellers';
import B2BShopByCategory from './ComponentsSections/B2BShopByCategory';
import { useFocusEffect } from "@react-navigation/native";
import Essentials from './ComponentsSections/Essentials';
import PremiumDates from './ComponentsSections/PremiumDates';
import { useNavigation } from '@react-navigation/native';
import B2BSimilarProducts from './ComponentsSections/B2BSimilarProducts';


const B2BHomeScreen = () => {

  const navigation = useNavigation();


  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#FBDFDF");
  });

  const sliderData = [
    require('../../../assets/Slider/B2BBanner1.png'),
    require('../../../assets/Slider/B2BBanner2.png'),
    require('../../../assets/Slider/B2BBanner3.png'),
  ];

  const sliderData2 = [
    require('../../../assets/Slider/Banner 4.png'),
    require('../../../assets/Slider/Banner 4.png'),
    require('../../../assets/Slider/Banner 4.png'),
  ];

  // Dummy data for items
const dateItems = [
    {
        id: '1',
        name: 'Medjool Dates',
        image: require('../../../assets/items/image1345.png'),
    },
    {
        id: '2',
        name: 'Ajwa Dates',
        image: require('../../../assets/items/image23323.png'),
    },
    {
        id: '3',
        name: 'Barhi Dates',
        image: require('../../../assets/items/image3432.png'),
    },
    {
        id: '4',
        name: 'Deglet Noor',
        image: require('../../../assets/items/image3ww23.png'),
    },
];


  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBDFDF" />

        {/* Header Section */}
        <LinearGradient
          colors={['#FBDFDF', '#EBEBEB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={{position:"absolute", top:rh(4), zIndex:100}}>
            <Text style={{fontWeight:"bold", color:"#FF5454", fontSize:rf(1.5), textAlign:"center"}}>Find Your All Shop Need</Text>
            <Text style={styles.headerTitle}>UnderOneRoof</Text>
          </View>
          <View style={{position:"absolute", bottom:rh(8)}}>
             <SearchDesigne onPress={()=>navigation.navigate('B2BSearchScreen')} />
          </View>
        </LinearGradient>
        <ScrollView>
            {/* Slider & Categories Section */}
            <View style={styles.SliderCategoryContainer}>
            {/* Slider Container */}
            <View style={{ paddingTop: rh(5) }}>
                <HomeSlider sliderData={sliderData} sliderStyle={{width: rw(80), height: rh(20)}} />
            </View>
            {/* Bestsellers Category Container */}
            <View style={{marginTop:rh(2)}}>
                <B2BBestSellers />
            </View>
            {/* Shop By Category Container */}
            <View>
                <B2BShopByCategory />
            </View>
            {/* Explore More Slider Container */}
            <View>
                <HomeSlider sliderData={sliderData2} sliderStyle={{width: rw(80), height: rh(17)}} />
            </View>
            {/* Refresh Your Day Container */}
            <View style={{marginVertical:rh(2)}}>
                <Essentials />
            </View>

            {/* Savor the Sweetness of Premium Dates!  */}
            <PremiumDates data={dateItems} />

            {/* B2BSimilarProducts */}
            <View style={{marginHorizontal:rw(4)}}>
              <B2BSimilarProducts />
            </View>

            </View>
        </ScrollView>

      </View>
  );
};

export default B2BHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: rh(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(5),
    paddingVertical: rh(2),
  },
  headerTitle: {
    fontSize: rf(3),
    fontWeight: 'bold',
    color: '#FF3131',
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
    marginTop: -rh(2), // To create a floating effect below the header
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
  },
  horizontalListContainer: {
    paddingTop:rh(1),
    marginVertical: rh(2),
    backgroundColor:"#FFFFFF",
    borderRadius:10,
    marginHorizontal:rw(4),
    overflow:"hidden"
  },
  listTitle: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#272727',
    marginLeft: rw(4),
    marginBottom: rh(1),
  },
});
