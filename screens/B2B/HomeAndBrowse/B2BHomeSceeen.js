import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../Service/themes/responsive';
import SearchDesigne from '../../../components/Search/searchDesigne';
import HomeSlider from '../../../components/Sliders/HomeSlider';
import ExploreMoreSlider from '../../../components/Sliders/ExploreMoreSlider';
import B2BBestSellers from './ComponentsSections/B2BBestSellers';
import B2BShopByCategory from './ComponentsSections/B2BShopByCategory';
import RefreshYourDay from '../../B2C/HomeAndBrowse/HomeComponents/RefreshYourDay';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from "@react-navigation/native";
import Essentials from './ComponentsSections/Essentials';
import PremiumDates from './ComponentsSections/PremiumDates';
import B2BProductCard from '../../../components/List/B2BProductCard';
import { useNavigation } from '@react-navigation/native';


const B2BHomeScreen = () => {

  const navigation = useNavigation();


  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#FBDFDF");
  });

  const sliderData = [
    require('../../../assets/Slider/Rectangle31.png'),
    require('../../../assets/Slider/Rectangle31.png'),
    require('../../../assets/Slider/Rectangle31.png'),
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

const productList = [
    {
      id: '1',
      name: 'Premium Roasted Almonds',
      image: require('../../../assets/items/image343002.png'),
      price: '999',
      discountedPrice: '699',
      sizes: '1kg, 5kg, 10kg',
      packets: ['₹679/kg for 5 kg packet', '₹659/kg for 10 kg packet'],
    },
    {
      id: '2',
      name: 'Organic Cashews',
      image: require('../../../assets/items/image343002.png'),
      price: '1299',
      discountedPrice: '1099',
      sizes: '500g, 1kg',
      packets: ['₹999/kg for 1 kg packet'],
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
                <HomeSlider sliderData={sliderData} />
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
                <HomeSlider sliderData={sliderData2} />
            </View>
            {/* Refresh Your Day Container */}
            <View style={{marginVertical:rh(2)}}>
                <Essentials />
            </View>

            {/* Savor the Sweetness of Premium Dates!  */}
            <PremiumDates data={dateItems} />

            {/* Horizontal Product List */}
            <View style={styles.horizontalListContainer}>
            <Text style={styles.listTitle}>Similar Products</Text>
            <FlatList
                data={productList}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: rw(4) }}
                renderItem={({ item }) => (
                <B2BProductCard
                    items={item}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    sizes={item.sizes}
                    packets={item.packets}
                    onAdd={() => console.log('Add pressed')}
                    onIncrement={() => console.log('Increment pressed')}
                    onDecrement={() => console.log('Decrement pressed')}
                    styleCardContainer={{marginRight:10}}
                />
                )}
            />
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
