import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh } from '../../Service/responsive';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CategoryListLoader = () => {
  const placeholderItems = Array(1).fill(0);

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      {placeholderItems.map((_, index) => (
        <View key={index} style={styles.listContainer}>
          <ShimmerPlaceholder 
            style={styles.imageShimmer} 
            shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
          />
          <ShimmerPlaceholder 
            style={styles.textShimmer} 
            shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoryListLoader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:"center",
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: rw(3),
    marginRight: rw(2),
    marginBottom: rh(1.8),
    borderWidth: 2,
    borderColor: "white",
  },
  imageShimmer: {
    width: rw(20),
    height: rh(8),
    backgroundColor: '#FFF4E6',
    borderRadius: rw(2),
  },
  textShimmer: {
    marginVertical: rh(0.5),
    width: rw(12),
    height: rh(2),
    borderRadius: rw(1),
    backgroundColor: '#FFF4E6',
  },
});
