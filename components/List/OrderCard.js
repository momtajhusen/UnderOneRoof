import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ orders }) => {
  const navigation = useNavigation();

  const getStatusStyle = (status) => {
      switch (status) {
          case 'Delivered':
              return { color: '#4CAF50', icon: 'check-circle' };
          case 'Canceled':
              return { color: '#F44336', icon: 'cancel' };
          case 'On The Way':
              return { color: '#FF9800', icon: 'local-shipping' };
          default:
              return { color: '#888', icon: 'info' };
      }
  };

  const renderOrder = ({ item }) => {
      console.log('Order Item:', item);

      const statusStyle = getStatusStyle(item.order_status);

      return (
          <TouchableOpacity
              onPress={() => navigation.navigate('OrderDetails', { order_id: item.order_id })}
              style={styles.card}
          >
              {/* Status Section */}
              <View style={styles.statusContainer}>
                  <View style={styles.statusRow}>
                      <View style={[styles.statusIconBackground, { backgroundColor: statusStyle.color + '20' }]}>
                          <MaterialIcons name={statusStyle.icon} size={rw(5)} color={statusStyle.color} />
                      </View>
                      <View style={styles.statusDetails}>
                          <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.order_status}</Text>
                          <Text style={styles.dateTime} numberOfLines={1} ellipsizeMode="tail">
                              {item.order_date} {item.order_time}
                          </Text>
                      </View>
                  </View>
                  <MaterialIcons name="arrow-forward-ios" size={rw(4)} style={{ alignSelf: 'center' }} />
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
                  <TouchableOpacity onPress={item.onCTAClick} accessible accessibilityLabel={item.ctaText}>
                      <Text style={styles.getItAgainButton}>{item.ctaText}</Text>
                  </TouchableOpacity>
              </View>
          </TouchableOpacity>
      );
  };

  return (
    <ScrollView style={{ flex: 1}}>
      <FlatList
        data={orders}
        contentContainerStyle={{ paddingBottom:rh(10) }}
        renderItem={renderOrder}
        keyExtractor={(item) => item.order_id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
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
  },
  statusDetails: {
    marginLeft: rw(4),
  },
  statusText: {
    fontSize: rf(2),
    fontWeight: '600',
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
  ctaButton: {
    marginTop: rh(2),
    borderRadius: rw(4),
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rh(1.5),
  },
  ctaText: {
    color: '#fff',
    fontSize: rf(2),
    fontWeight: '600',
    marginRight: rw(2),
  },
});

