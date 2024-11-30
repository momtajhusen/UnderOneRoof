//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rf, rw } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';

// create a component
const SimilarProducts = () => {

    // Items List array define
    const productList = [
        {
            id:1,
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
            id:2,
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
            id:3,
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
            id:4,
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
            id:5,
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
            id:6,
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
        <View>
            <Text style={styles.headerText}>Similar Products</Text>
            <View>
                {/* Passing productList as props */}
                <ItemsList items={productList} />
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
