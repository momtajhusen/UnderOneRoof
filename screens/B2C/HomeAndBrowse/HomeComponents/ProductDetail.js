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
  const { state, dispatch } = useContext(AppContext);

  const item = route?.params?.item || {};
  const itemImage = route?.params?.itemImage || '';
  const itemQty = route?.params?.itemQty || '';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(false);
  const [isNutritionCollapsed, setIsNutritionCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);

  const { width: contentWidth } = useWindowDimensions();

  // Set the initial selected variant based on route data
  const [selectedVariantId, setSelectedVariantId] = useState(
    item.varient_id ||
    (Array.isArray(item.varient) && item.varient.length > 0
      ? item.varient[0].psid
      : null)
  );  
  
  
  const [selectedSlug, setSelectedSlug] = useState(item.slug);
  const [multiProductImage, setMultiProductImage] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [ProductReview, setReview] = useState([]);
  const [ProductVarient, setProductVarient] = useState([]);

  const [cartQty, setCartQty] = useState(itemQty);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(0);

  const { qtyUpdate, isQtyUpdateLoading } = useQtyUpdate();
  const { isCartAddLoading, addFromCart } = useAddFromCart();
  const { isCartDeleteLoading, removeFromCart } = useRemoveFromCart();

  const [deliveryTime, setDeliveryTime] = useState(null);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    reviewCount: 0,
    images: [],
  });

  // ------------------------
  //       Event Handlers
  // ------------------------

  // Add to cart
  const addToCart = async () => {
    const moq = productDetails.moq || 1;
    console.log("Adding to cart - PID:", productDetails.pid, "Variant ID:", selectedVariantId);
    
    try {
        setCartBtnLoading(true);
        await addFromCart(productDetails.pid, selectedVariantId, moq);
        setCartQty(moq);

        dispatch({
            type: 'UPDATE_CART',
            payload: {
                cartProduct: [
                    ...state.viewCartData.cartProduct,
                    { pid: productDetails.pid, var_id: selectedVariantId, qty: moq },
                ],
            },
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
    } finally {
        setCartBtnLoading(false);
    }
};


  // Buy now
  const buyNow = () => {
    addToCart();
    navigation.navigate('CartScreen');
  };

  // Increase quantity in cart
  const handleIncrease = async (psid, qty, var_id) => {
    const newQty = qty + 1;
    try {
      setCartBtnLoading(true);
      const result = await qtyUpdate(psid, newQty, var_id);
      if (result.success) {
        setCartQty(newQty);
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setCartBtnLoading(false);
    }
  };

  // Decrease quantity in cart
  const handleDecrease = async (psid, qty, var_id) => {
    const minQuantity = 1;
    if (qty <= minQuantity) {
      try {
        setCartBtnLoading(true);
        await removeFromCart(psid, var_id);
        setCartQty(0);

        dispatch({
          type: 'UPDATE_CART',
          payload: {
            cartProduct: state.viewCartData.cartProduct.filter(
              (cartItem) => cartItem.pid !== psid || cartItem.var_id !== var_id
            ),
          },
        });
      } catch (error) {
        console.error('Error removing from cart:', error);
      } finally {
        setCartBtnLoading(false);
      }
      return;
    }

    const newQty = qty - 1;
    try {
      setCartBtnLoading(true);
      const result = await qtyUpdate(psid, newQty, var_id);
      if (result.success) {
        setCartQty(newQty);
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    } finally {
      setCartBtnLoading(false);
    }
  };

  // Fetch product details from API
  const ProductDetails = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching for slug:', selectedSlug);
      console.log('Fetching for var:', selectedVariantId);

  
      const response = await apiClient.get(
        `/product/detail?slug=${selectedSlug}&var=${selectedVariantId}`
      );
      const product = response.data;


  
      // Set delivery time
      setDeliveryTime(product.data.delivery_time || null);
  
      // Set multi-images, reviews, ratings, etc.
      const multiImage = product.data.productDetails[0]?.multi_image || [];
      const reviewImages = product.data.reviewData || [];
      const totalRating = product.data.allrating || 0;
      const totalReviews = product.data.allreview || 0;
  
      setReviewData({
        rating: totalRating,
        reviewCount: totalReviews,
        images: reviewImages,
      });
  
      setReview(product.data.review);
      setMultiProductImage(multiImage);
      setProductDetails(product.data.productDetails[0]);
      setProductId(product.data.productDetails[0].pid);
      setRelatedProduct(product.data.relatedProduct);
      setProductVarient(product.data.varient);
      setIsInWishlist(product.data.productDetails[0].added_to_wishlist);
      setCartQty(product.data.productDetails[0].added_to_cart);
 
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Handle wishlist add/remove
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
        setIsInWishlist(false);
        response = await apiClient.post('/deleteWishlist', payloadDeleteWishlist);
      } else {
        setIsInWishlist(true);
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

  // Variant selection
  const varentHandle = (variantItem) => {
    setSelectedVariantId(variantItem.psid);
    setCartQty(0);
  };
  
  // ------------------------
  //         useEffect
  // ------------------------

  

  // Refetch product details when slug or variant changes
  useEffect(() => {
    if (selectedSlug && selectedVariantId) {
      ProductDetails();
    }
  }, [selectedSlug, selectedVariantId]);

  // Reset selected variant and cartQty when "item" changes
  useEffect(() => {
    setSelectedVariantId(
      item.varient_id ||
      (Array.isArray(item.varient) && item.varient.length > 0
        ? item.varient[0].varient_id
        : null)
    );
    setCartQty(itemQty);
    setSelectedSlug(item.slug);
  }, [item]);
  


  // Helper booleans
  const hasDescription = !!productDetails.short_desc;
  const hasDescriptionFull = !!productDetails.full_desc;

  // Render item for image carousel
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductImageView', {
          images: multiProductImage,
          selectedIndex: activeIndex,
        })
      }
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={{ uri: item.img }}
        style={{ width: rw(70), height: rw(70), borderRadius: 10 }}
      />
    </TouchableOpacity>
  );
  
  // ------------------------
  //  END OF LOGIC (BEFORE RETURN)
  // ------------------------

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
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
              <Image
                source={require('../../../../assets/Cart.png')}
                style={{ width: rw(5.5), height: rw(5.5) }}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView>
        {isLoading ? (
          <View style={{ position: "absolute", zIndex: 300, top: rh(35), width: rw(100), height: rh(150) }}>
            <ProductDetailsLoader />
          </View>
        ) : null}

        <View contentContainerStyle={styles.scrollContainer}>
          <View style={{ height: rh(35), backgroundColor: "white" }}>
            {isLoading ? (
              <View>
                <SharedElement id={`item.${item.pid}.image`}>
                  <Image
                    source={{ uri: itemImage }}
                    style={{ marginHorizontal: rw(15), width: rw(70), height: rw(70) }}
                  />
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
          {productDetails.discount > 0 && (
            <Text style={styles.discountText}>
              {productDetails.discount}% OFF
            </Text>
          )}
          <Text style={styles.productTitle}>{productDetails.name}</Text>

          {state.shoppingMode === "retail" && (
            <View style={{ flexDirection: 'row', marginTop: rh(1) }}>
              {Array.from({ length: 5 }, (_, index) => {
                const avg = productDetails.avg || 0;
                const isHalfFilled = avg > index && avg < index + 1;
                const isFilled = avg >= index + 1;
                return (
                  <MaterialIcons
                    key={index}
                    name={isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'}
                    size={rf(2)}
                    style={styles.ratingText}
                  />
                );
              })}
              <Text style={styles.reviewCount}>({productDetails.rating})</Text>
            </View>
          )}

          <Text style={styles.selectText}>
            {state.shoppingMode === "retail" ? "Select Quantity:" : "Select Packet type:"}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {ProductVarient.map((variantItem, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quantityBox,
                  {
                    padding: variantItem.psid === selectedVariantId ? 2 : 0,
                    backgroundColor: "#fed8a9",
                    marginRight: rw(1.5),
                  },
                ]}
                onPress={() => varentHandle(variantItem)}
              >
                <View style={{ backgroundColor: "white", borderRadius: 10, padding: rw(1) }}>
                  <Text style={styles.weightText}>
                    {variantItem.pmeasurement} {variantItem.punit}
                  </Text>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", gap: rw(1) }}>
                    <Text style={styles.priceText}>
                      ₹{variantItem.moq_price != null ? variantItem.moq_price : variantItem.pselling_price}
                    </Text>
                    <View style={{ flexDirection: "row", gap: rw(1) }}>
                      <Text style={styles.mrpText}>MRP</Text>
                      <Text style={styles.mrpTextPrice}>₹{variantItem.pmrp_price}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.saveText}>Save ₹{variantItem.pdiscount}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.newContentContainer}>
          <View style={productDetails.short_desc ? styles.DescriptionContainer : { display: 'none' }}>
            <TouchableOpacity
              onPress={() => setIsDescriptionCollapsed(!isDescriptionCollapsed)}
              style={styles.CollapsedHeader}
            >
              <Text style={styles.sectionTitle}>Description:</Text>
              <MaterialIcons
                name={isDescriptionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {!isDescriptionCollapsed && hasDescription && (
              <View style={styles.textContainer}>
                <RenderHtml source={{ html: productDetails.short_desc }} />
              </View>
            )}
          </View>

          <View style={productDetails.full_desc ? styles.DescriptionContainer : { display: 'none' }}>
            <TouchableOpacity
              onPress={() => setIsNutritionCollapsed(!isNutritionCollapsed)}
              style={styles.CollapsedHeader}
            >
              <Text style={styles.sectionTitle}>Nutritional Information :</Text>
              <MaterialIcons
                name={isNutritionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              {!isNutritionCollapsed && hasDescriptionFull && (
                <View style={styles.textContainer}>
                  <RenderHtml source={{ html: productDetails.full_desc }} />
                </View>
              )}
            </View>
          </View>

          <View style={styles.DescriptionContainer}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            <View style={{ flexDirection: "row", gap: rw(3), marginBottom: rh(1) }}>
              <MaterialIcons name="local-shipping" size={20} color="#FF9100" />
              <Text style={styles.deliveryText}>
                <Text style={{ fontWeight: 'bold' }}>Standard Delivery:</Text> {deliveryTime}
              </Text>
            </View>
          </View>

          {Array.isArray(ProductReview) && ProductReview.length > 0 ? (
            <View style={{ backgroundColor: "white", borderRadius: 10 }}>
              <FlatList
                data={ProductReview.slice(0, 3)}
                renderItem={({ item }) => (
                  <ReviewCard style={{ borderTopWidth: 1, borderColor: "#ccc" }} {...item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                  <View>
                    <RatingProductCard
                      rating={reviewData.rating}
                      reviewCount={reviewData.reviewCount}
                      images={reviewData.images}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AllRating", {
                          review: ProductReview,
                          reviewData: reviewData,
                        })
                      }
                      style={{
                        padding: rw(2),
                        backgroundColor: "black",
                        width: rw(20),
                        height: rh(4.5),
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        right: "2%",
                        top: "4%",
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>View All</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          ) : null}

          {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
            <View style={{ backgroundColor: "white", marginTop: rh(1), marginBottom: rh(1), padding: rw(3), borderRadius: 5, overflow: "hidden" }}>
              {state.shoppingMode === 'retail' && <SimilarProducts data={relatedProduct} />}
              {state.shoppingMode === 'wholesale' && <B2BSimilarProducts data={relatedProduct} />}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {!isLoading && (
        <View style={{ width: rw(100), height: rh(9), backgroundColor: "white", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: rh(1), paddingHorizontal: rw(5) }}>
          <TouchableOpacity
            onPress={buyNow}
            style={{ backgroundColor: "#DFDFDF", paddingVertical: rh(1.5), paddingHorizontal: rw(13), borderRadius: 10 }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Buy Now</Text>
          </TouchableOpacity>

          {cartQty > 0 ? (
            <View
              style={{
                backgroundColor: "#FF3131",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: rw(40),
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: rh(1.5), paddingHorizontal: rw(5) }}
                onPress={() => handleDecrease(productId, cartQty, selectedVariantId)}
                disabled={cartBtnLoading}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>
              {cartBtnLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: "white", fontWeight: "bold" }}>{cartQty}</Text>
              )}
              <TouchableOpacity
                style={{ paddingVertical: rh(1.5), paddingHorizontal: rw(5) }}
                onPress={() => handleIncrease(productId, cartQty, selectedVariantId)}
                disabled={cartBtnLoading}
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
              disabled={cartBtnLoading}
            >
              {cartBtnLoading ? (
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
  starIcon: { color: '#FF3131' },
  container: { flex: 1 },
  scrollContainer: { paddingBottom: rh(2) },
  carouselItem: { justifyContent: 'center', alignItems: 'center' },
  productImage: { width: rw(60), height: rw(60) },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: rh(1) },
  indicator: { width: rw(2), height: rw(2), borderRadius: rw(1), backgroundColor: '#D3D3D3', margin: rw(1) },
  activeIndicator: { backgroundColor: '#FF6D00' },
  detailsContainer: { marginHorizontal: rw(4), marginTop:rh(1), padding: rw(2), borderRadius: 10, overflow: "hidden", backgroundColor: "white" },
  discountText: { color: '#FF6D00', fontSize: rf(1.8), fontWeight: 'bold', marginBottom: rh(1) },
  productTitle: { fontSize: rf(2), fontWeight: 'bold' },
  ratingText: { color: '#FF3131', fontSize: rf(2.5), fontWeight: 'bold', marginBottom: rh(1) },
  reviewCount: { marginLeft: rw(1), color: '#A0A0A0', fontSize: rf(1.8), fontWeight: 'bold' },
  selectText: { fontSize: rf(1.8), marginTop: rh(0), color: "#717171", marginBottom: rh(1) },
  quantityContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: rh(0.5) },
  quantityBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: rw(2),
    width: rw(33),
    borderRadius: 10,
    overflow: "hidden"
  },
  weightText: { fontSize: rf(1.8), color: "#717171", marginBottom: rh(0.5) },
  priceText: { fontSize: rf(2.2), fontWeight: 'bold', marginBottom: rh(0.5) },
  mrpText: { color: '#A0A0A0', fontSize: rf(1.5), marginBottom: rh(0.5) },
  mrpTextPrice: { textDecorationLine: 'line-through', color: '#A0A0A0', fontSize: rf(1.5), marginBottom: rh(0.5) },
  saveText: { color: '#FF6D00', fontSize: rf(1.5), fontWeight: 'bold', marginLeft: rw(2), marginVertical: rh(0.5) },
  newContentContainer: { paddingHorizontal: rw(4), marginVertical: rh(1) },
  sectionTitle: { fontSize: rf(2), fontWeight: 'bold', marginBottom: rh(1) },
  DescriptionContainer: { backgroundColor: "white", padding: rw(2.5), borderRadius: 10, marginBottom: rh(1) },
  CollapsedHeader: { flexDirection: "row", justifyContent: "space-between", paddingRight: rw(1) },
  textContainer: { borderTopWidth: 1, borderColor: "#E9E9E9" },
  descriptionText: { fontSize: rf(1.8), paddingVertical: rh(1) },
  nutritionRow: { flexDirection: "row", gap: rw(0) },
  nutritionText: { textAlign: "center", paddingVertical: rh(0.5) },
  deliveryText: { fontSize: rf(1.8), marginBottom: rh(0.5) },
  shimmer: { width: rw(80), height: "100%", borderRadius: 10, justifyContent: "center", marginLeft: rw(10) },
});

export default ProductDetail;
