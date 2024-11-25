import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { rw, rh, rf } from '../../Service/responsive';

const DateInputField = ({ label, date, onChange }) => {
  const [show, setShow] = useState(false);

  const showDatePicker = () => setShow(true);

  const handleChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Function to format the date as MM/DD/YYYY
  const formatDate = (date) => {
    if (date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    }
    return 'Select Date';
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.dateButtonContainer} onPress={showDatePicker}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  dateButtonContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    height: rh(5.5),  
    justifyContent: 'center',  
    paddingHorizontal: rw(4),
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DateInputField;
