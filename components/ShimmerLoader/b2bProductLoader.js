// b2bProductLoader.js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { rw, rh, rf } from "../../Service/responsive";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const B2BProductLoader = ({ styleCardContainer, layout = "horizontal", count = 6 }) => {
  const placeholderData = Array(count).fill(null); // Placeholder array for rendering loaders

  return (
    <View style={{ flexDirection: "row" }}>
      <FlatList
        data={placeholderData}
        keyExtractor={(item, index) => index.toString()}
        horizontal={layout === "vertical" ? false : true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View
            style={[styles.cardContainer, styleCardContainer, { marginRight: 10 }]}
          >
            {/* Product Information Placeholder */}
            <View style={styles.infoContainer}>
              <View style={{ width: "70%" }}>
                <ShimmerPlaceholder style={styles.productNamePlaceholder} />
                <ShimmerPlaceholder style={styles.productSizesPlaceholder} />
              </View>
              <ShimmerPlaceholder style={styles.productImagePlaceholder} />
            </View>

            {/* Price and Add to Cart Placeholder */}
            <View style={styles.priceContainer}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: rw(2) }}>
                <ShimmerPlaceholder style={styles.pricePlaceholder} />
                <ShimmerPlaceholder style={styles.pricePlaceholder} />
              </View>
              <ShimmerPlaceholder style={styles.cartButtonPlaceholder} />
            </View>

            {/* Packet Prices Placeholder */}
            <View style={styles.packetContainer}>
              {[1, 2].map((_, index) => (
                <View key={index} style={styles.packetRow}>
                  <ShimmerPlaceholder style={styles.packetTextPlaceholder} />
                  <ShimmerPlaceholder style={styles.packetAddPlaceholder} />
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default B2BProductLoader;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: rw(4),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: rh(2),
    marginRight: rw(2),
    width: rw(75),
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: rh(1),
  },
  productNamePlaceholder: {
    width: "50%",
    height: rh(2.5),
    borderRadius: 5,
    marginBottom: rh(0.5),
  },
  productSizesPlaceholder: {
    width: "30%",
    height: rh(2),
    borderRadius: 5,
  },
  productImagePlaceholder: {
    width: rw(20),
    height: rw(20),
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: rh(0.5),
  },
  pricePlaceholder: {
    width: rw(15),
    height: rh(2),
    borderRadius: 5,
  },
  cartButtonPlaceholder: {
    width: rw(25),
    height: rh(3),
    borderRadius: 5,
  },
  packetContainer: {
    gap: rh(0.5),
  },
  packetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: rh(1.2),
    backgroundColor: "#FFF9F9",
    borderRadius: 5,
  },
  packetTextPlaceholder: {
    width: "60%",
    height: rh(2),
    borderRadius: 5,
  },
  packetAddPlaceholder: {
    width: rw(15),
    height: rh(2),
    borderRadius: 5,
  },
});
