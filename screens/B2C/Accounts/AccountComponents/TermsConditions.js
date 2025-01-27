// Import libraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { rw, rh } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import { WebView } from 'react-native-webview';
import apiClient from '../../../../Service/apiClient';

// Create a component
const TermsConditions = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Fetch terms data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/terms');
      console.log(response.data);
      setPdfUrl(response.data.data.terms); // Set the PDF URL from API response
    } catch (error) {
      console.error('Error fetching terms:', error);
      Alert.alert('Error', 'Something went wrong while fetching terms and conditions.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Terms & Conditions" />
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
            <Text style={styles.errorText}>No terms and conditions available.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TermsConditions;

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
