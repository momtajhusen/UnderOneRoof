// Import necessary libraries
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import Stepper from '../../../../components/stepper';
import UserDetails from './userDetails';
import CartItemsList from '../../../../components/List/CartItemsList';
import PriceDetails from './PriceDetails';
import ProceedDetails from './ProceedDetails';
import PaymentMethodModal from '../../../../components/Modals/PaymentMethodModal';
import { AppContext } from '../../../../context/AppContext';
import apiClient from '../../../../Service/apiClient';
import { useViewCartData } from '../../../../utility/viewCardDataUtils';

const Checkout = ({ navigation }) => {
  const { state } = useContext(AppContext);

  // Modal visibility state
  const [isModalVisible, setModalVisible] = useState(false);

  const [issLoading, setIsLoading] = useState(true);  

  const { isViewCartLoading, viewCartData } = useViewCartData();
  

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('Modal state toggled:', !isModalVisible); 
  };

  const placeOrder = async () => {
    try {
      // Show loading indicator
      setIsLoading(true);
  
      const aid = state.selectAddressData[0].aid;
      const response = await apiClient.post('/checkout', {
        address_id: aid,
        payment_type: 'cod',
      });
  
      if (response.data.status) {
        const result = await viewCartData(); 
        navigation.navigate('B2BOrderPlaced', { data: response.data.data });
      } else {
        alert('Error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please check your connection or try again later.');
    } finally {
      // Hide loading indicator
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const result = await viewCartData();
          // Handle the result as needed
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
  
      fetchData();
  
      // Optionally return a cleanup function if needed
      return () => {
        console.log("Cleanup on focus change");
      };
    }, [state.reFresh])
  );
  
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Checkout" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: rh(15) }} keyboardShouldPersistTaps="handled">
        {/* Stepper */}
        {state.shoppingMode === "retail" && (
          <Stepper steps={['Address', 'Order Summary', 'Payment']} currentStep={1} />
        )}


        <View style={{ marginTop: rh(1) }}>
          <UserDetails userData={state.selectAddressData} />
        </View>

        {/* Cart Items */}
        <View style={{ marginHorizontal:rw(2), marginVertical:rh(1), backgroundColor: "white", borderRadius: rw(5) }}>
          <FlatList
            data={state?.viewCartData?.cartProduct || []}
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

        {/* Price Details */}
        <View style={[styles.container, { marginBottom: rh(6) }]}>
          <PriceDetails data={state.viewCartData} saveMessage={false} style={{ backgroundColor: "green" }} />
        </View>
      </ScrollView>

      {state.shoppingMode === "wholesale" && (
        <View style={[styles.proceedDetails, {backgroundColor: "white", position:"absolute", bottom:rh(0), flexDirection: "row", justifyContent: "space-between", padding: rh(2)}]}> 
              <View style={{flexDirection: "row", alignItems: "center", gap: 10, width: rw(50)}}>
                <Text style={{fontWeight: "bold", fontSize: rf(2)}}>₹ {state.viewCartData.grand_total}</Text>
                <Text style={{fontSize: rf(1.5)}}>
                  MRP <Text style={{textDecorationLine: "line-through"}}>₹ {state.viewCartData.total}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={placeOrder}
                disabled={isViewCartLoading} // Disable button if loading
                style={{
                  backgroundColor: isViewCartLoading ? "#D3D3D3" : "#FF3131", // Grey color when disabled
                  borderRadius: 10,
                  paddingHorizontal: rw(11),
                  paddingVertical: rh(1.5),
                }}
              >
                {isViewCartLoading ? (
                  <ActivityIndicator size="small" color="#FF3131" />
                ) : (
                  <Text style={{color: isViewCartLoading ? "#A9A9A9" : "white"}}>Place Order</Text>
                )}

              </TouchableOpacity>
        </View>

      )}

      {/* Fixed Proceed Details at the bottom */}
      {state.shoppingMode === "retail" && (
      <View style={styles.proceedDetails}>
        <ProceedDetails 
          loading={state.isLoader}
          data={state.viewCartData} 
          btnText="Continue"
          onPress={toggleModal} 
        />
      </View>
      )}


      {/* Payment Method Modal */}
      <PaymentMethodModal isVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
    height:rh(100),
  },
  proceedDetails: {
    position: "absolute",
    bottom: rh(6),
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});
