//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';

// create a component
const SortByBtn = ({onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.shortByBtn}>
            <MaterialIcons name="swap-vert" size={25} color="black" />
            <Text style={{textAlign:"center"}}>Sort</Text>
       </TouchableOpacity>  
    );
};


//make this component available to the app
export default SortByBtn;

const styles = StyleSheet.create({
    shortByBtn:{
        width:rw(20),
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#DFDFDF",
        borderRadius:10,
        backgroundColor:"white",
    }
});

