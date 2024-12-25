import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../Service/responsive';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ItemsListLoader = ({ layout = 'horizontal' }) => {
  return (
    <View style={[styles.itemContainer, layout === 'horizontal' && { flexDirection: 'row', marginRight: rw(1.5) }]}>
      {/* Image Placeholder */}
      <View style={styles.ImageContainer}>
        <ShimmerPlaceholder
          style={styles.image}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
        <ShimmerPlaceholder
          style={styles.likeIcon}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
      </View>
      {/* Product Details Placeholder */}
      <View style={styles.detailsContainer}>
        <ShimmerPlaceholder
          style={styles.weightPlaceholder}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
        <ShimmerPlaceholder
          style={styles.textPlaceholder}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
        <ShimmerPlaceholder
          style={styles.ratingPlaceholder}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
        <ShimmerPlaceholder
          style={styles.discountPlaceholder}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
        <ShimmerPlaceholder
          style={styles.pricePlaceholder}
          shimmerColors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: rw(39),
    marginBottom: rh(2),
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
    paddingHorizontal: rw(2),
    padding: rh(0.5),
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  likeIcon: {
    position: 'absolute',
    left: rw(1),
    top: rh(0.5),
    width: rf(3),
    height: rf(3),
    borderRadius: rf(1.5),
  },
  detailsContainer: {
    marginTop: rh(1),
    paddingHorizontal: rw(2),
    paddingBottom:rh(1),
  },
  weightPlaceholder: {
    height: rh(2),
    width: rw(20),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  textPlaceholder: {
    height: rh(2.5),
    width: rw(35),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  ratingPlaceholder: {
    height: rh(2),
    width: rw(20),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  discountPlaceholder: {
    height: rh(2),
    width: rw(15),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  pricePlaceholder: {
    height: rh(2.5),
    width: rw(30),
    borderRadius: 5,
  },
});

export default ItemsListLoader;
