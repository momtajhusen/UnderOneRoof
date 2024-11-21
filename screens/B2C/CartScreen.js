//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';
import UserDetails from './CartComponents/userDetails';

// create a component
const CartScreen = ({navigation}) => {
    return (
        <View>
             {/* Back Container  */}
             <View style={styles.backHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={rf(4)} style={{fontSize:rf(3)}} />
                </TouchableOpacity>
                <Text style={{marginLeft:rw(2), fontSize:rw(4), fontWeight:"bold"}}>Your Cart</Text>
             </View>
             <View style={{padding:rw(3)}}>
                <UserDetails /> 
             </View>
        </View>
    );
};

//make this component available to the app
export default CartScreen;

const styles = StyleSheet.create({
    backHeader: {
        alignItems:"center",
        flexDirection:"row",
        paddingLeft:rw(5),
        paddingTop:rh(4),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft:rw(2),
        marginTop:rh(2),
    },
});
