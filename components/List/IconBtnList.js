//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';



// create a component
const IconBtnList = ({icon, text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <MaterialIcons name={icon} size={rf(4)} style={{ fontSize: rf(3), marginRight:rw(2), padding:rw(2), backgroundColor:"#FFF4E6", color:"#272727", borderRadius:100 }} />
                <Text style={{color:"#272727", fontSize:rf(2)}}>{text}</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{color:"#717171"}}/>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal:rw(3),
        paddingVertical:rh(1),
    },
});

//make this component available to the app
export default IconBtnList;
