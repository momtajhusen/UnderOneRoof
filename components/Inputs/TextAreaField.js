// TextTextareaField.js
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

const TextAreaField = ({
  label = '', // Default label is 'Description'
  value,
  style,
  onChange,
  placeholder = 'Enter your text...', 
  keyboardType = 'default',
  multiline = true,  
  numberOfLines = 5, 
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput,  
        style,  
      ]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#717171"
      keyboardType={keyboardType}
      multiline={multiline} 
      numberOfLines={multiline ? numberOfLines : 1}  
      maxLength={250}  
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: rh(2),
  },
  label: {
    fontSize: rf(2),
    color: '#666',
    marginBottom: rh(1),  
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: rw(4),
    paddingVertical: rh(1),
    borderRadius: 8,
    fontSize: rf(2),
    backgroundColor: '#FFFFFF',
    color: '#333',  
  },
  multilineInput: {
    height: rh(12),  
    textAlignVertical: 'top',  
  },
});

export default TextAreaField;
