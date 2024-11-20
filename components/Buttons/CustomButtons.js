import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { rw, rh, rf } from '../../Service/responsive';

const SaveButton = ({ onPress, loading, disabled, title = "Save" }) => {

  return (
    <TouchableRipple
      onPress={!loading && !disabled ? onPress : null}
      rippleColor="rgba(0, 0, 0, .32)"
      style={[
        styles.saveButton,
        { backgroundColor: disabled ? '#ddd' :  "#FF3131" },
      ]}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator size={25} color="#fff" />
        ) : (
          <Text
            style={[
              styles.text,
              {
                color:  "white",
                fontSize: rf(2),
                fontWeight: 'bold',
              },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    borderRadius: rw(2),
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
    alignItems: 'center',
    marginVertical: rh(1.5),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SaveButton;
