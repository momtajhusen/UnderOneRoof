import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import UserDetails from './userDetails';
import Header from '../../../../components/header';
import { useViewAddressData } from '../../../../utility/viewaddressUtils';

const AddressBook = ({ navigation }) => {
  const { isViewAddressLoading, viewAddressData } = useViewAddressData();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const result = await viewAddressData();
        if (result.success) {
          setAddresses(result.addressData);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Header title="Address Book" />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditAddress')}
          style={styles.addAddressBtn}
        >
          <MaterialIcons name="add" size={rf(4)} style={styles.addIcon} />
          <Text style={styles.addAddressText}>Add Address</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#FF3131" style={styles.loader} />
        ) : addresses && addresses.length > 0 ? (
 
            <UserDetails userData={addresses} style={{marginBottom:rh(0.5)}} type="view_all" />
     
        ) : (
          <View style={styles.noAddressContainer}>
            <Text style={styles.noAddressText}>No addresses found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
    flex: 1,
  },
  addAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3131',
    backgroundColor: '#FFEAEA',
    padding: rw(2),
    borderRadius: 10,
    marginBottom: rh(1),
  },
  addIcon: {
    fontSize: rf(3),
    color: '#FF3131',
  },
  addAddressText: {
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: rw(1),
  },
  loader: {
    marginTop: rh(10),
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressText: {
    textAlign: 'center',
    fontSize: rf(2),
    color: '#717171',
  },
});

export default AddressBook;
