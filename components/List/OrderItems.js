//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive'; 


// create a component
const OrderItems = () => {
    return (
        <View>
            <View style={{gap:rh(1), backgroundColor:"white", padding:rw(2), paddingHorizontal:rw(2), borderRadius:10}}>
                <Text style={{fontWeight:"bold"}}>Order Items(3)</Text>
                <View style={{backgroundColor:"#F3F3F3", padding:rw(1.5), borderRadius:rw(2), flexDirection:"row"}}>
                    <Image source={require('../../assets/image45.png')} style={{width:rw(18), height:rh(8)}} />
                    <View style={{padding:rw(2)}}>
                    <Text style={{fontWeight:"400"}}>Premium Roasted Almonds <Text style={{color:"#717171"}}>(250g)</Text></Text>
                    <Text style={{marginVertical:rh(0.5), color:"#717171"}}>₹499 | Qty: 1</Text>
                    </View>
                </View>
                <View style={{backgroundColor:"#F3F3F3", padding:rw(1.5), borderRadius:rw(2), flexDirection:"row"}}>
                    <Image source={require('../../assets/image56.png')} style={{width:rw(18), height:rh(8)}} />
                    <View style={{padding:rw(2)}}>
                    <Text style={{fontWeight:"400"}}>Premium Roasted Almonds <Text style={{color:"#717171"}}>(250g)</Text></Text>
                    <Text style={{marginVertical:rh(0.5), color:"#717171"}}>₹499 | Qty: 1</Text>
                    </View>
                </View>
                <View style={{backgroundColor:"#F3F3F3", padding:rw(1.5), borderRadius:rw(2), flexDirection:"row"}}>
                    <Image source={require('../../assets/image765.png')} style={{width:rw(18), height:rh(8)}} />
                    <View style={{padding:rw(2)}}>
                    <Text style={{fontWeight:"400"}}>Premium Roasted Almonds <Text style={{color:"#717171"}}>(250g)</Text></Text>
                    <Text style={{marginVertical:rh(0.5), color:"#717171"}}>₹499 | Qty: 1</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default OrderItems;
