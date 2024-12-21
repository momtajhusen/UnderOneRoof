//import liraries
import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rf, rh } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';
import apiClient from '../../../../Service/apiClient';


// create a component
const RefreshYourDay = () => {

      const [productData, setProductData] = useState([]);

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
          }, [])

    return (
        <View style={{ padding: rw(4) }}>
            <Text style={styles.headerText}>Refresh Your Day</Text>
            <View>
                {/* Passing productList as props */}
                <ItemsList items={productData} />
            </View>
        </View>
    );
};

//make this component available to the app
export default RefreshYourDay;

const styles = StyleSheet.create({
    headerText: {
        fontSize: rf(2),
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginLeft: rw(2),
    },
});
