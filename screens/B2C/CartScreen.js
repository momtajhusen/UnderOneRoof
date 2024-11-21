// Import necessary libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';
import UserDetails from './CartComponents/userDetails';
import CartItemsList from '../../components/List/CartItemsList';
import PriceDetails from './CartComponents/PriceDetails';
import * as Animatable from 'react-native-animatable';


// Sample array data for cart items
const cartItemsData = [
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

// Create CartScreen component
const CartScreen = ({ navigation }) => {
    // Function to handle increase in quantity
    const handleIncrease = (id) => {
        console.log(`Increase quantity for item ${id}`);
    };

    // Function to handle decrease in quantity
    const handleDecrease = (id) => {
        console.log(`Decrease quantity for item ${id}`);
    };

    // Function to handle removing an item
    const handleRemove = (id) => {
        console.log(`Remove item ${id}`);
    };

    return (
        <View>
            {/* Back Container */}
            <View style={styles.backHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={rf(4)} style={{ fontSize: rf(3) }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: rw(2), fontSize: rw(4), fontWeight: 'bold' }}>Your Cart</Text>
            </View>

            <ScrollView>
                <View style={styles.container}>
                    <UserDetails />
                </View>

                {/* Render Cart Items */}
                <View style={{ margin: rw(3.5), backgroundColor:"white", borderRadius:rw(5)}}>
                    <FlatList
                        data={cartItemsData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                key={item.id}
                                animation="fadeInUp" // Animation type
                                duration={800} // Duration of each animation
                                delay={index * 20} // Delay based on the index
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

                {/* Price Details  */}
                <View style={[styles.container, {marginBottom:rh(10)}]}>
                    <PriceDetails />
                </View>
            </ScrollView>


        </View>
    );
};

// Make the component available to the app
export default CartScreen;

const styles = StyleSheet.create({
    backHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: rw(5),
        paddingTop: rh(4),
    },
    container: {
        paddingHorizontal: rw(3),   
    }
});
