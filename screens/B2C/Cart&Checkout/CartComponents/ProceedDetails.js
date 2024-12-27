import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../../context/AppContext';

// create a component
const ProceedDetails = ({ data, btnText, onPress }) => {
  const { grand_total } = data;
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  const isAddressSelected = state?.selectAddressData && Object.keys(state.selectAddressData).length > 0;

  return (
    <View style={styles.container}>
      {isAddressSelected ? (
        <>
          {/* Process */}
          <View style={styles.priceDetails}>
            <Text style={styles.weightText}></Text>
            <Text style={styles.priceText}>
              ₹{grand_total} <Text style={styles.mrpText}> MRP </Text>
              <Text style={styles.mrpPrice}> ₹</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.btnText}>{btnText}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          {/* Select Address */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AddressBook')}
            style={[styles.btn, { width: rw(90), paddingVertical: rh(1.5) }]}
          >
            <Text style={styles.btnText}>Select Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

//make this component available to the app
export default ProceedDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rh(10),
    paddingHorizontal: rw(5),
    backgroundColor: '',
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
});
