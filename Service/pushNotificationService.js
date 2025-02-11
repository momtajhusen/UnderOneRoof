import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;
  try {
    // ✅ Android Notification Channel Setup
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // ✅ Check if Device is Physical
    if (!Device.isDevice) {
      console.warn('❌ Must use a physical device for push notifications.');
      return null;
    }

    // ✅ Check Permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log('Existing Permission Status:', existingStatus);

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('Final Permission Status after request:', finalStatus);
    }

    if (finalStatus !== 'granted') {
      console.warn('❌ Push notification permissions not granted.');
      return null;
    }

    // ✅ Get Expo Push Token
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      console.error('❌ Project ID is missing.');
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    token = tokenData.data;
    console.log('✅ Expo Push Token:', token);
  } catch (error) {
    console.error('❌ Error fetching push token:', error);
  }

  return token;
}
