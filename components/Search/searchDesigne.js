//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




// create a component
const SearchDesigne = ({onPress}) => {

  const navigation = useNavigation();

    return (
        <View style={{position:"relative"}}>
            <TouchableOpacity style={styles.search} onPress={onPress}>
                <View style={{flexDirection:"row", justifyContent:"start", alignItems:"center", paddingHorizontal: rw(2.5)  }}>
                    {/* <MaterialIcons name="search" size={rf(3.5)}/> */}

                    <Image source={require('../../assets/Search.png')} style={{width:rw(5.5), height:rw(5.5)}} />

                    <Text style={{textAlign:"center", marginLeft:rw(1), color:"#9D9D9D"}}>Search here..</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default SearchDesigne;

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    height: rh(5.5),
    width: rw(90),
    position: 'absolute',
    justifyContent: 'center',
    left: rw(-45),
    top: rh(0),
    zIndex: 100,
    borderRadius: 10,
  
    // ✅ Android shadow
    elevation: 1,
  
    // ✅ iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  }
  
  });