//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import UserDetails from './userDetails';
import Header from '../../../../components/header';

// create a component
const AddressBook = ({navigation}) => {
    return (
        <View>
            {/* Back Container */}
            <Header
              Title="Address Book"
            />
 
            <View style={styles.container}>
                <TouchableOpacity style={styles.addaddressbtn}>
                    <MaterialIcons name="add" size={rf(4)} style={{ fontSize: rf(3), color:"#FF3131" }} />
                    <Text style={{color:"#FF3131", fontWeight:"bold", marginLeft:rw(1)}}>Add Address</Text>
                </TouchableOpacity>
                <View style={{gap:rh(1)}}>
                    <UserDetails />
                    <UserDetails />
                    <UserDetails />
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default AddressBook;

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