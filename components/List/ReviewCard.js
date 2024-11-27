import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive'; // Ensure this is correctly linked in your project.

const ReviewCard = ({ image, rating, reviewText, reviewer, date }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <View style={styles.ratingRow}>
            {[...Array(5)].map((_, index) => (
              <Text
                key={index}
                style={index < rating ? styles.activeStar : styles.inactiveStar}
              >
                ★
              </Text>
            ))}
          </View>
          <Text style={styles.reviewText}>{reviewText}</Text>
        </View>
        <Text style={styles.productDescription}>Value for money product</Text>
        <Text style={styles.reviewerText}>
          {reviewer} | {date}
        </Text>
      </View>
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
  imageContainer: {
    width: rw(15),
    padding: rw(1),
    borderRadius: rw(2),
    marginRight: rw(3),
  },
  productImage: {
    height: rw(18),
    width:rw(18),
    borderRadius: rw(2),
  },
  cardContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(1),
    gap: rw(2), // Using rw for consistent spacing
  },
  ratingRow: {
    flexDirection: 'row',
    marginRight: rw(2),
  },
  activeStar: {
    color: '#FF3131',
    fontSize: rf(2), // Scaled font size for stars
  },
  inactiveStar: {
    color: '#ddd',
    fontSize: rf(2),
  },
  reviewText: {
    fontSize: rf(1.8),
    color: '#333',
  },
  productDescription: {
    fontSize: rf(1.8),
    color: '#555',
    marginBottom: rh(0.5),
    fontWeight:"bold"
  },
  reviewerText: {
    fontSize: rf(1.6),
    color: '#888',
  },
});

export default ReviewCard;
