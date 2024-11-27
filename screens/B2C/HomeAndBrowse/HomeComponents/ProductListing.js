// import necessary libraries
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import SortByBtn from '../../../../components/Buttons/SortByBtn';
import SortByModal from '../../../../components/Modals/SortbyModal';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ItemsList from '../../../../components/List/ItemsList';


  // Dummy data for side navigation
  const categories = [
    { id: 1, name: 'Dry Fruits', icon: require('../../../../assets/image5.png') },
    { id: 2, name: 'Spices', icon: require('../../../../assets/items/image2.png') },
    { id: 3, name: 'Kesar', icon: require('../../../../assets/items/image1.png') },
    { id: 4, name: 'Energy Bars', icon: require('../../../../assets/items/image5.png') },
    { id: 5, name: 'Edible Oils', icon: require('../../../../assets/items/image42.png') },
    { id: 6, name: 'Dry Fruits', icon: require('../../../../assets/image5.png') },
    { id: 7, name: 'Spices', icon: require('../../../../assets/items/image2.png') },
    { id: 8, name: 'Kesar', icon: require('../../../../assets/items/image1.png') },
    { id: 9, name: 'Energy Bars', icon: require('../../../../assets/items/image5.png') },
    { id: 10, name: 'Edible Oils', icon: require('../../../../assets/items/image42.png') },
    { id: 11, name: 'Dry Fruits', icon: require('../../../../assets/image5.png') },
    { id: 12, name: 'Spices', icon: require('../../../../assets/items/image2.png') },
  ];

  // Filter list array
  const filters = [
  { id: 1, name: 'Price: High to Low' },
  { id: 2, name: 'Price: Low to High' },
  { id: 3, name: 'Rating: High to Low' },
  { id: 4, name: 'Newest First' },
  { id: 5, name: 'Discount' },
  ];

  // Items List array define
  const productList = [
    {
      id:1,
      name: "Premium Roasted Almonds",
      weight: "500g",
      type: "Roasted",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 50,
      image: require('../../../../assets/items/image1.png'),
      cartQuantity: 0, // Quantity in user's cart
      isWishlisted: false // Wishlisted status
    },
    {
      id:2,
      name: "Honey Almond Energy Bars",
      weight: "500g",
      type: "Natural",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 30,
      image: require('../../../../assets/items/image2.png'),
      cartQuantity: 0,
      isWishlisted: true
    },
    {
      id:3,
      name: "Organic Green Tea",
      weight: "500g",
      type: "Organic",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 40,
      image: require('../../../../assets/items/image1.png'),
      cartQuantity: 0,
      isWishlisted: false
    },
    {
      id:3,
      name: "Premium Roasted Almonds",
      weight: "500g",
      type: "Roasted",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 20,
      image: require('../../../../assets/items/image1.png'),
      cartQuantity: 0,
      isWishlisted: false
    },
    {
      id:4,
      name: "Honey Almond Energy Bars",
      weight: "500g",
      type: "Natural",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 0,
      image: require('../../../../assets/items/image2.png'),
      cartQuantity: 0,
      isWishlisted: false
    },
    {
      id:5,
      name: "Organic Green Tea",
      weight: "500g",
      type: "Organic",
      price: 299,
      mpr: 399,
      discount: "25% OFF",
      rating: 5,
      likes: 22500,
      stock: 0,
      image: require('../../../../assets/items/image1.png'),
      cartQuantity: 0,
      isWishlisted: false
    }
  ];
  

  // Sort By Options 
  const options = [
    'Trending',
    'Price ( low to high )',
    'Price ( High to low )',
    'Discounts',
    'More Option',
  ];
  

const ProductListing = ({ route }) => {

  // Receive the selectCategory prop from the route params
  const { selectCategoryName } = route.params;

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedCategoryName, setSelectedCategoryName] = useState(selectCategoryName);


  // Function to toggle modal visibility
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
  };

  const SelectedCategoryHandle = (id, name) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  };
  
  return (
    <View style={styles.screen}>
      {/* Header */}
      <Header
            title={selectedCategoryName}
            rightContent={
                <View style={{flexDirection:"row", gap: rw(4)}}>
                  <TouchableOpacity>
                      <MaterialIcons name="search" size={rf(3)} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <MaterialCommunityIcons  name="cart-outline" size={rf(3)} color="black" />
                  </TouchableOpacity>
                </View>
            }
        />

      <View style={styles.container}>

        <View style={styles.sideContainer}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    item.id === selectedCategoryId && styles.activeCategory,
                  ]}
                  onPress={() => SelectedCategoryHandle(item.id, item.name)}
              >
                <View style={styles.categoryWrapper}>
                  <View
                    style={[
                      styles.categoryIconWrapper,
                      {
                        transitionDelay: 2,
                        borderColor: item.id === selectedCategoryId ? '#FF3131' : '#DFDFDF',
                        backgroundColor: item.id === selectedCategoryId ? '#fce6e6' : '#FFFFFF',
                      },
                    ]}
                  >
                    <Image source={item.icon} style={styles.categoryIcon} />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      item.id === selectedCategoryId && styles.activeText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>

              )}
            />
              {/* <View style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "7%" }}>
                  <View style={{backgroundColor:"#FF3131", width:"100%", height:rh(10), top:rh(2)}}></View>
              </View> */}
        </View>

        {/* Product Section */}
        <View style={styles.productSection}>
          <View style={{ flexDirection: "row", gap:3, width:rw(70)}}>
              <SortByBtn style={{width:rw(25)}} onPress={toggleModal} />
              <View style={styles.filterContainer}>
              <FlatList
                data={filters}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.filterList}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                      <TouchableOpacity
                        style={{
                          fontWeight: 'bold',
                          backgroundColor: '#ccc',
                          borderRadius: 10,
                          padding: 2,
                        }}
                      >
                        <MaterialIcons name="close" size={rf(1.8)} color="black" />
                      </TouchableOpacity>
                      <Text>{item.name}</Text>
                    </View>
                  </View>
                )}
              />
              </View>
          </View>

          {/* <Text style={styles.productTitle}>
            {categories.find((c) => c.id === selectedCategory)?.name}
          </Text> */}

          <View style={{paddingTop:rh(1), flexDirection:"row", paddingBottom:rh(5)}}>
               <ItemsList items={productList} layout="vertical" listContainerStyle={{width:rw(37.3), marginBottom:rh(1)}} />
          </View>

        </View>

      </View>

      {/* Sort By Modal Method Modal */}
      <SortByModal options={options} isVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default ProductListing;

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sideContainer:{
    position:"relative",
    borderRightWidth:1,
    borderColor:"#E9E9E9",
    marginBottom:rh(2),
    // backgroundColor:"blue"
  },
  categoryItem: {
    marginVertical: rh(0.5),
    overflow: 'hidden',
    width: rw(19),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: rw(2),
  },
  filterList: {
    flexDirection: 'row',
    backgroundColor: '#E9E9E9',
    padding: rw(2),
    paddingVertical: rh(1),
    marginRight: rw(2),
    borderRadius: 5,
  },
  activeCategory: {
    borderColor: '#FF3131',  
    borderRightWidth: 5,
  },
  categoryWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: rw(12),
    height: rw(12),
    resizeMode: 'contain',
    position:"absolute",
    bottom:-10,
  },
  categoryIconWrapper: {
    width: rw(12),
    height: rw(12),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100, // Fully circular border
    overflow:"hidden",
    backgroundColor:"#FFFFFF"
  },
  categoryText: {
    marginTop:rh(0.5),
    fontSize: rf(1.5),
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    width:rw(10)
  },
  activeText: {
    color: '#FF3131',
    fontWeight: 'bold',
  },
  productSection: {
    flex: 1,
    paddingHorizontal: rw(1.5),
  },
  productTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    marginVertical: rh(2),
  },
});