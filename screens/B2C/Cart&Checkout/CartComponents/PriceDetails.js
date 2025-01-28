import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';

const PriceDetails = ({
  style,
  data,
  promoCode = true,
  saveMessage = false,
  couponCancle = true,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const [couponCode, setCouponCode] = useState(state.couponData.couponCode);
  const [grandTotal, setGrandTotal] = useState(data.grand_total);
  const [saving, setSaving] = useState(data.saving || 0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [message, setMessage] = useState(''); // New state for the message

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setMessage('Please enter a valid coupon code.'); // Show error message below input
      // Remove message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await apiClient.get(
        `/applyCoupon?coupon_code=${couponCode}&amount=${data.grand_total}`
      );

      if (response.data.status === 1) {
        const discountAmount = (data.grand_total * 30) / 100;
        setCouponDiscount(discountAmount);

        // Update context with applied coupon data
        dispatch({
          type: 'SET_COUPON',
          payload: {
            couponCode,
            discountAmount,
            isCouponApplied: true,
          },
        });
        // Remove message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(response.data.title || 'Try another code.'); // Invalid coupon message
        setGrandTotal(data.grand_total);
        // Remove message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Coupon Application Error:', error);
      setMessage('Failed to apply coupon. Please try again later.');  
      // Remove message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setCouponCode('');

    // Clear coupon data in context
    dispatch({
      type: 'CLEAR_COUPON',
    });
    // Remove message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

    useEffect(() => {
      setGrandTotal(state.viewCartData.grand_total);
      if(state.couponData.isCouponApplied){
        if (couponCode) {
          applyCoupon();
        }
      }
    }, [state.viewCartData]);

  return (
    <View style={[styles.container, style]}>
      {promoCode && (
        <View style={styles.promoCodeContainer}>
          <TextInput
            placeholder="Enter Coupon Code"
            style={styles.textInput}
            value={couponCode}
            onChangeText={setCouponCode}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyCoupon}>
            <Text style={styles.applyButtonText}>Apply Code</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show message below input */}
      {message ? (
        <Text style={styles.messageText}>{message}</Text>
      ) : null}

      {state.couponData.isCouponApplied > 0 && (
        <View style={styles.couponContainer}>
          <Text style={styles.couponText}>
            Coupon Applied! You saved ₹{state.couponData.discountAmount}.
          </Text>
          {couponCancle && (
            <TouchableOpacity onPress={removeCoupon}>
              <MaterialIcons name="cancel" size={20} color="#FF3131" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Header */}
      <Text style={styles.header}>Price Details</Text>

      {/* Price Breakdown */}
      {renderPriceDetails(data, grandTotal, couponDiscount, state.couponData.isCouponApplied, state.couponData.discountAmount)}

      {/* Save Message */}
      {saveMessage && saving > 0 && (
        <View style={styles.savedMessageContainer}>
          <Text style={styles.savedMessageText}>
            You Saved <Text style={styles.boldText}>₹{saving}</Text> in this
            order
          </Text>
        </View>
      )}
    </View>
  );
};

// Helper to Render Price Details
const renderPriceDetails = (data, grandTotal, couponDiscount = 0, isCouponApplied, discountAmount) => (
  <>
    <View style={styles.textListSection}>
      <Text style={styles.label}>Price ({data.totalitems} items)</Text>
      <Text style={styles.value}>₹{data.total}</Text>
    </View>
    <View style={styles.textListSection}>
      <Text style={styles.label}>Discount</Text>
      <Text style={[styles.value, styles.discount]}>-₹{data.saving}</Text>
    </View>
    
    {/* Conditionally render Coupon Discount */}
    {isCouponApplied && (
      <View style={styles.textListSection}>
        <Text style={styles.label}>Coupon Discount</Text>
        <Text style={[styles.value, styles.discount]}>-₹{discountAmount}</Text>
      </View>
    )}

    <View style={styles.textListSection}>
      <Text style={styles.label}>Shipping Fee</Text>
      <Text style={styles.value}>₹{data.shipping_charges}</Text>
    </View>
    <View style={styles.textListSection}>
      <Text style={styles.label}>Delivery Fee</Text>
      <Text style={styles.value}>₹0</Text>
    </View>
    <View style={[styles.textListSection, styles.totalSection]}>
      <Text style={styles.totalLabel}>Total Payment</Text>
      <Text style={styles.totalValue}>₹{grandTotal - discountAmount}</Text>
      {/* <Text style={styles.totalValue}>₹{state.viewCartData.grand_total - discountAmount}</Text> */}

    </View>
  </>
);

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: rw(5),
    borderRadius: rw(3),
    width: '100%',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    marginBottom: rh(1),
    paddingHorizontal: rw(2),
    height: rh(5),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: rw(2.5),
    fontSize: rf(2),
  },
  applyButton: {
    backgroundColor: '#FF3131',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh(1),
    paddingHorizontal: rw(3),
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2E7D32', // Dark green border
    borderRadius: 10,
    padding: rw(3),
    marginBottom: rh(2),
    backgroundColor: '#E8F5E9', // Light green background
  },
  couponText: {
    color: '#2E7D32', // Dark green text
    fontSize: rf(2),
    fontWeight: '500',
  },
  header: {
    fontSize: rf(2.5),
    fontWeight: '700',
    marginBottom: rh(1),
    color: '#333',
  },
  textListSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: rh(0.5),
  },
  label: {
    fontSize: rf(2),
    color: '#666',
  },
  value: {
    fontSize: rf(2),
    fontWeight: '500',
    color: '#333',
  },
  discount: {
    color: 'green',
  },
  totalSection: {
    marginTop: rh(2),
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: rh(1.5),
  },
  totalLabel: {
    fontSize: rf(2),
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: rf(2),
    fontWeight: '700',
  },
  savedMessageContainer: {
    backgroundColor: '#FFD4D4',
    borderRadius: 10,
    marginTop: rh(2),
    padding: rw(3),
  },
  savedMessageText: {
    color: '#FF3131',
    fontSize: rf(2),
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  messageText: {
    color: '#FF3131', // Red color for message
    fontSize: rf(2),
    marginVertical: rh(0.5),
  },
});

export default PriceDetails;
