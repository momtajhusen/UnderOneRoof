//import libraries
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';

// Create a component
const PriceDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.promoCodeContainer}>
                <TextInput 
                   placeholder="Enter Coupan code"
                   style={{paddingHorizontal:rw(2.5), width:rw(54)}}
                />
                <TouchableOpacity style={{backgroundColor:"#FF3131", borderRadius:10, width:rw(30), justifyContent:"center"}}>
                    <Text style={{textAlign:"center", color:"white"}}>Apply Code</Text>
                </TouchableOpacity>
            </View>
            {/* Header */}
            <Text style={styles.header}>Price Details</Text>

            {/* Price Breakdown */}
            <View style={styles.textListSection}>
                <Text style={styles.label}>Price (3 items)</Text>
                <Text style={styles.value}>₹1050</Text>
            </View>
            <View style={styles.textListSection}>
                <Text style={styles.label}>Discount</Text>
                <Text style={[styles.value, styles.discount]}>-₹300</Text>
            </View>
            <View style={styles.textListSection}>
                <Text style={styles.label}>Shipping Fee</Text>
                <Text style={[styles.value, styles.value]}>₹50</Text>
            </View>
            <View style={styles.textListSection}>
                <Text style={styles.label}>Delivery Fee</Text>
                <Text style={[styles.value, styles.value]}>₹60</Text>
            </View>

            {/* Total Payment */}
            <View style={[styles.textListSection, styles.totalSection]}>
                <Text style={styles.totalLabel}>Total Payment</Text>
                <Text style={styles.totalValue}>₹820</Text>
            </View>

            <View style={styles.savedMessageContainer}>
                <Text style={styles.savedMessageText}>You Saved <Text style={{fontWeight:"bold"}}>₹350</Text> in this order</Text>
            </View>

        </View>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: rw(5),
        borderRadius: rw(3),
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
        fontSize: rf(2.3),
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
        fontSize: rf(2.5),
        fontWeight: '700',
    },
    savedMessageContainer:{
        backgroundColor:"#FFD4D4",
        position:"absolute",
        zIndex:-1,
        bottom:rh(-4),
        width:rw(94),
        height:rh(30),
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
