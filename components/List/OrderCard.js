import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient button
import { rw, rh, rf } from '../../Service/responsive'; // Responsive helpers

const OrderCard = ({ status, dateTime, totalAmount, products, ctaText, onCTAClick }) => {
  // Dynamic status styling based on the order status
  const getStatusStyle = () => {
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

  const statusStyle = getStatusStyle();

  return (
    <View style={styles.card}>
      {/* Status Section */}
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <View style={[styles.statusIconBackground, { backgroundColor: statusStyle.color + '20' }]}>
            <MaterialIcons name={statusStyle.icon} size={rw(5)} color={statusStyle.color} />
          </View>
          <View style={styles.statusDetails}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{status}</Text>
            <Text style={styles.dateTime} numberOfLines={1} ellipsizeMode="tail">
              {dateTime}
            </Text>
          </View>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={rw(4)} style={{ alignSelf: 'center' }} />
      </View>

      {/* Product Images Section */}
      <View style={styles.productsContainer}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Image key={index} source={{ uri: product }} style={styles.productImage} />
          ))
        ) : (
          <Text style={styles.noProductsText}>No Products Available</Text>
        )}
      </View>

      {/* Total Amount and CTA Section */}
      <View style={styles.amountContainer}>
        <Text style={styles.totalAmount}>
          Total Amount: <Text style={styles.amountHighlight}>₹{totalAmount}</Text>
        </Text>
        <TouchableOpacity onPress={onCTAClick} accessible accessibilityLabel={ctaText}>
          <Text style={styles.getItAgainButton}>{ctaText}</Text>
        </TouchableOpacity>
      </View>

      {/* CTA Button */}
      {/* <TouchableOpacity onPress={onCTAClick} style={styles.ctaButton}>
        <LinearGradient colors={['#f04e23', '#ff6f00']} style={styles.gradientBackground}>
          <Text style={styles.ctaText}>{ctaText}</Text>
          <MaterialIcons name="arrow-forward" size={rw(4)} color="#fff" />
        </LinearGradient>
      </TouchableOpacity> */}
    </View>
  );
};

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

export default OrderCard;
