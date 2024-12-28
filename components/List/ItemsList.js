// ItemsList.js 
import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Animated } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-native-shared-element';
import { useToggleWishlist } from '../../utility/toggleWishlistUtils';
import { AppContext } from '../../context/AppContext';


const ItemsList = ({ items, listContainerStyle, layout = 'horizontal', cartbtn }) => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const {state, dispatch } = useContext(AppContext);
  

  // State to manage the visibility of IncreaseAurDecreaseContener for each item
  const [showIncreaseDecrease, setShowIncreaseDecrease] = useState(null);
  const [itemQuantity, setItemQuantity] = useState({}); // Store quantity for each item

  // Animated value for sliding animation
  const slideAnim = useRef(new Animated.Value(0)).current;

  // State to manage wishlist status for each item (using their IDs)
  const [wishlist, setWishlist] = useState({});

  const { isWishlistLoading, toggleWishlist } = useToggleWishlist();

  const handleAdd = (item) => {
    const id = item.pid;
    if (showIncreaseDecrease === id) {
      // Close the container by resetting the animated value
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setShowIncreaseDecrease(null);
    } else {
      // Open the container with a sliding effect
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setShowIncreaseDecrease(id);
      setItemQuantity((prev) => ({ ...prev, [id]: 1 })); // Set initial quantity to 1
    }
  };

  const handleIncrease = (id) => {
    setItemQuantity((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const handleDecrease = (id) => {
    setItemQuantity((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        // If quantity reaches 0, reset and show "Add" button again
        setShowIncreaseDecrease(null);
        return { ...prev, [id]: 0 };
      }
    });
  };

  const handleWishlistToggle = async (item) => {
    const id = item.pid;
    const pid = item.pid;
    const uid = state.userId;
    
    // Default value set karna
    const isInWishlist = item.added_to_wishlist ?? 1;
  
    // Toggle wishlist state
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [id]: !prevWishlist[id],
    }));
  
    // API call to update the wishlist
    const result = await toggleWishlist(pid, isInWishlist, uid);
    console.log(result);
  };
  

  // useEffect to initialize wishlist state based on items
  useEffect(() => {
    const initialWishlist = {};
    items.forEach((item) => {
      // Default value 1 if added_to_wishlist is not present
      initialWishlist[item.pid] = item.added_to_wishlist ?? 1;
    });
    setWishlist(initialWishlist);
  }, [items]);
  

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.pid.toString()}
      horizontal={layout === 'horizontal'}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', {
              item: item,
              itemImage: item.itemimage,
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
                size={24} // Adjust size as needed
                style={{ color: wishlist[item.pid] ? '#DC3545' : '#BCBCBC' }}
              />
            </TouchableOpacity>

            {showIncreaseDecrease !== item.pid && (
              <TouchableOpacity
                disabled={item.stock === 0}
                onPress={() => handleAdd(item)}
                style={styles.addbtn}
              >
                <Text style={styles.btntext}>Add</Text>
              </TouchableOpacity>
            )}

            {showIncreaseDecrease === item.pid && (
              <Animated.View
                style={[
                  styles.IncreaseAurDecreaseContener,
                  {
                    transform: [
                      {
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [rw(20), 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <TouchableOpacity
                    style={{ width: '45%', height: '100%' }}
                    onPress={() => handleIncrease(item.pid)}
                  >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: rf(2), color: 'white' }}>
                      +
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{itemQuantity[item.pid] || 0}</Text>
                  <TouchableOpacity
                    style={{ width: '45%', height: '100%' }}
                    onPress={() => handleDecrease(item.pid)}
                  >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: rf(2), color: 'white' }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
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
              <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: item.avg || 5 }, (_, index) => (
                  <MaterialIcons key={index} name="star-rate" size={rf(2)} style={styles.starIcon} />
                ))}
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
              <View style={{paddingHorizontal:rw(2)}}>
              <TouchableOpacity style={{borderWidth:1, paddingVertical:rh(0.5), marginBottom:rh(1), borderColor:"#FF3131", borderRadius:5}}>
                 <Text style={{textAlign:"center", fontWeight:"400", color:"#FF3131"}}>Move to Cart</Text>
              </TouchableOpacity>
              </View>
            )}

        


          </View>
        </TouchableOpacity>
      )}
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
    borderWidth:2,
    borderColor:"white",
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
    zIndex:100,
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
    width: rw(25),
    height: rh(3.5),
    right: rw(1),
    bottom: rh(0.5),
    borderWidth: 2,
    borderColor: "#FF3131",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor:"#FF3131",
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
    marginTop:rh(0.5)
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
    fontWeight:"normal"
  },
  mprPrice: {
    fontSize: rf(1.5),
    color: 'grey',
    textDecorationLine: 'line-through',
  },
});


