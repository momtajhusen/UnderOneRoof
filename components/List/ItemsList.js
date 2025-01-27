import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-native-shared-element';
import { useToggleWishlist } from '../../utility/toggleWishlistUtils';
import { useAddFromCart } from '../../utility/addCartProductUtils';
import { useQtyUpdate } from '../../utility/QtyUpdateUtils';
import { useRemoveFromCart } from '../../utility/deleteCartProductUtils';
import { AppContext } from '../../context/AppContext';

const ItemsList = ({ items, listContainerStyle, layout = 'horizontal', cartbtn }) => {
  const navigation = useNavigation();
  const { state } = useContext(AppContext);

  const [loadingVariants, setLoadingVariants] = useState({});
  const [wishlist, setWishlist] = useState({});
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { toggleWishlist } = useToggleWishlist();
  const { addFromCart } = useAddFromCart();
  const { qtyUpdate } = useQtyUpdate();
  const { removeFromCart } = useRemoveFromCart();

  // Initialize wishlist state
  useEffect(() => {
    const initialWishlist = {};
    items.forEach((item) => {
      initialWishlist[item.pid] = item.added_to_wishlist ?? false;
    });
    setWishlist(initialWishlist);
  }, [items]);

  const handleAddToCart = async (psid, var_id, moq) => {
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: true,
    }));

    await addFromCart(psid, var_id, moq);

    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}`]: false,
    }));
  };

  const handleIncrease = async (psid, qty, var_id, moq) => {
    const newQty = qty + 1;

    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));

    await qtyUpdate(psid, newQty, var_id, moq);

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
  
    // Set loading for quantity update
    const newQty = qty - 1;
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: true,
    }));
  
    await qtyUpdate(psid, newQty, var_id);
  
    // Reset loading for quantity update
    setLoadingVariants((prevState) => ({
      ...prevState,
      [`${psid}-${var_id}-qty`]: false,
    }));
  };
  
  

  const handleWishlistToggle = async (item) => {
    const pid = item.pid;
    const uid = state.userId;
  
    setWishlist((prevWishlist) => {
      const isInWishlist = !prevWishlist[pid];  
      toggleWishlist(pid, isInWishlist, uid); 
      return {
        ...prevWishlist,
        [pid]: isInWishlist,
      };
    });
  };
  
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.pid.toString()}
      horizontal={layout === 'horizontal'}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const cartProducts = state.viewCartData?.cartProduct || [];
        const isInCart = cartProducts.some(
          (cartItem) => cartItem.pid === item.pid && cartItem.var_id === item.varient_id
        );
        const itemQty =
          cartProducts.find((cartItem) => cartItem.pid === item.pid)?.qty || 0;

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                item: item,
                itemImage: item.itemimage,
                itemQty:itemQty,
              })
            }
            disabled={item.stock === 0}
            style={[
              styles.itemContainer,
              listContainerStyle,
              item.stock === 0 && styles.disabledItem,
            ]}
          >
            <View style={styles.ImageContainer}>
              <TouchableOpacity
                onPress={() => handleWishlistToggle(item)}
                style={styles.likeIcon}
              >
                <MaterialIcons
                  name={wishlist[item.pid] ? 'favorite' : 'favorite-border'}
                  size={24}
                  style={{ color: wishlist[item.pid] ? '#DC3545' : '#BCBCBC' }}
                />
              </TouchableOpacity>
              
              {!cartbtn && ( // If cartbtn is true, this block will be hidden
                isInCart ? (
                  <View style={styles.IncreaseAurDecreaseContener}>
                    <TouchableOpacity
                      onPress={() =>
                        handleDecrease(item.pid, itemQty, item.varient_id, item.moq)
                      }
                      disabled={loadingVariants[`${item.pid}-${item.varient_id}-qty`]}
                    >
                      <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>
                    {loadingVariants[`${item.pid}-${item.varient_id}-delete`] ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : loadingVariants[`${item.pid}-${item.varient_id}-qty`] ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>{itemQty}</Text>
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        handleIncrease(item.pid, itemQty, item.varient_id, item.moq)
                      }
                      disabled={loadingVariants[`${item.pid}-${item.varient_id}-qty`]}
                    >
                      <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      handleAddToCart(item.pid, item.varient_id, item.moq)
                    }
                    disabled={loadingVariants[`${item.pid}-${item.varient_id}`]}
                    style={styles.addbtn}
                  >
                    {loadingVariants[`${item.pid}-${item.varient_id}`] ? (
                      <ActivityIndicator size="small" color="#FF3131" />
                    ) : (
                      <Text style={styles.btntext}>Add</Text>
                    )}
                  </TouchableOpacity>
                )
              )}


              <SharedElement id={`item.${item.pid}.image`}>
                <Image
                  source={{ uri: item.itemimage || 'https://via.placeholder.com/150' }}
                  style={styles.image}
                />
              </SharedElement>
            </View>
            <View style={styles.details}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: rw(2) }}>
                <Text style={styles.weight}>
                  {item.measurement} {item.unit}
                </Text>
              </View>
              <View style={{ paddingHorizontal: rw(2), paddingVertical: rh(0.5) }}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {Array.from({ length: 5 }, (_, index) => {
                    const avg = item.avg || 0;  
                    const isHalfFilled = avg > index && avg < index + 1;  
                    const isFilled = avg >= index + 1; 

                    return (
                      <MaterialIcons
                        key={index}
                        name={isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'}
                        size={rf(2)}
                        style={styles.starIcon}
                      />
                    );
                  })}
                  <Text style={{ fontSize: rf(1.5), marginLeft: rw(1) }}>({item.rating})</Text>
                </View>

                {item.stock === 0 && (
                  <View style={styles.OutOfStock}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Out Of Stock</Text>
                  </View>
                )}
                <Text style={styles.discount}>{item.discount || 0} % OFF</Text>
                <Text style={styles.price}>
                  ₹{item.selling_price || 'N/A'}{' '}
                  <Text style={styles.mpr}>
                    MPR <Text style={styles.mprPrice}>₹{item.mrp_price || 'N/A'}</Text>
                  </Text>
                </Text>
              </View>

            {/* add to cart  */}
            {cartbtn && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  paddingVertical: rh(0.5),
                  marginHorizontal: rw(3),
                  marginBottom: rh(1),
                  borderColor: "#FF3131",
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  const key = `${item.pid}-${item.varient_id}-moveToCart`;
                  setLoadingVariants((prevState) => ({
                    ...prevState,
                    [key]: true,
                  }));

                  try {
                    await handleAddToCart(item.pid, item.varient_id, item.moq);
                    await handleWishlistToggle(item);
                  } catch (error) {
                    console.error("Error moving item to cart:", error);
                  } finally {
                    setLoadingVariants((prevState) => ({
                      ...prevState,
                      [key]: false,
                    }));
                  }
                }}
                disabled={loadingVariants[`${item.pid}-${item.varient_id}-moveToCart`]} // Disable button during loading
              >
                {loadingVariants[`${item.pid}-${item.varient_id}-moveToCart`] ? (
                  <ActivityIndicator size="small" color="#FF3131" />
                ) : (
                  <Text style={{ textAlign: "center", fontWeight: "400", color: "#FF3131" }}>
                    Move to Cart
                  </Text>
                )}
              </TouchableOpacity>
            )}



        
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: rw(0),
    flexDirection: "row",
    flexWrap: 'wrap',
    marginBottom: rh(2),
    overflow: "hidden",
  },
  itemContainer: {
    width: rw(39),
    marginRight: rw(1.5),
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF4E6",
    paddingHorizontal: rw(2),
    paddingTop: rh(0.5),
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  likeIcon: {
    position: "absolute",
    left: rw(1),
    top: rh(0.5),
    padding: rw(1),
    zIndex: 100,
  },
  addbtn: {
    position: "absolute",
    width: rw(19),
    height: rh(3.5),
    right: rw(1),
    bottom: rh(0.5),
    borderWidth: 2,
    borderColor: "#FF3131",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
  },
  IncreaseAurDecreaseContener: {
    position: "absolute",
    width: rw(23),
    height: rh(3.5),
    right: rw(1),
    bottom: rh(0.5),
    borderWidth: 2,
    borderColor: "#FF3131",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#FF3131",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:rw(1),
    alignItems:"center"
  },
  controlText:{
    paddingHorizontal:rw(2.5),
    paddingVertical:rh(0),
    fontSize:rf(2),
    borderRadius:5,
    color:"white",
    fontWeight:"bold"
  },
  OutOfStock: {
    position: "absolute",
    width: rw(25),
    height: rh(3),
    left: rw(1),
    bottom: rh(0.5),
    top: rh(-8),
    backgroundColor: "#FF3131",
    justifyContent: "center",
    borderRadius: 10,
    opacity: 100,
  },
  disabledItem: {
    opacity: 0.5,
  },
  btntext: {
    textAlign: "center",
    color: "#FF3131",
  },
  details: {
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    height: rh(5),
  },
  weight: {
    fontSize: rf(1.5),
    color: '#FF9100',
    backgroundColor: '#FFF4E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    borderRadius: 2,
  },
  type: {
    fontSize: rf(1.5),
    color: '#FF9100',
    backgroundColor: '#FFF4E6',
    alignSelf: 'flex-start',
    marginLeft: rw(1),
    paddingHorizontal: 6,
    borderRadius: 2,
  },
  starIcon: {
    color: '#FF3131',
  },
  discount: {
    fontSize: rf(1.5),
    color: '#FF9100',
    marginTop: rh(0.5),
  },
  price: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#212529',
    marginTop: rh(0.5),
  },
  mpr: {
    fontSize: rf(1.5),
    textDecorationLine: 'none',
    color: 'grey',
    fontWeight: "normal",
  },
  mprPrice: {
    fontSize: rf(1.5),
    color: 'grey',
    textDecorationLine: 'line-through',
  },
});
