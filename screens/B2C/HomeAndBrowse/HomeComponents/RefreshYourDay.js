import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';
import apiClient from '../../../../Service/apiClient';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';

// create a component
const RefreshYourDay = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading state

  // Fetch slider image from API
  useEffect(() => {
    const fetchHomeSliderData = async () => {
      try {
        const response = await apiClient.get('/home');
        const productData = response.data.data.section1;
        setProductData(productData);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchHomeSliderData();
  }, []);

  return (
    <View style={{ padding: rw(4) }}>
      <Text style={styles.headerText}>Refresh Your Day</Text>
      <View>
        {/* Show multiple loading spinners (8 times) until data is loaded */}
        {loading ? (
          [...Array(8)].map((_, index) => (
            <View style={{ flexDirection: 'row', marginBottom: rh(1) }} key={index}>
              <ItemsListLoader layout="horizontal" />
            </View>
          ))
        ) : (
          <ItemsList items={productData} />
        )}
      </View>
    </View>
  );
};


// make this component available to the app
export default RefreshYourDay;

const styles = StyleSheet.create({
  headerText: {
    fontSize: rf(2),
    fontWeight: 'bold',
    marginBottom: rw(2),
    marginLeft: rw(2),
  },
});
