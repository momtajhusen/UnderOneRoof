import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import * as Animatable from 'react-native-animatable';
import UserDetails from '../../B2C/Cart&Checkout/CartComponents/userDetails';
import CartItemsList from '../../../components/List/CartItemsList';
import PriceDetails from '../../B2C/Cart&Checkout/CartComponents/PriceDetails';
import SimilarProducts from '../../B2C/Cart&Checkout/CartComponents/SimilarProducts';
import Header from '../../../components/header';
import ProceedDetails from '../../B2C/Cart&Checkout/CartComponents/ProceedDetails';
import { useNavigation } from '@react-navigation/native';

const cartItemsData = [
    // Sample cart data
    {
        id: '1',
        itemImage: 'https://4.imimg.com/data4/KJ/UI/MY-8810619/almonds-super-1000x1000.jpg',
        itemName: 'Premium Roasted Almonds',
        itemWeight: '250g',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 1,
    },
    {
        id: '2',
        itemImage: 'https://5.imimg.com/data5/SELLER/Default/2023/10/350157475/IR/DX/XT/127718909/almonds-250x250.jpeg',
        itemName: 'Premium Roasted Almonds Roasted Almonds Roasted Almonds',
        itemWeight: '250g x 2',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 2,
    },
    {
        id: '3',
        itemImage: 'https://i0.wp.com/www.kitchenchoice.in/wp-content/uploads/elementor/thumbs/Zipper-Dummy-Kitchen-Choice-almond-p7tl8a58mcnvt1tn1g1wjdjexu0j72xyuj99tezxa6.png?w=580&ssl=1',
        itemName: 'Premium Roasted Almonds',
        itemWeight: '250g x 2',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 2,
    },
];

const B2BCartScreen = ({ navigation }) => {
    
    const handleIncrease = (id) => {
        console.log(`Increase quantity for item ${id}`);
    };

    const handleDecrease = (id) => {
        console.log(`Decrease quantity for item ${id}`);
    };

    const handleRemove = (id) => {
        console.log(`Remove item ${id}`);
    };

    return (
        <View style={styles.screenContainer}>
            {/* Header */}
            <Header
                title="Your Cart"
                rightContent={
                    <View style={{ flexDirection: "row", gap: rw(4) }}>
                        <TouchableOpacity>
                            {/* <MaterialIcons name="search" size={rf(3)} color="black" /> */}
                           <Image source={require('../../../assets/Search.png')} style={{width:rw(5.5), height:rw(5.5)}} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <ScrollView contentContainerStyle={{ paddingBottom: rh(10) }}>
                <View style={styles.container}>
                    <UserDetails addresType="Outlet" type="show" />
                </View>

                {/* Cart Items */}
                <View style={{ margin: rw(3.5), backgroundColor: "white", borderRadius: rw(5) }}>
                    <FlatList
                        data={cartItemsData}
                        vertical={false}
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
                    <PriceDetails style={{backgroundColor:"green"}} />
                </View>
            </ScrollView>

            {/* Fixed Proceed Details at the bottom */}
            <View style={styles.proceedDetails}>
                <ProceedDetails btnText="Proceed" onPress={()=>navigation.navigate('B2BSelectAddressScreen')} />
            </View>
        </View>
    );
};

export default B2BCartScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: rw(3),
    },
    similarProducts: {
        paddingHorizontal: rw(3),
        paddingVertical: rh(1),
        backgroundColor: "white",
        marginHorizontal: rw(3),
        borderRadius: 10,
    },
    proceedDetails: {
        position: "absolute",
        bottom: rh(0),
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
});
