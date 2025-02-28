//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rf, rw } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';

// create a component
const SimilarProducts = ({ data }) => {
    console.log(data);

    // Use data from props directly for productList
    const productList = data || []; // Default empty array if data is not provided

    // Only render if productList has items
    if (productList.length === 0) {
        return null; // Return null if there's no data
    }

    return (
        <View>
            <Text style={styles.headerText}>Similar Products</Text>
            <View>
                {/* Passing productList as props */}
                <ItemsList items={productList} 
                    listContainerStyle={{
                        marginRight:rw(1)
                    }}
                />
            </View>
        </View>
    );
};

//make this component available to the app
export default SimilarProducts;

const styles = StyleSheet.create({
    headerText: {
        fontSize: rf(2.3),
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginLeft: rw(2),
    },
});
