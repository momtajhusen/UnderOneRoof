import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { rw, rh, rf } from "../../Service/responsive";
import { useNavigation } from '@react-navigation/native';


const B2BProductCard = ({
  items,
  name,
  image,
  price,
  discountedPrice,
  sizes,
  packets,
  onAdd,
  onIncrement,
  onDecrement,
  styleCardContainer
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity  onPress={() => navigation.navigate('B2BProceedDetails', { item: items })} style={[styles.cardContainer, styleCardContainer ]}>
      {/* Product Information */}
      <View style={styles.infoContainer}>
        <View style={{ width: "70%"}}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productSizes}>{sizes}</Text>
        </View>
        <Image source={image} style={styles.productImage} />
      </View>

      {/* Price and Add to Cart */}
      <View style={styles.priceContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: rw(2) }}>
          <Text style={styles.originalPrice}>₹{price}</Text>
          <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Packet Prices */}
      <View style={styles.packetContainer}>
        {packets.map((packet, index) => (
          <View key={index} style={styles.packetRow}>
            <Text style={styles.packetText}>{packet}</Text>
            <TouchableOpacity onPress={onAdd}>
              <Text style={styles.packetAddText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default B2BProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: rw(4),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: rh(2),
    marginRight: rw(2),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: rh(1),
  },
  productName: {
    fontSize: rf(2.3),
    fontWeight: "600",
    color: "#333",
  },
  productSizes: {
    color: "#717171",
    marginTop: rh(0.5),
    fontSize: rf(1.8),
  },
  productImage: {
    width: rw(20),
    height: rw(20),
    borderRadius: 10,
    resizeMode: "contain",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: rh(0.5),
  },
  discountedPrice: {
    color: "#9D9D9D",
    textDecorationLine: "line-through",
    fontSize: rf(1.8),
  },
  originalPrice: {
    fontWeight: "600",
    fontSize: rf(2),
  },
  cartButton: {
    borderWidth: 1,
    paddingHorizontal: rw(4),
    paddingVertical: rh(0.8),
    borderColor: "#FF3131",
    borderRadius: 5,
  },
  cartButtonText: {
    color: "#FF3131",
    fontWeight: "bold",
    fontSize: rf(1.8),
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
  packetText: {
    fontWeight: "bold",
    color: "#FF9100",
    fontSize: rf(1.8),
  },
  packetAddText: {
    fontWeight: "bold",
    color: "#FF3131",
    fontSize: rf(1.8),
  },
});
