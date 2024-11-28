//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';

// create a component
const IconBtnList = ({icon, text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <View style={{ width:rw(10), height:rw(10), justifyContent:"center", alignItems:"center", fontSize: rf(3), marginRight:rw(2), backgroundColor:"#FFF4E6", borderRadius:100 }}>
                  <Image source={icon} style={{width:rw(5), height:rw(5.5)}}  /> 
                </View>
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



