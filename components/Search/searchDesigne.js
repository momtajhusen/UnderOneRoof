//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';



// create a component
const SearchDesigne = () => {
    return (
        <View style={{position:"relative"}}>
            <TouchableOpacity style={styles.search}>
                <View style={{flexDirection:"row", justifyContent:"start", alignItems:"center", paddingHorizontal: rw(2)  }}>
                    <MaterialIcons name="search" size={rf(3.5)}/>
                    <Text style={{textAlign:"center", marginLeft:rw(1)}}>Search here..</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default SearchDesigne;

const styles = StyleSheet.create({
    search: {
      backgroundColor: "white",
      height:rh(5.5),
      width:rw(90),
      position:"absolute",
      justifyContent:"center",
      left:rw(-45),
      top:rh(3),
      zIndex:100,
      borderRadius:5
    }
  });