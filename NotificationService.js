// NotificationService.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

// Set notification handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to register for push notifications
export async function registerForPushNotificationsAsync() {
  // Physical device check
  if (!Device.isDevice) {
    Alert.alert('Error', 'A physical device is required for push notifications');
    return null;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    // Request permissions if not already granted
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log("Permission status:", status);
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Error', 'Permission for push notifications was not granted!');
    return null;
  }

  // Get the projectId from EAS configuration (if using it)
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    Alert.alert('Error', 'EAS Project ID not found');
    return null;
  }

  try {
    // Generate and return Expo Push Token
    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log("Expo Push Token:", tokenData.data);
    return tokenData.data;
  } catch (error) {
    console.error("Error getting Expo push token:", error);
    return null;
  }
}
