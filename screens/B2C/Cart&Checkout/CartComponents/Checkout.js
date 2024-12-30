// Import necessary libraries
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { rw, rh } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import Stepper from '../../../../components/stepper';
import UserDetails from './userDetails';
import CartItemsList from '../../../../components/List/CartItemsList';
import PriceDetails from './PriceDetails';
import ProceedDetails from './ProceedDetails';
import PaymentMethodModal from '../../../../components/Modals/PaymentMethodModal';
import { AppContext } from '../../../../context/AppContext';

const Checkout = ({ navigation }) => {
  const { state } = useContext(AppContext);

  // Modal visibility state
  const [isModalVisible, setModalVisible] = useState(false);

      const [issLoading, setIsLoading] = useState(true);  
  

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('Modal state toggled:', !isModalVisible); 
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Checkout" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: rh(15) }} keyboardShouldPersistTaps="handled">
        {/* Stepper */}
        <Stepper steps={['Address', 'Order Summary', 'Payment']} currentStep={1} />

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

      {/* Fixed Proceed Details at the bottom */}
      <View style={styles.proceedDetails}>
        <ProceedDetails 
          data={state.viewCartData} 
          btnText="Continue"
          onPress={toggleModal} 
        />
      </View>

      {/* Payment Method Modal */}
      <PaymentMethodModal isVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
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
