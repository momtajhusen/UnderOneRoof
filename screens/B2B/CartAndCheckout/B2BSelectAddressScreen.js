//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import UserDetails from '../../B2C/Cart&Checkout/CartComponents/userDetails';
import Header from '../../../components/header';

// create a component
const B2BSelectAddressScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            {/* Back Container */}
            <Header
              title="Select Address"
            />
 
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>navigation.navigate('EditAddress')} style={styles.addaddressbtn}>
                    <MaterialIcons name="add" size={rf(4)} style={{ fontSize: rf(3), color:"#FF3131" }} />
                    <Text style={{color:"#FF3131", fontWeight:"bold", marginLeft:rw(1)}}>Add Address</Text>
                </TouchableOpacity>
                <View style={{gap:rh(1)}}>
                    <UserDetails addresType="Outlet" />
                    <UserDetails addresType="Outlet" />
                    <UserDetails addresType="Outlet" />
                </View>
            </View>

            {/* Floating Button */}
            <View style={{width:rw(100), padding:rw(2), paddingBottom:rh(2), backgroundColor:"white", position: 'absolute',bottom: rh(0)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('B2BCheckOutScreen')} style={{width:"90%", alignSelf: 'center',backgroundColor: 'red',paddingVertical: rh(1.7), borderRadius: 10}}>
                    <Text style={{fontWeight: 'bold',textAlign: 'center',color: 'white',}}>Confirm Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//make this component available to the app
export default B2BSelectAddressScreen;

const styles = StyleSheet.create({
    backHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: rh(4),
        paddingBottom:rh(2),
        paddingLeft:rw(3),
        justifyContent:"space-between",
        marginRight:rw(5),
    },
    container: {
        paddingHorizontal: rw(4),
        paddingVertical:rh(2),   
    },
    addaddressbtn:{
     alignItems:"center",
     flexDirection:"row",
     borderWidth:1,
     borderColor:"#FF3131",
     backgroundColor:"#FFEAEA",
     paddingLeft:rw(2),
     paddingVertical:rh(1),
     borderRadius:10,
     marginBottom:rh(1)
    }
});

