//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';

// create a component
const OrderOrWishlist = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer}>
               {/* <MaterialIcons name="shopping-bag" size={rf(4)} style={{ fontSize: rf(3), color:"#272727" }} /> */}
               <Image source={require('../../../assets/bag-2.png')} style={{width:rw(7), height:rw(7)}} />
               <Text style={{color:"#272727"}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer}>
              {/* <MaterialIcons name="favorite-border" size={rf(4)} style={{ fontSize: rf(3) }} /> */}
              <Image source={require('../../../assets/heart.png')} style={{width:rw(7), height:rw(7)}} />
              <Text style={{color:"#272727"}}>Wishlist</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        marginTop:rh(3),
        borderRadius:10,
        borderWidth:2,
        borderColor:"#FFFFFF",
        backgroundColor: '#FFF4E6',
        padding:2,
    },
    btnContainer:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        paddingHorizontal:rw(15.7),
        paddingVertical:rh(1),
        margin:rw(1),
        borderRadius:10,
    }
});

//make this component available to the app
export default OrderOrWishlist;
