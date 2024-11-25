//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import UserDetails from './userDetails';
import PriceDetails from './PriceDetails';


// create a component
const OrderPlaced = () => {
    return (
        <View style={styles.container}>
             <View style={styles.successContainer}>
                 <View style={{paddingHorizontal: rw(4)}}>
                   <MaterialIcons name="arrow-back" size={rf(3)} color="white" />
                 </View>
                 <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={{flexDirection:"row", gap:rw(2), alignItems:"center"}}>
                       <MaterialIcons name="check-circle" size={35} color="white" />
                       <Text style={{fontSize:rf(4), fontWeight:"bold", color:"#FFFFFF"}}>Order Confirmed !</Text>
                    </View>
                    <View style={{backgroundColor:"#FEFEFE33", marginVertical:rh(1), padding:rw(3), borderRadius:10}}>
                       <Text style={{fontSize:rf(2), color:"#FFFFFF"}}>Your order has been successfully placed</Text>
                    </View>
                 </View>
             </View>
             <View style={styles.detailsContainer}>
                  <View style={{flexDirection:"row"}}>
                      <Text style={{fontWeight:"bold", fontSize:rf(2)}}>Order ID : </Text>
                      <Text style={{fontWeight:"normal"}}>#8912937981230</Text>
                  </View>
                  <UserDetails />
                  <PriceDetails />
             </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    successContainer:{
        height:rh(30),
        backgroundColor:"green",
    },
    detailsContainer:{
      height:rh(70),
      backgroundColor:"white",
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      backgroundColor:"#F3F3F3",  
      padding:rw(3),
      paddingHorizontal:rw(5)
    }
});

//make this component available to the app
export default OrderPlaced;
