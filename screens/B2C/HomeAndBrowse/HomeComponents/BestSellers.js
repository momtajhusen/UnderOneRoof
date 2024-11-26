import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';
import * as Animatable from 'react-native-animatable';
import { rw } from '../../../../Service/responsive';


const BestSellers = () => {

    // Categories array define karte hain
    const categories = [
        { id: 1, image: require('../../../../assets/image5.png'), text: 'Dry Fruits' },
        { id: 2, image: require('../../../../assets/items/image5.png'), text: 'Spices' },
        { id: 3, image: require('../../../../assets/image5.png'), text: 'Kesar' },
        { id: 4, image: require('../../../../assets/items/image5.png'), text: 'Spices' },
        { id: 5, image: require('../../../../assets/image5.png'), text: 'Herbal Teas' },
        { id: 6, image: require('../../../../assets/items/image5.png'), text: 'Herbal Teas' },
        { id: 7, image: require('../../../../assets/image5.png'), text: 'Herbal Teas' },
        { id: 8, image: require('../../../../assets/items/image5.png'), text: 'Herbal Teas' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bestsellers</Text>
            {/* CategoryList */}
            <View style={styles.categoryListContainer}>
            {categories.map((category, index) => (
                    <Animatable.View
                    key={category.id}
                    animation="fadeInUp" // Animation type
                    duration={800} // Duration of each animation
                    delay={index * 20} // Delay based on the index
                >
                <CategoryList
                    id={category.id}
                    image={category.image} // Image prop
                    text={category.text}   // Text prop
                />
                </Animatable.View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: rw(2),
        paddingLeft:rw(5)
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginHorizontal:rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Ensure the items wrap to the next line if needed
    },
});

export default BestSellers;
