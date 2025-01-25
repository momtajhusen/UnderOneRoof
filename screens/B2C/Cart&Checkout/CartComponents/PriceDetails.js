//import libraries
import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../../Service/apiClient';


// Create a component
const PriceDetails = ({style, data, promoCode="true", saveMessage="false"}) => {

  const navigation = useNavigation();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(data.grand_total);
  const [saving, setSaving] = useState( null);

  const applyCoupon = async () => {
    try {
      const response = await apiClient.get(`/applyCoupon?coupon_code=${couponCode}&amount=${data.grand_total}`);
 
         console.log(response.data.status);
      if (response.data.status === 1) {
        const discountAmount =  response.data.data.discount;
        const newSaving = saving + discountAmount;
        const newGrandTotal = grandTotal - discountAmount;
 
        setSaving(newSaving);
        setGrandTotal(newGrandTotal);

        Alert.alert('Success', response.data.data.discount+"% Discount" );
      } else {
        Alert.alert('Wrong Coupon Code', response.title);
        setGrandTotal(data.grand_total);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to apply coupon. Please try again.');
      console.error(error);
    }
  };

    return (
    <View style={[styles.container, {style}]}>
    {promoCode && (
        <View style={styles.promoCodeContainer}>
            <TextInput 
                placeholder="Enter Coupon code"
                style={{ paddingHorizontal: rw(2.5), width: rw(54) }}
                value={couponCode}
                onChangeText={setCouponCode}
            />

            <TouchableOpacity 
                style={{
                    backgroundColor: "#FF3131", 
                    borderRadius: 10, 
                    width: rw(30), 
                    justifyContent: "center"
                }}
                onPress={applyCoupon}
            >
                <Text style={{ textAlign: "center", color: "white" }}>Apply Code</Text>
            </TouchableOpacity>
        </View>
    )}
    {/* Header */}
    <Text style={styles.header}>Price Details</Text>

    {/* Price Breakdown */}
    <View style={styles.textListSection}>
        <Text style={styles.label}>Price ({data.totalitems} items)</Text>
        <Text style={styles.value}>₹{data.total} </Text>
    </View>
    <View style={styles.textListSection}>
        <Text style={styles.label}>Discount</Text>
        <Text style={[styles.value, styles.discount]}>-₹{data.saving}</Text>
    </View>
    <View style={styles.textListSection}>
        <Text style={styles.label}>Shipping Fee</Text>
        <Text style={[styles.value, styles.value]}>₹{data.shipping_charges}</Text>
    </View>
    <View style={styles.textListSection}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={[styles.value, styles.value]}>₹ 0</Text>
    </View>

    {/* Total Payment */}
    <View style={[styles.textListSection, styles.totalSection]}>
        <Text style={styles.totalLabel}>Total Payment</Text>
        <Text style={styles.totalValue}>₹{data.grand_total}</Text>
    </View>
    

    {saveMessage && (
        <View style={styles.savedMessageContainer}>
            <Text style={styles.savedMessageText}>You Saved <Text style={{fontWeight:"bold"}}>₹{data.saving}</Text> in this order</Text>
        </View>
    )}
    </View>
    );
};


// Define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: rw(5),
        borderRadius: rw(3),
        width:"100%",
    },
    promoCodeContainer:{
     height:rh(5),
     borderRadius:10,
     marginBottom:rh(1),
     backgroundColor:"#F3F3F3",
     flexDirection:"row",
     justifyContent:"space-between"
    },
    header: {
        fontSize: rf(2),
        fontWeight: '700',
        marginBottom: rh(0.5),
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
        color: 'green', // Red for discounts
    },
    fee: {
        color: '#888', // Subtle gray for fees
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
    savedMessageContainer:{
        backgroundColor:"#FFD4D4",
        position:"absolute",
        zIndex:-1,
        bottom:rh(-4),
        width:rw(92),
        height:rh(35),
        borderRadius:10,
    },
    savedMessageText:{
        color:"#FF3131",
        position:"absolute",
        bottom:rh(1), 
        left:rw(25),
        textAlign:"center",
    }
});

export default PriceDetails;