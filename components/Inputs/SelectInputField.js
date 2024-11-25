import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { rw, rh, rf } from '../../Service/responsive';

const SelectInputField = ({ label, selectedValue, onValueChange, options }) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    height: rh(5.5),   
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  picker: {
    height: '100%', 
    width: '100%', 
    paddingLeft: 10, 
    height: rh(10), 

  },
});

export default SelectInputField;
