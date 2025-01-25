// import necessary libraries
import React, { useEffect, useState, useContext } from 'react';
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
import { rw, rh, rf } from '../../Service/responsive';
import Header from '../../components/header';
import SortByBtn from '../../components/Buttons/SortByBtn';
import SortByModal from '../../components/Modals/SortbyModal';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../../Service/apiClient';
import { AppContext } from '../../context/AppContext';
// B2B Product Card and Loader 
import B2BProductCard from '../../components/List/B2BProductCard';
import B2BProductLoader from '../../components/ShimmerLoader/b2bProductLoader';
// B2C Product Card and Loader 
import ItemsList from '../../components/List/ItemsList';
import ItemsListLoader from '../../components/ShimmerLoader/ItemsListLoader';

  // Sort By Options 
  const options = [
    'Price ( low to high )',
    'Price ( High to low )',
    'Discounts'
  ];
  
  const ProductListing = ({ navigation, route }) => {
    const { state, dispatch } = useContext(AppContext);
    const { selectCategoryId, selectCategoryName, selectCategorySlug } = route.params;

    const [selectedCategoryId, setSelectedCategoryId] = useState(selectCategoryId);
    const [selectedCategoryName, setSelectedCategoryName] = useState(selectCategoryName);
    const [selectedCategorySlug, setSelectedCategorySlug] = useState(selectCategorySlug);
  
    const [productListing, setProductListing] = useState([]);
    const [categoryData, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

      // Filter list array
      const filters = state.productFilter
      ? [{ id: 1, name: state.productFilter }]
      : [];
  
    // Handle category selection
    const handleCategorySelection = (id, slug, name) => {
      setSelectedCategoryId(id);
      setSelectedCategoryName(name);
      setSelectedCategorySlug(slug);
    };
  
    const fetchSubCategory = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/subCategoryList/${selectedCategorySlug}`);
        
        // Check if 'catlist' exists in the response
        if (response.data && response.data.data && response.data.data.catlist) {
          setCategory(response.data.data.catlist);
  
          // Set the first subcategory slug
          const cslug = response.data.data.catlist[0].cslug;
          setSelectedCategorySlug(cslug);
          setSelectedCategoryId(response.data.data.catlist[0].sid);
          setSelectedCategoryName(response.data.data.catlist[0].cname);
          // setSelectedCategorySlug(response.data.data.catlist[0].slug);
        } else {
          console.warn('catlist not found in the response');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
  
    const fetchProductListing = async () => {
      setLoading(true);
       console.log(state.productFilter );
      try {
        const postResponse = await apiClient.get(`/category?slug=${selectedCategorySlug}`);
        const products = postResponse.data.data.category;

        console.log(selectedCategorySlug);
    
        let filteredProducts = [...products];
    
        if (state.productFilter === "Price ( low to high )") {
          filteredProducts.sort((a, b) => a.selling_price - b.selling_price);
        } else if (state.productFilter === "Price ( High to low )") {
          filteredProducts.sort((a, b) => b.selling_price - a.selling_price);
        } else if (state.productFilter === "Discounts") {
          filteredProducts.sort((a, b) => b.discount - a.discount);
        } else if (state.productFilter === null) {
          filteredProducts = products;  
        }
    
        setProductListing(filteredProducts);  
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchSubCategory();
      dispatch({
        type: 'SET_PRODUCT_FILTER',
        payload: {
            productFilter: null,
        },
      });
    }, []);
  
    // Fetch products whenever `selectedCategorySlug` changes
    useEffect(() => {
      if (selectedCategorySlug) {
        fetchProductListing();
      }
    }, [selectedCategorySlug, state.productFilter]);
  
    return (
      <View style={styles.screen}>
        {/* Header */}
        <Header
          title={selectedCategoryName+' '+state.shoppingMode}
          rightContent={
            <View style={{ flexDirection: 'row', gap: rw(4) }}>
              <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
                <Image source={require('../../assets/Search.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}>
                <Image source={require('../../assets/Cart.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
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
                      numberOfLines={3}
                      style={[styles.categoryText, item.sid === selectedCategoryId && styles.activeText]}
                    >
                      {item.cname}
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
              <SortByBtn style={{ width: rw(25), height:rh(4), backgroundColor: '#DFDFDF' }} onPress={toggleModal} />
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
                          onPress={()=>
                            dispatch({
                              type: 'SET_PRODUCT_FILTER',
                              payload: {
                                  productFilter: null,
                              },
                            })
                          }
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
  
            {state.shoppingMode === 'wholesale' ? (
              /* B2B container */
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView 
                  contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: rh(1), paddingBottom: rh(5) }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    loading ? (
                      <B2BProductLoader 
                        layout="vertical" 
                        styleCardContainer={{
                          width: categoryData.length === 0 ? rw(90) : rw(75),
                          marginBottom: 10,
                        }}
                      />
                    ) : productListing?.length > 0 ? (
                      <B2BProductCard
                        items={productListing}
                        styleCardContainer={{
                          width: categoryData.length === 0 ? rw(90) : rw(75),
                          marginBottom: 10,
                        }}
                        layout="vertical"
                      />
                    ) : (
                      <View style={{ height: rh(70), justifyContent: "center", alignItems: "center" }}>
                        <Image 
                          source={require('../../assets/product-not-avable.png')} 
                          style={{ width: rw(50), height: rw(50) }} 
                        />
                      </View>
                    )
                  }
                </ScrollView>
              </View>
            ) : (
              /* B2C container */
              <View style={{ paddingTop: rh(1), flexDirection: 'row', flex: 1, paddingBottom: rh(5), paddingLeft: categoryData.length === 0 ? rw(2.5) : rw(0), justifyContent: 'center' }}>
                {loading ? (
                  <View style={{width:rw(100), height:rh(100)}}>
                    <ItemsListLoader count="6" layout = 'vertical' 
                    itemContainerStyle={{
                      width: categoryData.length === 0 ? rw(44) : rw(37),
                      }} />
                  </View>
                ) : productListing.length !== 0 ? (
                  <ItemsList items={productListing} layout="vertical" listContainerStyle={{ width: categoryData.length === 0 ? rw(45) : rw(37.3), marginBottom: rh(1) }} />
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: rf(2), color: '#555', textAlign: 'center' }}>
                      No products available
                    </Text>
                  </View>
                )}
              </View>
            )}

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
  },
  categoryIconWrapper: {
    width: rw(12),
    height: rw(12),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    overflow:"hidden",
    backgroundColor:"#FFFFFF",
  },
  categoryText: {
    marginTop:rh(0.5),
    fontSize: rf(1.4),
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    width:rw(15),
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