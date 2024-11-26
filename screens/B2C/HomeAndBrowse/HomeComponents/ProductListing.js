// import necessary libraries
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
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
    { id: 2, name: 'Spices', icon: require('../../../../assets/image5.png') },
    { id: 3, name: 'Kesar', icon: require('../../../../assets/image5.png') },
    { id: 4, name: 'Energy Bars', icon: require('../../../../assets/image5.png') },
    { id: 5, name: 'Edible Oils', icon: require('../../../../assets/image5.png') },
    { id: 6, name: 'Honey', icon: require('../../../../assets/image5.png') },
    { id: 7, name: 'Dry Fruits', icon: require('../../../../assets/image5.png') },
    { id: 8, name: 'Spices', icon: require('../../../../assets/image5.png') },
    { id: 9, name: 'Kesar', icon: require('../../../../assets/image5.png') },
    { id: 10, name: 'Energy Bars', icon: require('../../../../assets/image5.png') },
    { id: 11, name: 'Edible Oils', icon: require('../../../../assets/image5.png') },
    { id: 12, name: 'Honey', icon: require('../../../../assets/image5.png') },
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
        name: "Premium Roasted Almonds",
        weight: "500g",
        type: "Roasted",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image1.png'), // Corrected path
    },
    {
        name: "Honey Almond Energy Bars",
        weight: "500g",
        type: "Natural",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image2.png'), // Corrected path
    },
    {
        name: "Organic Green Tea",
        weight: "500g",
        type: "Organic",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image1.png'), // Corrected path
    },
    {
        name: "Premium Roasted Almonds",
        weight: "500g",
        type: "Roasted",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image1.png'), // Corrected path
    },
    {
        name: "Honey Almond Energy Bars",
        weight: "500g",
        type: "Natural",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image2.png'), // Corrected path
    },
    {
        name: "Organic Green Tea",
        weight: "500g",
        type: "Organic",
        price: 299,
        mpr: 399,
        discount: "25% OFF",
        rating: 5,
        likes: 22500,
        image: require('../../../../assets/items/image1.png'), // Corrected path
    }
  ];

const ProductListing = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Function to toggle modal visibility
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
  };
  
  return (
    <View style={styles.screen}>
      {/* Header */}
      <Header
            title="Dry Fruits"
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
                    item.id === selectedCategory && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(item.id)}
                >
                <View style={styles.categoryWrapper}>
                    <Image source={item.icon} style={styles.categoryIcon} />
                    <Text
                    style={[
                        styles.categoryText,
                        item.id === selectedCategory && styles.activeText,
                    ]}
                    >
                    {item.name}
                    </Text>
                </View>
                </TouchableOpacity>
            )}
            />
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

          <View style={{paddingTop:rh(1), flexDirection:"row"}}>
               <ItemsList items={productList} layout="vertical" listContainerStyle={{width:rw(36), marginBottom:rh(1)}} />
          </View>

        </View>

      </View>

      {/* Sort By Modal Method Modal */}
      <SortByModal isVisible={isModalVisible} toggleModal={toggleModal} />
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
    borderRightWidth:1,
    borderColor:"#E9E9E9",
  },
  categoryItem: {
    marginVertical: rh(0.5),
    overflow: 'hidden',
    width: rw(20), // Fixed width for side navigation
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:rw(2)
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
    marginBottom: rh(0.5),
  },
  categoryText: {
    fontSize: rf(2),
    color: '#000',
    textAlign: 'center',
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