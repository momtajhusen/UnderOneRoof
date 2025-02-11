import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { sendPushNotification } from '../Service/pushNotificationService';

const HomeScreen = () => {
  const { state } = useContext(AppContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Expo Push Token:</Text>
      <Text>{state.pushToken || 'Fetching...'}</Text>

      <Button
        title="Send Test Notification"
        onPress={() => {
          if (state.pushToken) {
            sendPushNotification(state.pushToken);
          } else {
            Alert.alert('Push Token', 'Push Token not load');
          }
        }}
      />
    </View>
  );
};

export default HomeScreen;
