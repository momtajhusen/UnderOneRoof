// TextInputField.js
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

const TextInputField = ({ 
  label, 
  value, 
  style, 
  onChange, 
  placeholder, 
  keyboardType = 'default', 
  errorMessage = "",
  maxLength = 255, // Default maxLength
  minLength = 0,   // Default minLength
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[
        styles.input, 
        style, 
        errorMessage ? styles.errorInput : null // Error style if errorMessage exists
      ]}
      value={value}
      onChangeText={(text) => {
        // Ensure text respects minLength
        if (text.length >= minLength) {
          onChange(text);
        }
      }}
      placeholder={placeholder}
      placeholderTextColor="#717171"
      keyboardType={keyboardType}
      maxLength={maxLength} // Apply maxLength
    />
    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: rh(1),
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: rw(4),
    height: rh(5.5),
    borderRadius: 8,
    fontSize: rf(2),
    backgroundColor: "#FFFFFF",
  },
  errorInput: {
    borderColor: '#FF0000', // Red border to indicate an error
  },
  errorText: {
    color: '#FF0000',
    fontSize: rf(1.8),
    marginTop: 4,
  },
});

export default TextInputField;
