import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';

import { AppContext } from '../../context/AppContext';
import { useViewCartData } from '../../utility/viewCardDataUtils';
import { rw, rh, rf } from '../../Service/responsive';

// Your local components
import Header from '../../components/header';
import UserDetails from '../B2C/Cart&Checkout/CartComponents/userDetails';
import CartItemsList from '../../components/List/CartItemsList';
import PriceDetails from '../B2C/Cart&Checkout/CartComponents/PriceDetails';
import SimilarProducts from '../B2C/Cart&Checkout/CartComponents/SimilarProducts';
import ProceedDetails from '../B2C/Cart&Checkout/CartComponents/ProceedDetails';

const CartScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { viewCartData } = useViewCartData();

  // 1) Wrap the fetch call in a useCallback to keep it stable,
  //    referencing only `viewCartData` (and NOTHING else).
  const fetchCartData = useCallback(async () => {
    try {
      console.log('fetchCartData called');
      await viewCartData();
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }, [viewCartData]);

  // 2) useFocusEffect: calls `fetchCartData` each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      console.log('CartScreen is focused, fetching cart data...');
      fetchCartData();

      // Optional cleanup if needed:
      return () => {
        console.log('CartScreen unfocused');
      };
    }, [state.reFresh])
  );

  // 3) If you want to refresh on pull-to-refresh:
  const onRefresh = () => {
    console.log('onRefresh triggered...');
    // Optionally dispatch a "GLOBAL_REFRESH" or you could just call fetchCartData directly.
    dispatch({
      type: 'GLOBAL_REFRESH',
      payload: { reFresh: Math.ceil(Math.random() * 100) },
    });
  };

  // 4) Access cart data from global state
  const cartProducts = state?.viewCartData?.cartProduct || [];

  // 5) Render your UI
  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <Header
        title="Your Cart"
        rightContent={
          <View style={{ flexDirection: 'row', gap: rw(4) }}>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
              <Image
                source={require('../../assets/Search.png')}
                style={{ width: rw(5.5), height: rw(5.5) }}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: rh(10), marginTop: rh(1.5) }}
        refreshControl={
          // Pull to Refresh calls onRefresh
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        {/* Address / User Details */}
        <View style={styles.container}>
          {state.selectAddressData && (
            <UserDetails userData={[state.selectAddressData]} type="selected_change" />
          )}   
        </View>

        {/* Cart Items */}
        {cartProducts.length > 0 ? (
          <View style={styles.cartContainer}>
            <FlatList
              data={cartProducts}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={({ item, index }) => (
                <Animatable.View
                  key={item.id || index}
                  animation="fadeInUp"
                  duration={800}
                  delay={index * 20}
                >
                  <CartItemsList item={item} />
                </Animatable.View>
              )}
            />
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              Your cart is currently empty. Add some items to proceed.
            </Text>
          </View>
        )}

        {/* Price Details */}
        {cartProducts.length > 0 && (
          <View style={[styles.container, { marginBottom: rh(6) }]}>
            <PriceDetails data={state.viewCartData} saveMessage={false} />
          </View>
        )}

        {/* Similar Products (Optional) */}
        <View style={[styles.similarProducts, { marginBottom: rh(6) }]}>
          <SimilarProducts />
        </View>
      </ScrollView>

      {/* Footer / Proceed Button */}
      {cartProducts.length > 0 && (
        <View style={styles.proceedDetails}>
          <ProceedDetails
            onPress={() => navigation.navigate('Checkout')}
            loading={state.isLoader}
            data={state.viewCartData}
            btnText="Proceed"
          />
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    marginHorizontal: rw(3.5),
  },
  cartContainer: {
    marginHorizontal: rw(3.5),
    backgroundColor: 'white',
    borderRadius: rw(5),
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(20),
  },
  emptyCartText: {
    fontSize: rw(4.5),
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: rw(5),
  },
  similarProducts: {
    marginHorizontal: rw(3.5),
  },
  proceedDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
});
