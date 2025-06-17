import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh } from '../../Service/responsive';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av'; // ✅ expo-av is stable

const { width: screenWidth } = Dimensions.get('window');
const Shimmer = createShimmerPlaceholder(LinearGradient);

const HomeSlider = ({ sliderData, sliderStyle }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (sliderData && sliderData.length > 0) {
      setLoading(false);
    }
  }, [sliderData]);

  const handleImagePress = (cname, cslug) => {
    navigation.navigate('ProductListing', {
      selectCategoryId: '',
      selectCategoryName: '',
      selectCategorySlug: cslug,
    });
  };

  const renderItem = ({ item }) => {
    const isVideo = item.image?.toLowerCase().endsWith('.mp4');

    return (
      <TouchableOpacity
        onPress={() => handleImagePress(item.cname, item.link)}
        style={[styles.slide, sliderStyle]}
        activeOpacity={0.9}
      >
        {isVideo ? (
          <Video
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
            isMuted
            shouldPlay
            isLooping
            usePoster={true}
            posterSource={{ uri: 'https://via.placeholder.com/300x200' }}
            posterStyle={styles.image}
            useNativeControls={false}
          />
        ) : (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: rw(80),
    height: rw(35),
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
    height: rw(35),
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: rw(10),
  },
});

export default HomeSlider;
