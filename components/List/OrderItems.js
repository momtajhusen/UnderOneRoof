import React,{useContext} from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { AppContext } from '../../context/AppContext';

// Sample Data (you should pass this data from the parent component)
const cartProduct = [
  {
    "id": 63,
    "pid": 124,
    "uid": 402,
    "qty": 9,
    "var_id": 434,
    "created_at": "2024-01-14T14:19:49.000000Z",
    "updated_at": "2024-10-15T09:42:50.000000Z",
    "name": "देशी कपूर सरस्वती - Desi camphor",
    "slug": "thasha-kapara-sarasavata-desi-camphor",
    "product_code": "105",
    "hsn": null,
    "measurement": "50",
    "unit": "1",
    "pstock": 1,
    "pstatus": 1,
    "mrp_price": 140,
    "selling_price": 80,
    "discount": 43,
    "category": "8,17,18,20,22,24",
    "cname": null,
    "sub_category": null,
    "scname": null,
    "manufacturer": null,
    "made_in": "india",
    "shipping_type": "Local Shipping",
    "delivery_places": "3",
    "pincode": "",
    "returnable": "0",
    "cancelable": "1",
    "cod_allowed": "1",
    "itemimage": "https://u1rfoods.com/productImage/14-01-2024-19-49-491705261789.jpg",
    "multi_image": null,
    "bookpdf": null,
    "position": 111,
    "short_desc": null,
    "full_desc": null,
    "return_condition": null,
    "shipping": null,
    "avg": null,
    "total_stock": 1000
  }
];

const OrderItems = () => {

   const { state } = useContext(AppContext);
    

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.itemimage }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name} <Text style={styles.itemMeasurement}>({item.measurement}g)</Text></Text>
        <Text style={styles.itemPrice}>₹{item.selling_price} | Qty: {item.qty}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Items({cartProduct.length})</Text>
      <FlatList
        data={state.viewCartData.cartProduct}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: rw(2),
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: rh(1),
  },
  itemContainer: {
    backgroundColor: '#F3F3F3',
    padding: rw(1.5),
    borderRadius: rw(2),
    flexDirection: 'row',
    marginBottom: rh(1),
  },
  itemImage: {
    width: rw(18),
    height: rh(8),
    borderRadius: rw(2),
  },
  itemInfo: {
    paddingLeft: rw(2),
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: '400',
  },
  itemMeasurement: {
    color: '#717171',
  },
  itemPrice: {
    marginVertical: rh(0.5),
    color: '#717171',
  },
});

export default OrderItems;
