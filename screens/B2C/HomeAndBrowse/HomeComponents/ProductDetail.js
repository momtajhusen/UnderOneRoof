import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
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



const ProductDetail = ({ route, navigation }) => {

  const { item } = route.params;

  console.log(item);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(false);
  const [isNutritionCollapsed, setIsNutritionCollapsed] = useState(false);  
  

  const images = [
    require('../../../../assets/items/image1.png'),
    require('../../../../assets/items/image2.png'),
    require('../../../../assets/items/image3.png'),
    require('../../../../assets/items/image4.png'),
    require('../../../../assets/items/image5.png'),
  ];

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

  const renderItem = ({ item }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image source={item} style={{ width: rw(70), height: rw(70), borderRadius: 10 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        leftContent={
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={rf(3.5)} color="black" />
          </TouchableOpacity>
        }
        rightContent={
          <View style={{ flexDirection: 'row', gap: rw(4) }}>
            <TouchableOpacity>
              <Image source={require('../../../../assets/Cart.png')} style={{width:rw(5.5), height:rw(5.5)}} />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView>
        <View contentContainerStyle={styles.scrollContainer}>
          <View>
          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={rw(100)}
            itemWidth={rw(70)}
            onSnapToItem={(index) => setActiveIndex(index)}
            activeSlideAlignment="center"
            loop
          />

          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  activeIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={{position:"absolute", bottom:rh(1), right:rw(5), width:rw(10), height:rh(5), justifyContent:"center", alignItems:"center"}}>
             <MaterialIcons name="favorite-border" size={rf(3.5)} color="#888" />
          </TouchableOpacity>
          </View>
         
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.discountText}>25% OFF</Text>
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.ratingText}>
            ★★★★☆ <Text style={styles.reviewCount}>(22,500)</Text>
          </Text>

          <Text style={styles.selectText}>Select Quantity:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContainer}
            >
            {[{ weight: '100g', price: '₹199', mrp: '₹250', save: 'Save ₹51' },
                { weight: '250g', price: '₹299', mrp: '₹350', save: 'Save ₹55' },
                { weight: '500g', price: '₹499', mrp: '₹550', save: 'Save ₹51' },
                { weight: '1kg', price: '₹899', mrp: '₹1000', save: 'Save ₹101' }, // Additional items if needed
            ].map((item, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.quantityBox, { backgroundColor: "#fed8a9", marginRight: rw(1.5) }]}
                >
                <View style={{ backgroundColor: "white", borderRadius: 10, padding: rw(1) }}>
                    <Text style={styles.weightText}>{item.weight}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: rw(1) }}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <View style={{ flexDirection: "row", gap: rw(1) }}>
                        <Text style={styles.mrpText}>MRP</Text>
                        <Text style={styles.mrpTextPrice}>{item.mrp}</Text>
                    </View>
                    </View>
                </View>

                <Text style={styles.saveText}>{item.save}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>

        </View>

        {/* New Content Section */}
        <View style={styles.newContentContainer}>

            <View style={styles.DescriptionContainer}>
              <TouchableOpacity
                onPress={() => setIsDescriptionCollapsed(!isDescriptionCollapsed)}
                style={styles.CollapsedHeader}
              >
                <Text style={styles.sectionTitle}>Description:</Text>
                <MaterialIcons name={isDescriptionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
              </TouchableOpacity>
              {/* <Collapsible collapsed={isDescriptionCollapsed}> */}
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>
                  Indulge in the deliciously crunchy and nutritious Roasted Almonds. Sourced from the finest farms, these almonds are lightly roasted to bring out their natural flavor, making them a perfect snack for any time of the day. Rich in nutrients, they are a great source of healthy fats, protein, and vitamins that promote overall well-being.
                </Text>
              </View>
              {/* </Collapsible> */}
            </View>

            <View style={styles.DescriptionContainer}>
              <TouchableOpacity
                onPress={() => setIsNutritionCollapsed(!isNutritionCollapsed)}
                style={styles.CollapsedHeader}
              >
                <Text style={styles.sectionTitle}>Nutritional Information (Per 100g):</Text>
                <MaterialIcons name={isNutritionCollapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
              </TouchableOpacity>
              {/* <Collapsible collapsed={isNutritionCollapsed}> */}
              <View style={styles.textContainer}>
    
                  {[
                    { label: "Calories", value: "579 kcal" },
                    { label: "Protein", value: "21g" },
                    { label: "Total Fat", value: "50g" },
                    { label: "Saturated Fat", value: "4g" },
                    { label: "Carbohydrates", value: "22g" },
                    { label: "Sodium", value: "5g" },
                  ].map((item, index) => (
                    <View key={index} style={{flexDirection:"row", justifyContent:"space-between", paddingRight:rw(30)}}>
                      <Text style={styles.nutritionText}>{item.label}:</Text>
                      <Text style={styles.nutritionText}>{item.value}</Text>
                    </View>
                  ))}
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

            <View style={{backgroundColor:"white", borderRadius:10}}>
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
           
           <View style={{backgroundColor:"white", marginTop:rh(1), marginBottom:rh(1), padding:rw(3), borderRadius:5, overflow:"hidden"}}>
              <SimilarProducts />
           </View>


        </View>
      </ScrollView>

      <View style={{width:rw(100), height:rh(9), backgroundColor:"white", flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingVertical:rh(1), paddingHorizontal:rw(5)}}>
           <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')} style={{backgroundColor:"#DFDFDF", paddingVertical:rh(1.5), paddingHorizontal:rw(13), borderRadius:10}}>
              <Text style={{color:"black", fontWeight:"bold"}}>Buy Now</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:"#FF3131", paddingVertical:rh(1.5), paddingHorizontal:rw(13), borderRadius:10}}>
              <Text style={{color:"white", fontWeight:"bold"}}>Add to Cart</Text>
           </TouchableOpacity>
      </View>
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
  selectText: { fontSize: rf(1.8), color:"#717171", marginBottom:rh(1) },
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
});

export default ProductDetail;
