import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../../components/header';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Collapsible from 'react-native-collapsible';
import ReviewCard from '../../../../components/List/ReviewCard';
import RatingProductCard from '../../../../components/List/RatingProductCard';
import SimilarProducts from '../../Cart&Checkout/CartComponents/SimilarProducts';
import B2BSimilarProducts from '../../../B2B/HomeAndBrowse/ComponentsSections/B2BSimilarProducts';
import apiClient from '../../../../Service/apiClient';
import parse from 'html-react-parser';
import { AppContext } from '../../../../context/AppContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { SharedElement } from 'react-native-shared-element';  

import { useAddFromCart } from '../../../../utility/addCartProductUtils';
import { useRemoveFromCart } from '../../../../utility/deleteCartProductUtils';
import ProductDetailsLoader from '../../../../components/ShimmerLoader/productDetailsLoader';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

import { useQtyUpdate } from '../../../../utility/QtyUpdateUtils';




// Shimmer Placeholder component
const Shimmer = createShimmerPlaceholder(LinearGradient);

const ProductDetail = ({ route, navigation }) => {

  

    const {state, dispatch } = useContext(AppContext);

    const item = route?.params?.item || {};
    const itemImage = route?.params?.itemImage || '';
 
 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(false);
  const [isNutritionCollapsed, setIsNutritionCollapsed] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);
  const [isCartBtnLoading, setCartBtnLoading] = useState(false);  

  const { width: contentWidth } = useWindowDimensions();

  const [selectedVarientId, setSelectedVarientId] = useState(
    Array.isArray(item.varient) && item.varient.length > 0
      ? item.varient[0].psid
      : item.varient_id || null
  );
  const [selectedSlug, setSelectedSlug] = useState(item.slug);

  console.log(selectedSlug);
  console.log(selectedVarientId);

  const [multiProductImage, setMultiProductImage] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [ProductReview, setReview] = useState([]);
  const [ProductVarient, setProductVarient] = useState([]);

  const [cartQty, setCartQty] = useState(0); 

  const [cartQuantity, setCartQuantity] = useState(0);
  
  const [isInWishlist, setIsInWishlist] = useState(0);

   const { qtyUpdate, isQtyUpdateLoading } = useQtyUpdate();
   const { isCartAddLoading, addFromCart } = useAddFromCart();
   const { isCartDeleteLoading, removeFromCart } = useRemoveFromCart();

   const [selectedVariantId, setSelectedVariantId] = useState(null);

    const addToCart = async () => {
      const moq = productDetails.moq || 1;
      const result = await addFromCart(productDetails.pid, selectedVariantId, moq);
      setCartQty(moq);
    };

    const handleIncrease = async (psid, qty, var_id, moq) => {
      const newQty = qty + 1;
      const result = await qtyUpdate(psid, newQty, var_id, moq);
      setCartQty(newQty);
    } 

    const handleDecrease = async (psid, qty, var_id, moq) => {
      const newQty = qty - 1;
      const result = await qtyUpdate(psid, newQty, var_id, moq);
      setCartQty(newQty);
    }

    const removeToCart = async () => {
      const result = await removeFromCart(productDetails.pid, selectedVariantId);
    };

    const ProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/product/detail?slug=${selectedSlug}&var=${selectedVarientId}`);
        const product = response.data;

        const multiImage = product.data.productDetails[0]?.multi_image || [];

        setMultiProductImage(multiImage);
        setProductDetails(product.data.productDetails[0]);
        setProductId(product.data.productDetails[0].pid);
        setRelatedProduct(product.data.relatedProduct);
        setProductVarient(product.data.varient);
        selectedVariantId(product.data[0].psid);
        setIsInWishlist(product.data.productDetails[0].added_to_wishlist);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const wishlistHandle = async () => {
      const payloadAddWishlist = {
        pid: productDetails.pid,
        uid: state.userId,
      };

      const payloadDeleteWishlist = {
        pid: productDetails.pid,
      };

      try {
        let response;
        
        if (isInWishlist) {
          setIsInWishlist(false); // Update state to reflect removal
          response = await apiClient.post('/deleteWishlist', payloadDeleteWishlist);
        } else {
          setIsInWishlist(true); // Update state to reflect addition
          response = await apiClient.post('/addWishlist', payloadAddWishlist);
        }

        if (response.data.status === 1) {
          console.log('Success');
        } else {
          console.error('Failed to update wishlist:', response.data.title);
          setIsInWishlist(!isInWishlist);
        }
      } catch (error) {
        console.error('Error handling wishlist:', error);
        setIsInWishlist(!isInWishlist);
      }
    };

    const varentHandle = async (item) => {
      setSelectedVariantId(item.psid);  
      ProductDetails(); 
    };
  
      // Fetch product from API
      useEffect(() => {
        ProductDetails();
      }, [state.reFresh]);

      useEffect(() => {
        if (ProductVarient.length > 0 && selectedVariantId === null) {
          setSelectedVariantId(ProductVarient[0].psid);
           setCartQty(productDetails.added_to_cart);
        }
      }, [ProductVarient, selectedVariantId]);
      
      
      const reviews = [
        {
            image: require('../../../../assets/RatingImage/image5.png'),
            rating: 4,
            reviewText: 'Taste is very good.',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
        {
            image: require('../../../../assets/RatingImage/image9.png'),
            rating: 5,
            reviewText: 'Value for money product',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
      ];

      const reviewData = {
          rating: 4.5,
          reviewCount: 22500,
          images: [
              require('../../../../assets/RatingImage/image.png'),
              require('../../../../assets/RatingImage/image-1.png'),
              require('../../../../assets/RatingImage/image-2.png'),
              require('../../../../assets/RatingImage/image5.png'),
          ],
      };
      
      const hasDescription = !!productDetails.short_desc;
      const hasDescriptionFull = !!productDetails.full_desc;

    const renderItem = ({ item }) => (
      <TouchableOpacity 
        onPress={() =>
          navigation.navigate("ProductImageView", {
            images: multiProductImage,
            selectedIndex: activeIndex,
          })
        }
      style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: item.img }} style={{ width: rw(70), height: rw(70), borderRadius: 10 }} />
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Header
        title={item.name}
        leftContent={
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={rf(3.5)} color="black" />
          </TouchableOpacity>
        }
        rightContent={
          <View style={{ flexDirection: 'row', gap: rw(4) }}>
            <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}>
              <Image source={require('../../../../assets/Cart.png')} style={{width:rw(5.5), height:rw(5.5)}} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView>
        
      {isLoading ? (
        <View style={{ position: "absolute", zIndex: 300, top: rh(35),  width: rw(100), height: rh(150) }}>
          <ProductDetailsLoader />
        </View>
      ) : null}

        <View contentContainerStyle={styles.scrollContainer}>
          <View
              style={{height:rh(35), backgroundColor:"white"}}>
            {isLoading ? (
               <View>
                  <SharedElement id={`item.${item.pid}.image`}>
                    <Image source={{ uri: itemImage }} style={{marginHorizontal:rw(15), width: rw(70), height: rw(70)}} />
                  </SharedElement>
               </View>
            ) : (
              <Carousel
                data={multiProductImage}
                renderItem={renderItem}
                sliderWidth={rw(100)}
                itemWidth={rw(70)}
                onSnapToItem={(index) => setActiveIndex(index)}
                activeSlideAlignment="center"
                loop
              />
            )}

            <TouchableOpacity style={styles.indicatorContainer}>
              {multiProductImage.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    activeIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </TouchableOpacity>

            {/* Conditionally render the favorite icon based on wishlist status */}
            {state.shoppingMode === "retail" && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: rh(1),
                right: rw(5),
                width: rw(10),
                height: rh(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={wishlistHandle}
            >
              <MaterialIcons
                name={isInWishlist ? 'favorite' : 'favorite-border'}
                size={rf(3.5)}
                color={isInWishlist ? '#FF6347' : '#888'}
              />
            </TouchableOpacity>
            )}
          </View>
         
        </View>

        <View style={styles.detailsContainer}>

          <Text style={styles.discountText}>{productDetails.discount}% OFF</Text>
          <Text style={styles.productTitle}>{productDetails.name}</Text>

          {state.shoppingMode === "retail" && (
            <Text style={styles.ratingText}>
              ★★★★☆ <Text style={styles.reviewCount}>(22,500)</Text>
            </Text>
          )}


          <Text style={styles.selectText}>
            {state.shoppingMode === "retail" ? "Select Quantity:" : "Select Packet type:"}
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContainer}
            >
            {
                ProductVarient.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.quantityBox,
                      {
                        padding: item.psid === selectedVariantId ? 2 : 0,
                        backgroundColor: item.psid === selectedVariantId ? "#fed8a9" : "#fed8a9", // Highlight selected item
                        marginRight: rw(1.5),
                      },
                    ]}
                    onPress={() => varentHandle(item)}
                  >
                    <View style={{ backgroundColor: "white", borderRadius: 10, padding: rw(1) }}>
                      <Text style={styles.weightText}>{item.pmeasurement} {item.punit}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: rw(1) }}>

                        {/* moq pice  */}
                        <Text style={styles.priceText}>₹{item.moq_price != null ? item.moq_price : item.pselling_price}</Text>
                        {/* pselling_price   */}
                        {/* <Text style={styles.priceText}>₹{item.pselling_price}</Text> */}

                        <View style={{ flexDirection: "row", gap: rw(1) }}>
                          <Text style={styles.mrpText}>MRP</Text>
                          <Text style={styles.mrpTextPrice}>₹{item.pmrp_price}</Text>
                        </View>
                      </View>
                    </View>
                
                    <Text style={styles.saveText}>Save ₹{item.pdiscount}</Text>
                  </TouchableOpacity>
                ))
            }

            </ScrollView>

        </View>

        {/* New Content Section */}
        <View style={styles.newContentContainer}>

        <View style={productDetails.short_desc ? styles.DescriptionContainer : { display: 'none' }}>
            <TouchableOpacity
              onPress={() => setIsDescriptionCollapsed(!isDescriptionCollapsed)}
              style={styles.CollapsedHeader}
            >
              <Text style={styles.sectionTitle}>Description:</Text>
              <MaterialIcons name={isDescriptionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
            </TouchableOpacity>
            
            {!isDescriptionCollapsed && hasDescription && (
              <View style={styles.textContainer}>
                <RenderHtml
                  source={{ html: productDetails.short_desc }}
                />
              </View>
            )}
          </View>


          <View style={productDetails.full_desc ? styles.DescriptionContainer : { display: 'none' }}>
              <TouchableOpacity
                onPress={() => setIsNutritionCollapsed(!isNutritionCollapsed)}
                style={styles.CollapsedHeader}
              >
                <Text style={styles.sectionTitle}>Nutritional Information :</Text>
                <MaterialIcons name={isNutritionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
              </TouchableOpacity>
              {/* <Collapsible collapsed={isNutritionCollapsed}> */}
              <View style={styles.textContainer}>


                {!isNutritionCollapsed && hasDescriptionFull && (
                  <View style={styles.textContainer}>
                    <RenderHtml
                      source={{ html: productDetails.full_desc }}
                    />
                  </View>
                )}
              </View>

              {/* </Collapsible> */}
            </View>

            <View style={styles.DescriptionContainer}>
              <Text style={styles.sectionTitle}>Delivery Options:</Text>

              <View style={{flexDirection:"row", gap:rw(3), marginBottom:rh(1)}}>
                <MaterialIcons name="local-shipping" size={20} color="#FF9100" />
                <Text style={styles.deliveryText}>
                  <Text style={{ fontWeight: 'bold' }}>Standard Delivery:</Text> 3-5 business days
                </Text>
              </View>

              <View style={{flexDirection:"row", gap:rw(3)}}>
                <MaterialIcons name="local-shipping" size={20} color="#FF3131" />
                <Text style={styles.deliveryText}>
                  <Text style={{ fontWeight: 'bold' }}>Express Delivery:</Text> Within 24 hours {'\n'} (depending on location)
                </Text>
              </View>
            
            </View>

              {
                Array.isArray(ProductReview) && ProductReview.length > 0 ? (
                  <View  style={{backgroundColor:"white", borderRadius:10}}>
                        <FlatList
                            data={reviews}
                            renderItem={({ item }) => <ReviewCard style={{borderTopWidth:1, borderColor:"#ccc"}} {...item} />}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={
                                <View>
                                    <RatingProductCard
                                        rating={reviewData.rating}
                                        reviewCount={reviewData.reviewCount}
                                        images={reviewData.images}
                                    />
                                    <TouchableOpacity onPress={()=>navigation.navigate('AllRating')} style={{padding:rw(2), backgroundColor:"black", width:rw(20), height:rh(4.5), borderRadius:10, alignItems:"center", justifyContent:"center", position:"absolute", right:"2%", top:"4%"}}>
                                        <Text style={{color:"white", textAlign:"center"}}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                      </View>
                ) : null 
              }

              {
                Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
                  <View style={{ backgroundColor: "white", marginTop: rh(1), marginBottom: rh(1), padding: rw(3), borderRadius: 5, overflow: "hidden" }}>

                  {state.shoppingMode === 'retail' && <SimilarProducts data={relatedProduct} />}
                  {state.shoppingMode === 'wholesale' && 
                     <B2BSimilarProducts data={relatedProduct} />
                  }

                  
                  </View>

                ) : null 
              }
        </View>
      </ScrollView>

      {!isLoading && (
        <View style={{width: rw(100), height: rh(9), backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: rh(1), paddingHorizontal: rw(5)}}>
          <TouchableOpacity 
              onPress={() => navigation.navigate('CartScreen')} 
              style={{backgroundColor: "#DFDFDF", paddingVertical: rh(1.5), paddingHorizontal: rw(13), borderRadius: 10}}
          >
              <Text style={{color: "black", fontWeight: "bold"}}>Buy Now</Text>
          </TouchableOpacity>

          {state.viewCartData.cartProduct?.some(cartItem => cartItem.pid === productId && cartItem.var_id === selectedVariantId) ? (
            <View
                style={{
                  backgroundColor: "#FF3131", 
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                disabled={isCartAddLoading}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: rh(1.5),
                    paddingHorizontal: rw(7),
                  }}
                  onPress={() => handleDecrease(productId, cartQty, selectedVariantId, productDetails.moq)}
                  disabled={isCartAddLoading}  
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
                </TouchableOpacity>
                {isQtyUpdateLoading ? (
                  <ActivityIndicator size="small" color="white" /> 
                ) : (
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {cartQty}</Text> 
                )}

                <TouchableOpacity
                  style={{
                    paddingVertical: rh(1.5),
                    paddingHorizontal: rw(7),
                  }}
                  onPress={() => handleIncrease(productId, cartQty, selectedVariantId, productDetails.moq)}
                  disabled={isCartAddLoading}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
                </TouchableOpacity>
              </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FF3131",
                    paddingVertical: rh(1.5),
                    paddingHorizontal: rw(13),
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={addToCart}
                  disabled={isCartAddLoading}
                >
                  {isCartAddLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={{ color: "white", fontWeight: "bold" }}>Add to Cart</Text>
                  )}
                </TouchableOpacity>
          )}


        </View>
      )}

      
 

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingBottom: rh(2) },
  carouselItem: { justifyContent: 'center', alignItems: 'center' },
  productImage: { width: rw(60), height: rw(60) },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: rh(1) },
  indicator: { width: rw(2), height: rw(2), borderRadius: rw(1), backgroundColor: '#D3D3D3', margin: rw(1) },
  activeIndicator: { backgroundColor: '#FF6D00' },
  detailsContainer: { marginHorizontal: rw(4), padding:rw(2), borderRadius:10, overflow:"hidden", backgroundColor:"white" },
  discountText: { color: '#FF6D00', fontSize: rf(1.8), fontWeight: 'bold', marginBottom:rh(1) },
  productTitle: { fontSize: rf(2), fontWeight: 'bold' },
  ratingText: { color: '#FF3131', fontSize: rf(2.5), fontWeight: 'bold', marginBottom: rh(1) },
  reviewCount: { color: '#A0A0A0', fontSize: rf(1.8) },
  selectText: { fontSize: rf(1.8), marginTop:rh(2), color:"#717171", marginBottom:rh(1) },
  quantityContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: rh(0.5) },
  quantityBox: { 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: rw(2), 
    width: rw(33), 
    borderRadius:10,
    overflow:"hidden" 
},
  weightText: { fontSize: rf(1.8), color:"#717171", marginBottom: rh(0.5) },
  priceText: { fontSize: rf(2.2), fontWeight: 'bold', marginBottom: rh(0.5) },
  mrpText: { color: '#A0A0A0', fontSize: rf(1.5), marginBottom: rh(0.5) },
  mrpTextPrice: { textDecorationLine: 'line-through', color: '#A0A0A0', fontSize: rf(1.5), marginBottom: rh(0.5) },

  saveText: { color: '#FF6D00', fontSize: rf(1.5), fontWeight: 'bold', marginLeft:rw(2), marginVertical:rh(0.5) },
  newContentContainer: { paddingHorizontal: rw(4), marginVertical: rh(1) },
  sectionTitle: { fontSize: rf(2), fontWeight: 'bold', marginBottom: rh(1) },
  DescriptionContainer:{
   backgroundColor:"white",
   padding:rw(2.5),
   borderRadius:10,
   marginBottom:rh(1)
  },
  CollapsedHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingRight:rw(1),
  },
  textContainer:{
    borderTopWidth:1,
    borderColor:"#E9E9E9",
  },
  descriptionText: { 
    fontSize: rf(1.8), paddingVertical:rh(1)
  },
  nutritionRow: {
    flexDirection: "row",
    gap: rw(0),
  },
  nutritionText:{
    textAlign:"center",
    paddingVertical:rh(0.5)
  },
  deliveryText: { fontSize: rf(1.8), marginBottom: rh(0.5) },

  shimmer: {
    width: rw(80),
    height: "100%",
    borderRadius: 10,
    justifyContent:"center",
    marginLeft:rw(10)
},
});

export default ProductDetail;
