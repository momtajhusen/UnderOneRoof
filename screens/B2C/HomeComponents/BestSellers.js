import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../components/List/CategoryList';  // Import CategoryList
import { rw } from '../../../Service/responsive';

const BestSellers = () => {

    // Categories array define karte hain
    const categories = [
        { id: 1, image: require('../../../assets/image5.png'), text: 'Category 1' },
        { id: 2, image: require('../../../assets/image5.png'), text: 'Category 2' },
        { id: 3, image: require('../../../assets/image5.png'), text: 'Category 3' },
        { id: 4, image: require('../../../assets/image5.png'), text: 'Category 4' },
        { id: 5, image: require('../../../assets/image5.png'), text: 'Category 4' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bestsellers</Text>
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
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Ensure the items wrap to the next line if needed
    },
});

export default BestSellers;
