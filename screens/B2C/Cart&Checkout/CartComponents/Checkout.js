//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import Stepper from '../../../../components/stepper';
import UserDetails from './userDetails';
import CartItemsList from '../../../../components/List/CartItemsList';
import PriceDetails from './PriceDetails';
import ProceedDetails from './ProceedDetails';
import PaymentMethodModal from '../../../../components/Modals/PaymentMethodModal';


// create a component
const Checkout = ({navigation}) => {

    const cartItemsData = [
        // Sample cart data
        {
            id: '1',
            itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
            itemName: 'Premium Roasted Almonds',
            itemWeight: '250g',
            itemPrice: 299,
            itemMRP: 350,
            itemQuantity: 1,
        },
        {
            id: '2',
            itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
            itemName: 'Premium Roasted Almonds Roasted Almonds Roasted Almonds',
            itemWeight: '250g x 2',
            itemPrice: 299,
            itemMRP: 350,
            itemQuantity: 2,
        },
        {
            id: '3',
            itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
            itemName: 'Premium Roasted Almonds',
            itemWeight: '250g x 2',
            itemPrice: 299,
            itemMRP: 350,
            itemQuantity: 2,
        },
    ];

    const handleIncrease = (id) => {
        console.log(`Increase quantity for item ${id}`);
    };

    const handleDecrease = (id) => {
        console.log(`Decrease quantity for item ${id}`);
    };

    const handleRemove = (id) => {
        console.log(`Remove item ${id}`);
    };

    // Function to toggle modal visibility
    const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header
                title="Checkout"
            />

          <ScrollView contentContainerStyle={{ paddingBottom: rh(15) }}>
            
            <Stepper 
                steps={['Address', 'Order Summary', 'Payment']} 
                currentStep={1} // Active step: "Order Summary"
            />

            <UserDetails />

                {/* Cart Items */}
                <View style={{ margin: rw(3.5), backgroundColor: "white", borderRadius: rw(5) }}>
                    <FlatList
                        data={cartItemsData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                key={item.id}
                                animation="fadeInUp"
                                duration={800}
                                delay={index * 20}
                            >
                                <CartItemsList
                                    itemImage={item.itemImage}
                                    itemName={item.itemName}
                                    itemWeight={item.itemWeight}
                                    itemPrice={item.itemPrice}
                                    itemMRP={item.itemMRP}
                                    itemQuantity={item.itemQuantity}
                                    onIncrease={() => handleIncrease(item.id)}
                                    onDecrease={() => handleDecrease(item.id)}
                                    onRemove={() => handleRemove(item.id)}
                                />
                            </Animatable.View>
                        )}
                    />
                </View>

                {/* Price Details */}
                <View style={[styles.container, { marginBottom: rh(6) }]}>
                    <PriceDetails  />
                </View>


            </ScrollView>

            {/* Fixed Proceed Details at the bottom */}
            <View style={styles.proceedDetails}>
                <ProceedDetails btnText="Continue" onPress={toggleModal} />
            </View>

            {/* Payment Method Modal */}
            <PaymentMethodModal isVisible={isModalVisible} toggleModal={toggleModal} />


        </View>
    );
};
 

//make this component available to the app
export default Checkout;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:rw(2),
    },
    proceedDetails: {
        position: "absolute",
        bottom: rh(6),
        left: 0,
        right: 0,
        // paddingHorizontal: rw(3),
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        // paddingVertical: rh(1.5),
    },
}); 



