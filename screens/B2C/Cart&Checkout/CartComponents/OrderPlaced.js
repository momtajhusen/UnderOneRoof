//import liraries
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import UserDetails from './userDetails';
import PriceDetails from './PriceDetails';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import OrderItems from '../../../../components/List/OrderItems';
import { AppContext } from '../../../../context/AppContext';

const OrderPlaced = ({ route }) => {
  const { data } = route.params;
  const { state } = useContext(AppContext);
  const navigation = useNavigation();

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('green');
  });

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="green" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.successContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: rw(4) }}
          >
            <MaterialIcons name="arrow-back" size={rf(3)} color="white" />
          </TouchableOpacity>
          <View style={styles.successContent}>
            <View style={{ flexDirection: 'row', gap: rw(2), alignItems: 'center' }}>
              <MaterialIcons name="check-circle" size={35} color="white" />
              <Text style={{ fontSize: rf(4), fontWeight: 'bold', color: '#FFFFFF' }}>
                Order Confirmed !
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#FEFEFE33',
                marginVertical: rh(1),
                padding: rw(3),
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: rf(2), color: '#FFFFFF' }}>
                Your order has been successfully placed
              </Text>
            </View>
          </View>
        </View>
        {/* Additional scrollable content can be added here if needed */}
      </ScrollView>

      {/* Fixed Details Container */}
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: 'row', marginLeft: rw(2.5) }}>
          <Text style={{ fontWeight: 'bold', fontSize: rf(2) }}>Order ID : </Text>
          <Text style={{ fontWeight: 'normal' }}>#8912937981230</Text>
        </View>

        <View style={{ marginVertical: rh(1) }}>
          <UserDetails userData={state.selectAddressData} />
        </View>

        <View>
          <OrderItems data={data} />
        </View>

        <View style={{ marginVertical: rh(1) }}>
          <PriceDetails data={state.viewCartData} promoCode={false} couponCancle={false} />
        </View>

        <View style={{ marginBottom: rh(1), padding: rw(3), backgroundColor: 'white', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <MaterialIcons name="credit-card" size={rf(3)} color="#9D9D9D" />
            <Text style={{ color: '#9D9D9D', fontSize: rf(2) }}>Payment Mode</Text>
          </View>

          <View
            style={{
              padding: rw(2),
              backgroundColor: data.title === 'Online Payment' ? '#E8FFE8' : '#FFEAEA',
              borderRadius: 10,
              marginTop: rh(1),
            }}
          >
            <View style={{ flexDirection: 'row', gap: rw(2) }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {data.title === 'Online Payment' ? 'Payment Completed' : 'Payment Pending'}
              </Text>
              <MaterialIcons
                name="check-circle"
                size={rf(3)}
                color={data.title === 'Online Payment' ? '#44B200' : '#B20000'}
              />
            </View>
            <Text style={{ color: '#868686' }}>
              {data.title === 'Online Payment' ? 'Pre-Paid Order' : 'Cash on Delivery'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  scrollContent: {
    paddingBottom: rh(30), // Ensure scroll content is not hidden behind the fixed footer
  },
  successContainer: {
    height: rh(25),
    backgroundColor: 'green',
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: rw(3),
    paddingVertical: rh(2),
    paddingBottom: rh(1),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default OrderPlaced;
