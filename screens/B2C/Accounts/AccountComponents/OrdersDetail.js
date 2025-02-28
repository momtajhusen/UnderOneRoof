//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../../components/header';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import OrderSummary from '../../../../components/List/OrderSummary';
import OrderItemsDetails from '../../../../components/List/OrderItemsDetails';
import PriceDetails from '../../Cart&Checkout/CartComponents/PriceDetails';
import * as Clipboard from 'expo-clipboard';
import apiClient from '../../../../Service/apiClient';

const OrderDetails = ({ navigation, route }) => {
  const { order_id } = route.params;

  const copyToClipboard = () => {
    const orderId = `#${order_id}`;
    Clipboard.setString(orderId);
    Alert.alert('Copied', `${orderId} copied to clipboard`);
  };

  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/orderDetail?order_id=${order_id}`);
      if (response.data.status === 1) {
        setOrderData(response.data.data);
      } else {
        Alert.alert(
          'Error',
          response.data.msg || 'Failed to fetch order details.'
        );
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Something went wrong while fetching orders.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF3131" />
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>No order data available.</Text>
      </View>
    );
  }

  const { order, detail, user_address } = orderData;
  // Just for safety, ensure we have something in `order[0]`
  const currentOrder = order?.[0] || {};

  // Combine the address lines safely
  const orderAddress = `${user_address.fname || ''} ${user_address.lname || ''}, ${
    user_address.state || ''
  }, ${user_address.city || ''}, ${user_address.address_line1 || ''}, ${
    user_address.country || ''
  }`.trim();

  return (
    <View style={styles.container}>
      <Header title="Orders Detail" />

      <ScrollView>
        <View style={styles.ContentContainer}>
          {/* Order Summary */}
          <View>
            <OrderSummary OrderData={orderData} />
          </View>

          {/* Order Items List */}
          <View>
            <OrderItemsDetails OrderData={detail} />
          </View>

          {/* Rate & Review */}
          <View
            style={{
              padding: rw(3),
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', gap: rw(2), alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/account/star.png')}
                style={{ width: rw(6), height: rw(6) }}
              />
              <Text style={{ fontWeight: 'bold' }}>Loved It? Let Us Know!</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('RatingAndReviews', { order_id: order_id })}
              style={{
                width: rw(25),
                paddingVertical: rh(1),
                borderRadius: 10,
                backgroundColor: '#FF3131',
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Rate Now</Text>
            </TouchableOpacity>
          </View>

          {/* 
            If you want to use PriceDetails, you can uncomment or place it here:
            <View>
              <PriceDetails promoCode={false} saveMessage={false} />
            </View>
          */}

          {/* Payment Mode - with condition similar to OrderPlaced */}
          <View style={{ padding: rw(3), backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <MaterialIcons name="credit-card" size={rf(3)} color="#9D9D9D" />
              <Text style={{ color: '#9D9D9D', fontSize: rf(2) }}>Payment Mode</Text>
            </View>

            <View
              style={{
                padding: rw(2),
                backgroundColor:
                  currentOrder.payment_mode === 'online' ? '#E8FFE8' : '#FFEAEA',
                borderRadius: 10,
                marginTop: rh(1),
              }}
            >
              <View style={{ flexDirection: 'row', gap: rw(2) }}>
                <Text style={{ fontWeight: 'bold', fontSize: rf(2.5) }}>
                  {currentOrder.payment_status === 'complete'
                    ? 'Payment Completed'
                    : 'Payment Pending'}
                </Text>
                <MaterialIcons
                  name="check-circle"
                  size={rf(3)}
                  color={currentOrder.payment_status === 'complete' ? '#44B200' : '#B20000'}
                />
              </View>
              <Text style={{ color: '#868686' }}>
                {currentOrder.payment_mode === 'online' ? 'Pre-Paid Order' : 'Cash on Delivery'}
              </Text>
            </View>
          </View>

          {/* Order Summary - Additional Info */}
          <View
            style={{
              backgroundColor: 'white',
              padding: rw(3),
              borderRadius: 10,
              marginBottom: rh(1),
            }}
          >
            <View>
              <Text style={{ fontWeight: '600', fontSize: rf(2) }}>Order Summary</Text>
            </View>

            <View style={{ gap: rh(2), marginTop: rh(1.5) }}>
              <View>
                <Text style={{ color: '#717171' }}>Order id:</Text>
                <View style={{ flexDirection: 'row', gap: rw(2), alignItems: 'center' }}>
                  <Text style={{ color: '#272727', fontWeight: '400' }}>#{order_id}</Text>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Image
                      source={require('../../../../assets/CopyIcon.png')}
                      style={{ width: rw(4), height: rw(4) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={{ color: '#717171' }}>Order Date:</Text>
                <Text style={{ color: '#272727', fontWeight: '400' }}>
                  {currentOrder.order_date || '--'}
                </Text>
              </View>

              <View>
                <Text style={{ color: '#717171' }}>Delivery To:</Text>
                <Text style={{ color: '#272727', fontWeight: '400' }}>{orderAddress}</Text>
              </View>

              <View>
                <Text style={{ color: '#717171' }}>Delivery Date:</Text>
                <Text style={{ color: '#272727', fontWeight: '400' }}>
                  {currentOrder.expected_delivery_date || '--'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* If you want a button like "Get It Again", you can place it below */}
      {/* 
      <View style={{backgroundColor:"white", paddingHorizontal:rw(5), paddingVertical:rh(1)}}>
        <TouchableOpacity
          style={{backgroundColor:"#FF3131", paddingVertical:rh(2), borderRadius:10}}
        >
          <Text style={{color:"white", fontWeight:"bold", textAlign:"center"}}>Get It Again</Text>
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContentContainer: {
    flex: 1,
    gap: rh(1),
    paddingHorizontal: rw(4),
    paddingVertical: rw(1),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default OrderDetails;
