//import liraries
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { rw, rh, rf } from '../../Service/responsive';


// create a component
const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  errorMessage = "",
  maxLength = 255, 
  minLength = 0, 
}) => {
  // Length validation logic
  const lengthError =
    value.length < minLength
      ? `Minimum ${minLength} characters required.`
      : value.length > maxLength
      ? `Maximum ${maxLength} characters allowed.`
      : "";

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderWidth: 1,
            borderColor: errorMessage || lengthError ? "#FF6D6D" : "#E9E9E9", // Highlight border on error
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength} // Set maxLength for TextInput
      />
      {/* Display error messages */}
      {lengthError ? (
        <Text style={styles.errorText}>{lengthError}</Text>
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

//make this component available to the app
export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  errorText: {
      color: '#FF0000',
      fontSize: rf(1.8),
      marginTop: 4,
  },
});
