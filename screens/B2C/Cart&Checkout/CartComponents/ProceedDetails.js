import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../../context/AppContext';

const ProceedDetails = ({ data, loading, btnText, onPress }) => {
  const { grand_total, total } = data;
  const navigation = useNavigation();
  const { state } = useContext(AppContext);

  // Agar state.selectAddressData ek direct object hai, to aid property check karen.
  const isAddressSelected = !!(state?.selectAddressData && state.selectAddressData.aid);

  console.log("isAddressSelected:", isAddressSelected);

  return (
    <View style={styles.container}>
      {isAddressSelected ? (
        <>
          {/* Price Details */}
          <View style={styles.priceDetails}>
            <Text style={styles.weightText}></Text>
            <Text style={styles.priceText}>
              ₹{grand_total - state.couponData.discountAmount}{' '}
              <Text style={styles.mrpText}> MRP </Text>
              <Text style={styles.mrpPrice}> ₹ {total}</Text>
            </Text>
          </View>
          {/* Proceed Button */}
          <TouchableOpacity
            onPress={loading ? null : onPress}
            style={[styles.btn, loading && styles.disabledBtn]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>{btnText}</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View>
          {/* Select Address Button */}
          <TouchableOpacity
            onPress={loading ? null : () => navigation.navigate('AddressBook')}
            style={[styles.btn, { width: rw(90), paddingVertical: rh(1.5) }, loading && styles.disabledBtn]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Select Address</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProceedDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rh(10),
    paddingHorizontal: rw(4),
  },
  priceDetails: {
    justifyContent: 'center',
  },
  weightText: {
    color: '#717171',
    fontSize: rf(1.5),
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: rf(2),
    color: '#000',
  },
  mrpText: {
    fontWeight: 'normal',
    fontSize: rf(1.5),
    color: '#717171',
  },
  mrpPrice: {
    fontWeight: 'normal',
    fontSize: rf(1.5),
    color: '#717171',
    textDecorationLine: 'line-through',
  },
  btn: {
    backgroundColor: '#FF3131',
    borderRadius: 10,
    paddingVertical: rh(1),
    paddingHorizontal: rw(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: rf(2),
    fontWeight: 'bold',
  },
  disabledBtn: {
    opacity: 0.7,
  },
});
