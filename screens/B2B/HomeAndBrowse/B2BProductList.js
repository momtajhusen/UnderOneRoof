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
  ActivityIndicator
} from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';
import SortByBtn from '../../../components/Buttons/SortByBtn';
import SortByModal from '../../../components/Modals/SortbyModal';
import B2BProductCard from '../../../components/List/B2BProductCard';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../../../Service/apiClient';

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
    {
      id: '3',
      name: 'Premium Roasted Almonds',
      image: require('../../../assets/items/image343002.png'),
      price: '999',
      discountedPrice: '699',
      sizes: '1kg, 5kg, 10kg',
      packets: ['₹679/kg for 5 kg packet', '₹659/kg for 10 kg packet'],
    },
    {
      id: '4',
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
    const { selectCategoryId, selectCategoryName, selectCategorySlug } = route.params;
  
    const [selectedCategoryId, setSelectedCategoryId] = useState(selectCategoryId);
    const [selectedCategoryName, setSelectedCategoryName] = useState(selectCategoryName);
    const [selectedCategorySlug, setSelectedCategorySlug] = useState(selectCategorySlug);
  
    const [productListing, setProductListing] = useState([]);
    const [categoryData, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state
  
    const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    // Handle category selection
    const handleCategorySelection = (id, slug, name) => {
      setSelectedCategoryId(id);
      setSelectedCategoryName(name);
      setSelectedCategorySlug(slug);
      fetchProductListing();
    };
  
    const fetchSubCategory = async () => {
      try {
        const response = await apiClient.get(`/subCategoryList/${selectedCategorySlug}`);
        
        // Check if 'catlist' exists in the response
        if (response.data && response.data.data && response.data.data.catlist) {
          setCategory(response.data.data.catlist);
        } else {
          console.warn('catlist not found in the response');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };
    
  
    const fetchProductListing = async () => {
      setLoading(true);
      try {
        const postResponse = await apiClient.get(`/category?slug=${selectedCategorySlug}`);
        const product = postResponse.data.data.category;
        setProductListing(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchSubCategory();
      fetchProductListing();
    }, []);
  
    return (
      <View style={styles.screen}>
        {/* Header */}
        <Header
          title={selectedCategoryName}
          rightContent={
            <View style={{ flexDirection: 'row', gap: rw(4) }}>
              <TouchableOpacity>
                <Image source={require('../../../assets/Search.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../../assets/Cart.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
              </TouchableOpacity>
            </View>
          }
        />
  
        <View style={styles.container}>
          <View style={styles.sideContainer}>
            <FlatList
              data={categoryData}
              keyExtractor={(item) => item.sid.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.categoryItem, item.sid === selectedCategoryId && styles.activeCategory]}
                  onPress={() => handleCategorySelection(item.sid, item.cslug, item.cname)}
                >
                  <View style={styles.categoryWrapper}>
                    <View
                      style={[
                        styles.categoryIconWrapper,
                        {
                          borderColor: item.sid === selectedCategoryId ? '#FF3131' : '#DFDFDF',
                          backgroundColor: item.sid === selectedCategoryId ? '#fce6e6' : '#FFFFFF',
                        },
                      ]}
                    >
                      <Image source={{ uri: item.image }} style={styles.categoryIcon} />
                    </View>
                    <Text
                      style={[styles.categoryText, item.sid === selectedCategoryId && styles.activeText]}
                    >
                      {item.cname.length > 10 ? `${item.cname.slice(0, 15)}...` : item.cname}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}  
            />
          </View>
  
          {/* Product Section */}
          <View style={styles.productSection}>
            <View style={{ flexDirection: 'row', gap: 3, width: rw(70) }}>
              <SortByBtn style={{ width: rw(25), backgroundColor: '#DFDFDF' }} onPress={toggleModal} />
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
  
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: rh(1), paddingBottom: rh(5) }}>
                {loading ? (  // Show loading spinner while data is being fetched
                  <ActivityIndicator size="large" color="#FF3131" />
                ) : productListing?.length > 0 ? (
                  <B2BProductCard
                      items={productListing}
                      styleCardContainer={{
                        width: rw(75),
                        marginBottom:10,
                      }}
                      layout="vertical"
                    />
                ) : (
                  <View style={{height:rh(70), justifyContent:"center"}}>
                     <Text style={{textAlign:"center"}}>Products not available.</Text>
                  </View>
                )}
              </ScrollView>
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