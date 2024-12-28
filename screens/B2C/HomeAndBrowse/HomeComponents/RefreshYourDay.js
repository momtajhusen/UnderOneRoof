import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';
import apiClient from '../../../../Service/apiClient';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';
import { AppContext } from '../../../../context/AppContext';


// create a component
const RefreshYourDay = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading state

  const {state, dispatch } = useContext(AppContext);
  

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
        setLoading(false);
      }
    };
    fetchHomeSliderData();
  }, [state.reFresh]);

  return (
    <View style={{ padding: rw(4) }}>
      <Text style={styles.headerText}>Refresh Your Day</Text>
      <View>
        {loading ? (
            <ItemsListLoader layout="horizontal" />
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
