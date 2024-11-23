//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';

// create a component
const RefreshYourDay = () => {

    // Items List array define
    const productList = [
        {
            name: "Premium Roasted Almonds",
            weight: "500g",
            type: "Roasted",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image1.png'), // Corrected path
        },
        {
            name: "Honey Almond Energy Bars",
            weight: "500g",
            type: "Natural",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image2.png'), // Corrected path
        },
        {
            name: "Organic Green Tea",
            weight: "500g",
            type: "Organic",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image1.png'), // Corrected path
        },
        {
            name: "Premium Roasted Almonds",
            weight: "500g",
            type: "Roasted",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image1.png'), // Corrected path
        },
        {
            name: "Honey Almond Energy Bars",
            weight: "500g",
            type: "Natural",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image2.png'), // Corrected path
        },
        {
            name: "Organic Green Tea",
            weight: "500g",
            type: "Organic",
            price: 299,
            mpr: 399,
            discount: "25% OFF",
            rating: 5,
            likes: 22500,
            image: require('../../../../assets/items/image1.png'), // Corrected path
        }
    ];

    return (
        <View style={{ padding: rw(4) }}>
            <Text style={styles.headerText}>Refresh Your Day</Text>
            <View>
                {/* Passing productList as props */}
                <ItemsList items={productList} />
            </View>
        </View>
    );
};

//make this component available to the app
export default RefreshYourDay;

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginLeft: rw(2),
    },
});
