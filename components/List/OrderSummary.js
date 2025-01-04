//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive'; 
import { MaterialIcons } from '@expo/vector-icons';



// create a component
const OrderSummary = ({ OrderData }) => {
    return (
        <View style={styles.container}>
            <View style={{gap:rh(0.5)}}>
                <View>
                    <Text style={styles.title}>Order Summary</Text>
                    <Text style={{fontSize:rf(1.5), color:"#9D9D9D"}}>{OrderData.order_date} |  {OrderData.order_time}</Text>
                </View>
                <TouchableOpacity style={{flexDirection:"row", padding:rw(1.5), borderRadius:5, gap:rw(2), alignItems:"center", borderWidth:1, borderColor:"#DFDFDF", width:rw(40) }}>
                <Text style={{fontWeight:"600"}}>Download Invoice</Text>
                <Image source={require('../../assets/download.png')} style={{width:rw(5), height:rw(5)}} />
                </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                 <Image source={require('../../assets/account/trash.png')} style={{width:rw(5), height:rw(5)}} />
              </TouchableOpacity>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        borderRadius:10,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        fontWeight:"bold",
        fontSize:rf(2.4)
    }
});

//make this component available to the app
export default OrderSummary;
