//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// create a component
const CustomInput = ({ placeholder, value, onChangeText, keyboardType = 'default' }) => {
    return (
        <View>
        <TextInput
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: "#E9E9E9",
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor="black" // Normal weight placeholder
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    );
};

//make this component available to the app
export default CustomInput;


const styles = StyleSheet.create({
    input: {
      height: 50,
      paddingHorizontal: 10,
      borderRadius:15,
      backgroundColor:"#FFFFFF"
    },
  });
