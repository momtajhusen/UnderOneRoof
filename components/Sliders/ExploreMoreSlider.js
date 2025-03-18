import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh, rf } from '../../Service/responsive';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Shimmer = createShimmerPlaceholder(LinearGradient);
const { width: screenWidth } = Dimensions.get('window');

const ExploreMoreSlider = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (data && data.slider) {
      if (Array.isArray(data.slider) && data.slider.length > 0) {
        setSliderData(data.slider);
      }
      setLoading(false);
    }
  }, [data]);

  if (!loading && (!data || !data.slider || data.slider.length === 0)) {
    return null;
  }

  const handleImagePress = (cname, cslug) => {
    navigation.navigate('ProductListing', {
      selectCategoryId: '',
      selectCategoryName: '',
      selectCategorySlug: cslug,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.cname, item.link)} style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Header with Slide Number */}
      <View style={styles.headerContainer}>
        {loading ? (
          <Shimmer style={[styles.headerText, { width: '50%' }]} />
        ) : (
          <Text style={styles.headerText}>Explore More</Text>
        )}

        {!loading && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {`${activeSlide + 1}/${sliderData.length}`}
            </Text>
          </View>
        )}
      </View>

      {loading ? (
        <Shimmer style={styles.shimmer} />
      ) : (
        <Carousel
          data={sliderData}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={rw(80)}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          autoplay={true}
          autoplayInterval={4000}
          loop={true}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: rw(4.5),
    marginBottom: rh(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: rf(2),
    fontWeight: 'bold',
  },
  counterContainer: {
    marginRight: rw(3),
    width: rw(14),
    backgroundColor: 'black',
    paddingVertical: rh(0.8),
    borderRadius: 10,
  },
  counterText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slide: {
    width: rw(80),
    height: rh(17), // Same size as HomeSlider's sliderStyle
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  shimmer: {
    width: rw(80),
    height: rh(17),
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: rw(10),
  },
});

export default ExploreMoreSlider;
