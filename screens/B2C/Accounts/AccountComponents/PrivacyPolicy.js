// Import libraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { rw, rh } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import { WebView } from 'react-native-webview';
import apiClient from '../../../../Service/apiClient';

// Create a component
const PrivacyPolicy = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Fetch terms data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/privacy');
      console.log(response.data);
      setPdfUrl(response.data.data.privacy);
    } catch (error) {
      console.error('Error fetching terms:', error);
      Alert.alert('Error', 'Something went wrong while fetching privacy and conditions.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Privacy Policy" />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF3131" />
        ) : pdfUrl ? (
          <WebView
            source={{
              uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`, // Use Google Drive Viewer
            }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" color="#FF3131" />}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No Privacy Policy available.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: rw(4),
    color: '#555',
    textAlign: 'center',
  },
});
