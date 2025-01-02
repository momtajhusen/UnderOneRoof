import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { rw, rh, rf } from "../../Service/responsive";
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

import { useAddFromCart } from '../../utility/addCartProductUtils';
import { useQtyUpdate } from '../../utility/QtyUpdateUtils';

const B2BProductCard = ({ items, styleCardContainer, layout = "horizontal" }) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  const { addFromCart } = useAddFromCart();
  const { qtyUpdate, isQtyUpdateLoading } = useQtyUpdate();

  // State to track loading for each variant (using product id and variant id as keys)
  const [loadingVariants, setLoadingVariants] = useState({});

  const addToCart = async (psid, var_id) => {
    // Set loading state for this variant
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: true,
    }));

    const result = await addFromCart(psid, var_id);

    // Reset loading state after the operation is complete
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: false,
    }));
  };

  const handleIncrease = async (psid, qty, var_id) => {
    const newQty = qty + 1;
    // Update quantity and set loading state
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));

    const result = await qtyUpdate(psid, newQty, var_id);

    // Reset loading state after quantity update
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: false,
    }));
  };

const handleDecrease = async (psid, qty, var_id) => {
  if (qty > 1) {
    const newQty = qty - 1;

    // Update quantity and set loading state
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));

    const result = await qtyUpdate(psid, newQty, var_id);

    // Reset loading state after quantity update
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: false,
    }));
  } else {
    alert("Quantity cannot be less than 1!");
  }
};


  return (
    <View style={{ flexDirection: "row" }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.pid.toString()}
        horizontal={layout === "vertical" ? false : true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[styles.cardContainer, styleCardContainer, { marginRight: 10 }]} // Added margin between items
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  item: item,
                  itemImage: item.itemimage,
                })
              }
            >
              {/* Product Information */}
              <View style={styles.infoContainer}>
                <View style={{ width: "70%" }}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productSizes}>{item.measurement} {item.unit}</Text>
                </View>
                <Image source={{ uri: item.itemimage }} style={styles.productImage} />
              </View>

              {/* Price and Add to Cart */}
              <View style={styles.priceContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: rw(2) }}>
                  <Text style={styles.originalPrice}>₹{item.selling_price}</Text>
                  <Text style={styles.discountedPrice}>₹{item.mrp_price}</Text>
                </View>

                {state.viewCartData.cartProduct?.some(cartItem => cartItem.pid === item.pid && cartItem.var_id === item.varient_id) ? (
                  // Show quantity controls if the product is in the cart
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FF3131", borderRadius: 5 }}>
                    <TouchableOpacity
                      style={{ paddingHorizontal: rw(3), paddingVertical: rh(1) }}
                      onPress={() => handleDecrease(item.pid, state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0, item.varient_id)}
                    >
                      {loadingVariants[`${item.pid}-${item.varient_id}-qty`] ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
                      )}
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "bold", marginHorizontal: rw(2) }}>
                      {state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0}
                    </Text>
                    <TouchableOpacity
                      style={{ paddingHorizontal: rw(3), paddingVertical: rh(1) }}
                      onPress={() => handleIncrease(item.pid, state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0, item.varient_id)}
                    >
                      {loadingVariants[`${item.pid}-${item.varient_id}-qty`] ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Show "Add to Cart" button if the product is not in the cart
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(item.pid, item.varient_id)}
                  >
                    {loadingVariants[`${item.pid}-${item.varient_id}`] ? (
                      <ActivityIndicator size="small" color="#FF3131" />
                    ) : (
                      <Text style={styles.cartButtonText}>Add to Cart</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>


              {/* Packet Prices */}
              <View style={styles.packetContainer}>
                {item.varient.filter(variant => variant.psid !== item.varient_id).map((variant, index) => {
                  const isInCart = state.viewCartData.cartProduct?.some(
                    cartItem => cartItem.pid === item.pid && cartItem.var_id === variant.psid
                  );

                  const totalQtyInCart = state.viewCartData.cartProduct?.reduce((total, cartItem) => {
                    if (cartItem.pid === item.pid && cartItem.var_id === variant.psid) {
                      return total + cartItem.qty;
                    }
                    return total;
                  }, 0) || 0;

                  return (
                    <View key={index} style={styles.packetRow}>
                      <Text style={styles.packetText}>
                        {variant.pmeasurement} {variant.punit} - ₹{variant.pselling_price}
                      </Text>

                      {isInCart ? (
                        <View style={{ justifyContent: "space-between", borderRadius: 5, flexDirection: "row", backgroundColor: "#FF3131", width: "30%", paddingVertical: "2%" }}>
                          <TouchableOpacity
                            style={{ width: "30%", justifyContent: "center", alignItems: "center" }}
                            onPress={() => handleDecrease(item.pid, totalQtyInCart, variant.psid)}
                          >
                            {loadingVariants[`${item.pid}-${variant.psid}-qty`] ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
                            )}
                          </TouchableOpacity>
                          <Text style={{ color: "white", fontWeight: "bold", paddingBottom: "3%" }}>
                            {totalQtyInCart}
                          </Text>
                          <TouchableOpacity
                            style={{ width: "30%", justifyContent: "center", alignItems: "center" }}
                            onPress={() => handleIncrease(item.pid, totalQtyInCart, variant.psid)}
                          >
                            {loadingVariants[`${item.pid}-${variant.psid}-qty`] ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Text style={{ color: "white" }}>+</Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={() => addToCart(item.pid, variant.psid)}>
                          {loadingVariants[`${item.pid}-${variant.psid}`] ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                          ) : (
                            <Text style={styles.packetAddText}>Add</Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    width: rw(75),
    overflow: "scroll",
  },
  

  verticalLayout: {
    flexDirection: "column",
  },
  horizontalLayout: {
    flexDirection: "row",
    alignItems: "center",
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
