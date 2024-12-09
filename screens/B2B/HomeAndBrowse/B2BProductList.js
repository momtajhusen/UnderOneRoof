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
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';
import SortByBtn from '../../../components/Buttons/SortByBtn';
import SortByModal from '../../../components/Modals/SortbyModal';
import B2BProductCard from '../../../components/List/B2BProductCard';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

  // Dummy data for side navigation
  const categories = [
    { id: 1, name: 'Dry Fruits', icon: require('../../../assets/CategorIcon/image1.png') },
    { id: 2, name: 'Spices', icon: require('../../../assets/CategorIcon/image2.png') },
    { id: 3, name: 'Kesar', icon: require('../../../assets/CategorIcon/image3.png') },
    { id: 4, name: 'Energy Bars', icon: require('../../../assets/CategorIcon/image4.png') },
    { id: 5, name: 'Edible Oils', icon: require('../../../assets/CategorIcon/image5.png') },
    { id: 6, name: 'Dry Fruits', icon: require('../../../assets/CategorIcon/image6.png') },
    { id: 7, name: 'Spices', icon: require('../../../assets/CategorIcon/image7.png') },
    { id: 8, name: 'Kesar', icon: require('../../../assets/CategorIcon/image1.png') },
    { id: 9, name: 'Energy Bars', icon: require('../../../assets/CategorIcon/image2.png') },
    { id: 10, name: 'Edible Oils', icon: require('../../../assets/CategorIcon/image3.png') },
    { id: 11, name: 'Dry Fruits', icon: require('../../../assets/CategorIcon/image4.png') },
    { id: 12, name: 'Spices', icon: require('../../../assets/CategorIcon/image5.png') },
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

  // Sort By Options 
  const options = [
    'Trending',
    'Price ( low to high )',
    'Price ( High to low )',
    'Discounts',
    'More Option',
  ];
  
  const B2BProductListing = ({ route }) => {

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
                        {/* <MaterialIcons name="search" size={rf(3)} color="black" /> */}
                        <Image source={require('../../../assets/Search.png')} style={{width:rw(5.5), height:rw(5.5)}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {/* <MaterialCommunityIcons  name="cart-outline" size={rf(3)} color="black" /> */}
                        <Image source={require('../../../assets/Cart.png')} style={{width:rw(5.5), height:rw(5.5)}} />
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
                <SortByBtn style={{width:rw(25), backgroundColor:"#DFDFDF"}} onPress={toggleModal} />
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

            <View style={{  backgroundColor:"red", flexDirection:"row"}}>
            <FlatList
            data={productList}
            keyExtractor={(item) => item.id}
            numColumns={2} // Set number of columns to wrap items
            contentContainerStyle={{ paddingHorizontal: rw(1), paddingVertical: rh(1) }}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: rh(2) }} // Adjust spacing between columns
            renderItem={({ item }) => (
              <B2BProductCard
              items={item}
                name={item.name}
                image={item.image}
                price={item.price}
                discountedPrice={item.discountedPrice}
                sizes={item.sizes}
                packets={item.packets}
                onAdd={() => console.log("Add pressed")}
                onIncrement={() => console.log("Increment pressed")}
                onDecrement={() => console.log("Decrement pressed")}
                styleCardContainer={{ marginRight: 10 }}
              />
            )}
           />

            </View>

          </View>

        </View>

        {/* Sort By Modal Method Modal */}
        <SortByModal options={options} isVisible={isModalVisible} toggleModal={toggleModal} />
      </View>
    );
  };

export default B2BProductListing;

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical:rh(1)
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