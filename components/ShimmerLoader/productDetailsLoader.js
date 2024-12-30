// Updated ProductDetailsLoader.js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { rw, rh, rf } from "../../Service/responsive";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductDetailsLoader = ({ styleCardContainer, layout = "vertical", count = 10 }) => {
  const placeholderData = Array(count).fill(null); // Placeholder array for rendering loaders

  return (
    <FlatList
      data={placeholderData}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View style={[styles.cardContainer, styleCardContainer]}>
          {/* Discount Placeholder */}
          <ShimmerPlaceholder style={styles.discountPlaceholder} />

          {/* Product Name and Rating */}
          <View style={styles.nameRatingContainer}>
            <ShimmerPlaceholder style={styles.productNamePlaceholder} />
            <ShimmerPlaceholder style={styles.ratingPlaceholder} />
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <ShimmerPlaceholder style={styles.currentPricePlaceholder} />
            <ShimmerPlaceholder style={styles.originalPricePlaceholder} />
            <ShimmerPlaceholder style={styles.saveAmountPlaceholder} />
          </View>

          {/* Delivery Options */}
          <View style={styles.deliveryOptionsContainer}>
            <ShimmerPlaceholder style={styles.deliveryPlaceholder} />
            <ShimmerPlaceholder style={styles.deliveryPlaceholder} />
          </View>
        </View>
      )}
    />
  );
};

export default ProductDetailsLoader;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    padding: rw(4),
    borderColor: "#E0E0E0",
    width: rw(95),
    overflow: "hidden",
    marginLeft:rw(2.5)
  },
  discountPlaceholder: {
    width: "30%",
    height: rh(2),
    backgroundColor: "#FFEBEB",
    borderRadius: 5,
    marginBottom: rh(1),
  },
  nameRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: rh(1),
  },
  productNamePlaceholder: {
    width: "50%",
    height: rh(2.5),
    borderRadius: 5,
  },
  ratingPlaceholder: {
    width: "20%",
    height: rh(2),
    borderRadius: 5,
  },
  priceContainer: {
    marginBottom: rh(1),
  },
  currentPricePlaceholder: {
    width: "30%",
    height: rh(2.5),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  originalPricePlaceholder: {
    width: "20%",
    height: rh(2),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  saveAmountPlaceholder: {
    width: "40%",
    height: rh(2),
    borderRadius: 5,
  },
  deliveryOptionsContainer: {
    marginTop: rh(1),
  },
  deliveryPlaceholder: {
    width: "70%",
    height: rh(2),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
});
