import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import UserDetails from '../B2C/Cart&Checkout/CartComponents/userDetails';
import CartItemsList from '../../components/List/CartItemsList';
import PriceDetails from '../B2C/Cart&Checkout/CartComponents/PriceDetails';
import SimilarProducts from '../B2C/Cart&Checkout/CartComponents/SimilarProducts';
import Header from '../../components/header';
import ProceedDetails from '../B2C/Cart&Checkout/CartComponents/ProceedDetails';
import { AppContext } from '../../context/AppContext';
import { useViewCartData } from '../../utility/viewCardDataUtils';
import { rw, rh } from '../../Service/responsive';

const CartScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { viewCartData } = useViewCartData();
  const [isScreenLoaded, setIsScreenLoaded] = useState(false);  

  // API call function
  const fetchCartData = async () => {
    try {
      await viewCartData();
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Trigger API call only after screen is fully loaded
  useEffect(() => {
    if (isScreenLoaded) {
      fetchCartData();
    }
  }, [isScreenLoaded]);

  // Set `isScreenLoaded` to true after screen rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenLoaded(true);
    }, 0); // Slight delay to ensure layout rendering
    return () => clearTimeout(timer);
  }, []);

  // onRefresh function for pull-to-refresh
  const onRefresh = async () => {
    dispatch({
      type: 'GLOBAL_REFRESH',
      payload: {
        reFresh: Math.ceil(Math.random() * 100),
      },
    });
  };

  const cartProducts = state?.viewCartData?.cartProduct || [];

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <Header
        title="Your Cart"
        rightContent={
          <View style={{ flexDirection: 'row', gap: rw(4) }}>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
              <Image source={require('../../assets/Search.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Cart Data */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: rh(10), marginTop: rh(1.5) }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      >
        {/* User Details */}
        <View style={styles.container}>
          <UserDetails userData={state.selectAddressData} type="selected_change" />
        </View>

        {/* Cart Items or Empty Message */}
        {cartProducts.length > 0 ? (
          <View style={{ marginHorizontal: rw(3.5), backgroundColor: 'white', borderRadius: rw(5) }}>
            <FlatList
              data={cartProducts}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={({ item, index }) => (
                <Animatable.View
                  key={item.id || Math.random().toString()}
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
            <Text style={styles.emptyCartText}>Your cart is currently empty. Add some items to proceed.</Text>
          </View>
        )}

        {/* Price Details */}
        {cartProducts.length > 0 && (
          <View style={[styles.container, { marginBottom: rh(6) }]}>
            <PriceDetails data={state.viewCartData} saveMessage={false} />
          </View>
        )}

        {/* Similar Products */}
        <View style={[styles.similarProducts, { marginBottom: rh(6) }]}>
          <SimilarProducts />
        </View>
      </ScrollView>

      {/* Fixed Proceed Details at the bottom */}
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
