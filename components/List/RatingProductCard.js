import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive'; // Responsive utilities

const RatingProductCard = ({ rating, reviewCount, images }) => {

  console.log('//////////////////////////////');
  console.log(reviewCount);
  console.log('//////////////////////////////');

  return (
    <View style={styles.card}>
      {/* Title Section */}
      <Text style={styles.title}>Ratings & Reviews</Text>

      {/* Ratings Section */}
      <View style={styles.ratingRow}>
        <View>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Text
              key={index}
              style={index < rating ? styles.activeStar : styles.inactiveStar}
            >
              ★
            </Text>
          ))}
          <Text style={styles.reviewCount}> ({reviewCount})</Text>
        </View>
        </View>

      </View>

      {/* Images Section */}
      <FlatList
        data={images.slice(0, 4)} // Show only the first 4 images
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.productImage} />
            {index === 3 && images.length > 4 && ( // Check if it's the last visible image and there are more than 4 images
              <View style={styles.overlay}>
                <Text style={styles.moreImagesText}>+{images.length - 4}</Text>
              </View>
            )}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: rw(3),
    padding: rw(3),
    marginBottom: rh(1),
  },
  title: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(1),
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: rw(2),
    justifyContent:"center",
    alignItems:"center"
  },
  activeStar: {
    color: '#FF3131',
    fontSize: rf(3),
  },
  inactiveStar: {
    color: '#ddd',
    fontSize: rf(3),
  },
  reviewCount: {
    fontSize: rf(1.8),
    color: '#888',
  },
  imageWrapper: {
    width: rw(20),
    height: rw(20),
    marginRight: rw(2),
    borderRadius: rw(2),
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: rw(2),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    fontSize: rf(2),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RatingProductCard;
