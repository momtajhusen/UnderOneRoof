import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ orders }) => {
  const navigation = useNavigation();

  // Map status_order to style and text
  const getStatusStyle = (statusOrder) => {
    const statusMap = {
      0: { text: 'Pending', color: '#FF7900', icon: 'hourglass-empty' },
      1: { text: 'Processing', color: '#FF9800', icon: 'autorenew' },
      2: { text: 'Packed', color: '#FF5722', icon: 'local-mall' },
      3: { text: 'Shipment', color: '#FFC107', icon: 'local-shipping' },
      4: { text: 'Delivered', color: '#4CAF50', icon: 'check-circle' },
      5: { text: 'Cancel Request Accept', color: '#E91E63', icon: 'close' },
      55: { text: 'Cancel Request', color: '#FF5722', icon: 'cancel' },
      555: { text: 'Cancel Request Reject', color: '#795548', icon: 'close' },
      6: { text: 'Return Request Accept', color: '#3F51B5', icon: 'reply' },
      66: { text: 'Return Request', color: '#2196F3', icon: 'undo' },
      666: { text: 'Return Request Reject', color: '#F44336', icon: 'cancel' },
      6666: { text: 'Return Completed', color: '#8BC34A', icon: 'check-circle' },
      7: { text: 'Exchange Request Accept', color: '#673AB7', icon: 'swap-horiz' },
      77: { text: 'Exchange Request', color: '#9C27B0', icon: 'swap-horizontal-circle' },
      777: { text: 'Exchange Request Reject', color: '#F44336', icon: 'cancel' },
      7777: { text: 'Exchanged', color: '#4CAF50', icon: 'check-circle' },
      8: { text: 'Confirm', color: '#4CAF50', icon: 'check-circle' },
      9: { text: 'Order Reject', color: '#F44336', icon: 'close' },
    };

    return statusMap[statusOrder] || { text: 'Unknown', color: '#607D8B', icon: 'help-outline', bgColor: '#ECEFF1' };
  };

  const renderOrder = ({ item }) => {
    const statusStyle = getStatusStyle(item.status_order);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', { order_id: item.order_id })}
        style={styles.card}
      >
        {/* Status Section */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <View style={[styles.statusIconBackground]}>
              <MaterialIcons name={statusStyle.icon} size={rw(6)} color={statusStyle.color} />
            </View>
            <View style={styles.statusDetails}>
              <Text style={[styles.statusText, { color: statusStyle.color }]}>{statusStyle.text}</Text>
              <Text style={styles.dateTime} numberOfLines={1} ellipsizeMode="tail">
                {item.order_date} {item.order_time}
              </Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={rw(4)} style={{position:"absolute", top:0, right:0}} />
        </View>

        {/* Product Images Section */}
        <View style={styles.productsContainer}>
          {item.image.length > 0 ? (
            <ScrollView horizontal contentContainerStyle={styles.imageScrollContainer}>
              {item.image.map((product, index) => (
                <Image key={index} source={{ uri: product }} style={styles.productImage} />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noProductsText}>No Products Available</Text>
          )}
        </View>

        {/* Total Amount and CTA Section */}
        <View style={styles.amountContainer}>
          <Text style={styles.totalAmount}>
            Total Amount: <Text style={styles.amountHighlight}>₹{item.grand_total}</Text>
          </Text>
          {statusStyle.text === 'Delivered' ? (
            <TouchableOpacity>
              <Text style={styles.getItAgainButton}>Get It Again</Text>
            </TouchableOpacity>
          ) : statusStyle.text === 'Pending' || statusStyle.text === 'On The Way' ? (
            <TouchableOpacity>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ paddingBottom: rh(10) }}
      renderItem={renderOrder}
      keyExtractor={(item) => item.order_id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: rw(4),
    padding: rw(4),
    marginVertical: rh(0.5),
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconBackground: {
    width: rw(10),
    height: rw(10),
    borderRadius: rw(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rw(3),
    backgroundColor: '#F3F3F3',

  },
  statusDetails: {
    flex: 1,
  },
  statusText: {
    fontSize: rf(2),
    fontWeight: '700',
  },
  dateTime: {
    fontSize: rf(1.6),
    color: '#9D9D9D',
  },
  productsContainer: {
    flexDirection: 'row',
    marginVertical: rh(2),
  },
  productImage: {
    width: rw(15),
    height: rw(15),
    borderRadius: rw(4),
    marginRight: rw(2),
  },
  noProductsText: {
    fontSize: rf(1.8),
    color: '#888',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: rh(1),
  },
  totalAmount: {
    fontSize: rf(2),
    color: '#444',
  },
  amountHighlight: {
    color: '#000',
    fontWeight: '700',
  },
  getItAgainButton: {
    color: '#FF3131',
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#F44336',
    fontWeight: 'bold',
  },
});
