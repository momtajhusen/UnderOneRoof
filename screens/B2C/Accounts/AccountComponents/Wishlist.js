//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import WishlistCard from '../../../../components/List/WishlistCard';


// create a component
const Wishlist = ({navigation}) => {

        // Items List array define
        const productList = [
            {
                name: "Premium Roasted Almonds",
                weight: "500g",
                type: "Roasted",
                price: 299,
                mpr: 399,
                discount: "25% OFF",
                rating: 5,
                likes: 22500,
                image: require('../../../../assets/items/image1.png'), // Corrected path
            },
            {
                name: "Honey Almond Energy Bars",
                weight: "500g",
                type: "Natural",
                price: 299,
                mpr: 399,
                discount: "25% OFF",
                rating: 5,
                likes: 22500,
                image: require('../../../../assets/items/image2.png'), // Corrected path
            },
            {
                name: "Organic Green Tea",
                weight: "500g",
                type: "Organic",
                price: 299,
                mpr: 399,
                discount: "25% OFF",
                rating: 5,
                likes: 22500,
                image: require('../../../../assets/items/image1.png'), // Corrected path
            },
            {
                name: "Premium Roasted Almonds",
                weight: "500g",
                type: "Roasted",
                price: 299,
                mpr: 399,
                discount: "25% OFF",
                rating: 5,
                likes: 22500,
                image: require('../../../../assets/items/image1.png'), // Corrected path
            }
        ];

    return (
        <View>
             <Header title="Wishlist" 
                    rightContent={
                    <View style={{flexDirection:"row", gap: rw(4)}}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons  name="cart-outline" size={rf(3)} color="black" />
                        </TouchableOpacity>
                    </View>
                }
             />
            <View style={styles.container}>
                <Text style={{marginTop:rh(1.5), marginBottom:rh(0.5), marginLeft:rw(2),  fontWeight:"bold", fontSize:rf(2)}}>23 items added</Text>
                <WishlistCard items={productList}  />
            </View>
        </View>
    );
};

//make this component available to the app
export default Wishlist;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(2),   
    },
});