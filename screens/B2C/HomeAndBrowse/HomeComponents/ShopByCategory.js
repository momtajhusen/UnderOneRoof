import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';  // Import CategoryList
import { rw, rf, rh } from '../../../../Service/responsive';

const ShopByCategory = () => {

    // Categories array define karte hain
    const categories = [
        { id: 1, image: require('../../../../assets/CategorIcon/image1.png'), text: 'Dry Fruits' },
        { id: 2, image: require('../../../../assets/CategorIcon/image2.png'), text: 'Spices' },
        { id: 3, image: require('../../../../assets/CategorIcon/image3.png'), text: 'Kesar' },
        { id: 4, image: require('../../../../assets/CategorIcon/image4.png'), text: 'Spices' },
        { id: 5, image: require('../../../../assets/CategorIcon/image5.png'), text: 'Herbal Teas' },
        { id: 6, image: require('../../../../assets/CategorIcon/image6.png'), text: 'Herbal Teas' },
        { id: 7, image: require('../../../../assets/CategorIcon/image7.png'), text: 'Herbal Teas' },
        { id: 8, image: require('../../../../assets/CategorIcon/image1.png'), text: 'Herbal Teas' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Shop By Category</Text>
            {/* CategoryList ko categories array ke har item ko map kar ke pass kar rahe hain */}
            <View style={styles.categoryListContainer}>
                {categories.map((category) => (
                    <CategoryList
                        key={category.id}
                        image={category.image} // Image prop
                        text={category.text}   // Text prop
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: rw(2),
        paddingLeft:rw(2)
    },
    headerText: {
        fontSize: rf(2),
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginLeft:rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:rw(3)
    },
});

export default ShopByCategory;
