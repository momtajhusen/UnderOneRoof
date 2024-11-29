// TextInputField.js
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';


const TextInputField = ({ label, value, style, onChange, placeholder, keyboardType = 'default' }) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[styles.input, {style}]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#717171"
      keyboardType={keyboardType}
    />
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
    paddingHorizontal:rw(4),
    height:rh(5.5),
    borderRadius: 8,
    fontSize:rf(2),
    backgroundColor:"#FFFFFF"
  },
});

export default TextInputField;
