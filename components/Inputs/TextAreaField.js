// TextTextareaField.js
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

const TextAreaField = ({
  label = '', // Default label is 'Description'
  value,
  style,
  onChange,
  placeholder = 'Enter your text...', // Default placeholder
  keyboardType = 'default',
  multiline = true, // Enable multiline by default
  numberOfLines = 5, // Default number of lines for textarea
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput, // Apply multiline styles if enabled
        style, // Spread additional custom styles
      ]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#717171"
      keyboardType={keyboardType}
      multiline={multiline} // Enable multiline
      numberOfLines={multiline ? numberOfLines : 1} // Adjust lines for multiline
      maxLength={250} // Maximum length of input text
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
    marginBottom: rh(1), // Space between label and input
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: rw(4),
    paddingVertical: rh(1),
    borderRadius: 8,
    fontSize: rf(2),
    backgroundColor: '#FFFFFF',
    color: '#333', // Text color
  },
  multilineInput: {
    height: rh(12), // Adjust height for multiline input
    textAlignVertical: 'top', // Align text to the top for multiline
  },
});

export default TextAreaField;
