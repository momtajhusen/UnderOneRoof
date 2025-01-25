import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { rw, rh } from '../../Service/responsive';

const OrderItemsDetails = ({ OrderData }) => {
  console.log("OrderData:", OrderData);

  if (!Array.isArray(OrderData)) {
    console.error("OrderData is not an array:", OrderData);
    return null;
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.itemimage }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>
          {item.name} <Text style={styles.itemMeasurement}>({item.measurement}g)</Text>
        </Text>
        <Text style={styles.itemPrice}>₹{item.selling_price} | Qty: {item.qty}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Items ({OrderData.length})</Text>
      <FlatList
        data={OrderData}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
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

export default OrderItemsDetails;
