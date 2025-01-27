import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { rw, rh, rf } from "../../Service/responsive"; // Ensure this is correctly linked in your project.

const ReviewCard = ({ image = [], rating, review, name, created_at, style }) => {
  // Ensure `image` is an array and filter out empty strings
  const filteredImages = Array.isArray(image) ? image.filter((img) => img && img.trim() !== "") : [];

  return (
    <View style={[styles.card, style]}>
      <View >
        {/* Images Row with Horizontal Scroll */}
        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          {filteredImages.length > 0 ? (
            filteredImages.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.productImage}
              />
            ))
          ) : (
            null
          )}
        </ScrollView>

        {/* Card Content */}
        <View style={styles.cardContent}>
          {/* Stars */}
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

          {/* Review Text */}
          <Text style={styles.reviewText}>{review}</Text>

          {/* Description */}
          <Text style={styles.productDescription}>Value for money product</Text>

          {/* Reviewer Name and Date */}
          <Text style={styles.reviewerText}>
            {name} | {new Date(created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: rw(3),
    padding: rw(3),
    marginBottom: rh(1),
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "nowrap", 
    marginBottom: rh(1),
    gap: rw(2), 
  },
  productImage: {
    width: rw(18),
    height: rw(18),
    borderRadius: rw(2),
    resizeMode: "cover",
    marginRight: rw(2),
  },
  cardContent: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: rh(0.5),
  },
  activeStar: {
    color: "#FF3131",
    fontSize: rf(2),
  },
  inactiveStar: {
    color: "#ddd",
    fontSize: rf(2),
  },
  reviewText: {
    fontSize: rf(1.8),
    color: "#333",
    marginBottom: rh(0.5),
  },
  productDescription: {
    fontSize: rf(1.8),
    color: "#555",
    fontWeight: "bold",
    marginBottom: rh(0.5),
  },
  reviewerText: {
    fontSize: rf(1.6),
    color: "#888",
  },
});

export default ReviewCard;
