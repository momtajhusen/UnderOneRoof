import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive'; // Responsive helper functions
import ItemsList from '../../../../components/List/ItemsList'; // Component to display the list of items
import apiClient from '../../../../Service/apiClient'; // Axios client for API calls
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader'; // Shimmer loader component
import { AppContext } from '../../../../context/AppContext'; // App context for global state management

// Create a component
const RefreshYourDay = () => {
  const [productData, setProductData] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(true); // State to handle loading status

  const { state } = useContext(AppContext); // Access global state from context

  // Fetch slider data from API
  useEffect(() => {
    const fetchHomeSliderData = async () => {
      try {
        const response = await apiClient.get('/home'); // API call to fetch data
        const sectionData = response.data.data.section1; // Extract section1 data from response

        // Filter data based on role_type and shoppingMode
        const filteredData = sectionData.filter(item => {
          if (state.shoppingMode === 'wholesale') {
            return item.role_type === 3 || item.role_type === null; // Filter wholesale data
          } else if (state.shoppingMode === 'retail') {
            return item.role_type === 2; // Filter retail data
          }
          return false;
        });

        setProductData(filteredData); // Set filtered data to state
        console.log('Filtered RefreshYourDay Data:', filteredData);
      } catch (error) {
        console.error('Error fetching slider data:', error); // Log errors
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    };

    fetchHomeSliderData();
  }, [state.isHomeRefresh, state.shoppingMode]); // Dependencies for useEffect

  return (
    <View style={{ padding: rw(4) }}>
      <Text style={styles.headerText}>Refresh Your Day</Text>
      <View>
        {loading ? (
          <ItemsListLoader layout="horizontal" /> // Display shimmer loader while loading
        ) : (
          <ItemsList items={productData} /> // Display items when data is loaded
        )}
      </View>
    </View>
  );
};

// Export the component
export default RefreshYourDay;

// Styles
const styles = StyleSheet.create({
  headerText: {
    fontSize: rf(2), // Responsive font size
    fontWeight: 'bold',
    marginBottom: rw(2), // Responsive margin
    marginLeft: rw(2), // Responsive margin
  },
});
