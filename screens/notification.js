// import libraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

// create a component
const Notification = () => {
  const { state } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text>Token: {state.expoToken}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

// make this component available to the app
export default Notification;
