import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { rw, rh, rf } from "../../Service/responsive";
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

import { useAddFromCart } from '../../utility/addCartProductUtils';
import { useQtyUpdate } from '../../utility/QtyUpdateUtils';
import { useRemoveFromCart } from '../../utility/deleteCartProductUtils';

const B2BProductCard = ({ items, styleCardContainer, layout = "horizontal" }) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  const { addFromCart } = useAddFromCart();
  const { qtyUpdate, isQtyUpdateLoading } = useQtyUpdate();
   const {isCartDeleteLoading, removeFromCart } = useRemoveFromCart();

  // State to track loading for each variant (using product id and variant id as keys)
  const [loadingVariants, setLoadingVariants] = useState({});

  const addToCart = async (psid, var_id, moq) => {

    // Set loading state for this variant
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: true,
    }));

    const result = await addFromCart(psid, var_id, moq);

    // Reset loading state after the operation is complete
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: false,
    }));
  };

  const handleIncrease = async (psid, qty, var_id, moq) => {
    const newQty = qty + 1;
    // Update quantity and set loading state
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));

    const result = await qtyUpdate(psid, newQty, var_id, moq);
    
    // Reset loading state after quantity update
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: false,
    }));
  };

  const handleDecrease = async (psid, qty, var_id, moq) => {
    const minQuantity = moq ?? 1;
  
    if (qty <= minQuantity) {
      // Set loading for delete operation
      setLoadingVariants((prevState) => ({
        ...prevState,
        [`${psid}-${var_id}-delete`]: true,
      }));
  
      await removeFromCart(psid, var_id);
  
      // Reset loading after delete operation
      setTimeout(() => {
        setLoadingVariants((prevState) => ({
          ...prevState,
          [`${psid}-${var_id}-delete`]: false,
        }));
      }, 300);
  
      return;
    }
  
    // Decrease quantity logic
    const newQty = qty - 1;
  
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));
  
    await qtyUpdate(psid, newQty, var_id);
  
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: false,
    }));
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
            style={[styles.cardContainer, styleCardContainer]}  
          >
            <TouchableOpacity
              onPress={() =>
                
                navigation.navigate('ProductDetail', {
                  item: item,
                  itemImage: item.itemimage,
                  itemQty:state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
                })
                
              }
              disabled={item.pstock === 0}
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
                  <Text style={styles.originalPrice}>
                    ₹{item.moq_price ? item.moq_price : item.selling_price}
                  </Text>
                  <Text style={styles.discountedPrice}>₹{item.mrp_price}</Text>
                </View>

                {item.pstock === 0 ? (  
                  <View style={styles.OutOfStock}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Out Of Stock</Text>
                  </View>
                ) : (
                  state.viewCartData.cartProduct?.some(cartItem => cartItem.pid === item.pid && cartItem.var_id === item.varient_id) ? (
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FF3131", borderRadius: 5 }}>
                      
                      {/* Decrease Button */}
                      <TouchableOpacity
                        style={{ paddingHorizontal: rw(3), paddingVertical: rh(1) }}
                        onPress={() =>
                          handleDecrease(
                            item.pid,
                            state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
                            item.varient_id,
                            item.varient[0].moq
                          )
                        }
                        disabled={loadingVariants[`${item.pid}-${item.varient_id}-qty`]}  
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
                      </TouchableOpacity>

                      {/* Quantity or Loader */}
                      <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: rw(2) }}>
                        {loadingVariants[`${item.pid}-${item.varient_id}-delete`] ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : loadingVariants[`${item.pid}-${item.varient_id}-qty`] ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {state.viewCartData.cartProduct.find((cartItem) => cartItem.pid === item.pid)?.qty || 0}
                          </Text>
                        )}
                      </View>

                      {/* Increase Button */}
                      <TouchableOpacity
                        style={{ paddingHorizontal: rw(3), paddingVertical: rh(1) }}
                        onPress={() =>
                          handleIncrease(
                            item.pid,
                            state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
                            item.varient_id,
                            item.varient[0].moq
                          )
                        }
                        disabled={loadingVariants[`${item.pid}-${item.varient_id}-qty`]}  
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
                      </TouchableOpacity>

                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.cartButton}
                      onPress={() => addToCart(item.pid, item.varient_id, item.varient[0].moq)}
                      disabled={loadingVariants[`${item.pid}-${item.varient_id}`]}  
                    >
                      {loadingVariants[`${item.pid}-${item.varient_id}`] ? (
                        <ActivityIndicator size="small" color="#FF3131" />
                      ) : (
                        <Text style={styles.cartButtonText}>Add to Cart</Text>
                      )}
                    </TouchableOpacity>
                  )
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
                      {`${((variant.pmeasurement || "") + " " + (variant.punit || "") + " - ₹" + ((variant.moq_price || variant.pselling_price) || "0"))
                        .substring(0, 23)}${
                        ((variant.pmeasurement || "") + " " + (variant.punit || "") + " - ₹" + ((variant.moq_price || variant.pselling_price) || "0")).length > 20
                          ? "..."
                          : ""
                      }`}
                    </Text>

                      {isInCart ? (
                          <View
                            style={{
                              justifyContent: "space-between",
                              borderRadius: 5,
                              flexDirection: "row",
                              backgroundColor: "#FF3131",
                              width: "30%",
                              paddingVertical: "2%",
                            }}
                          >
                            {/* Decrease Button */}
                            <TouchableOpacity
                              style={{
                                width: "30%",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => handleDecrease(item.pid, totalQtyInCart, variant.psid, variant.moq)}
                              disabled={loadingVariants[`${item.pid}-${variant.psid}-qty`]} // Disable during loading
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>-</Text>
                            </TouchableOpacity>

                            {/* Quantity or Loader */}
                            <View style={{ justifyContent: "center", alignItems: "center", width: "30%" }}>
                            {loadingVariants[`${item.pid}-${variant.psid}-delete`] ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : loadingVariants[`${item.pid}-${variant.psid}-qty`] ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Text style={{ color: "white", fontWeight: "bold" }}>{totalQtyInCart}</Text>
                            )}

                            </View>

                            {/* Increase Button */}
                            <TouchableOpacity
                              style={{
                                width: "30%",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => handleIncrease(item.pid, totalQtyInCart, variant.psid, variant.moq)}
                              disabled={loadingVariants[`${item.pid}-${variant.psid}-qty`]} 
                            >
                              <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => addToCart(item.pid, variant.psid, variant.moq)}
                            disabled={loadingVariants[`${item.pid}-${variant.psid}`]} 
                          >
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
    OutOfStock: {
      position: "absolute",
      width: rw(25),
      height: rh(3),
      right: rw(0),
      bottom: rh(0.5),
      backgroundColor: "#FF3131",
      justifyContent: "center",
      borderRadius: 10,
      opacity: 100,
      zIndex:100,
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
