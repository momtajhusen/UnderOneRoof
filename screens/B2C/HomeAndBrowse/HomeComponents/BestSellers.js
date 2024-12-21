import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';
import * as Animatable from 'react-native-animatable';
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';


const BestSellers = () => {

    const navigation = useNavigation();


    // Categories array define karte hain
    const categories = [
        { id: 1, cimage: require('../../../../assets/CategorIcon/image1.png'), text: 'Dry Fruits' },
        { id: 2, cimage: require('../../../../assets/CategorIcon/image2.png'), text: 'Spices' },
        { id: 3, cimage: require('../../../../assets/CategorIcon/image3.png'), text: 'Kesar' },
        { id: 4, cimage: require('../../../../assets/CategorIcon/image4.png'), text: 'Spices' },
        { id: 5, cimage: require('../../../../assets/CategorIcon/image5.png'), text: 'Herbal Teas' },
        { id: 6, cimage: require('../../../../assets/CategorIcon/image6.png'), text: 'Herbal Teas' },
        { id: 7, cimage: require('../../../../assets/CategorIcon/image7.png'), text: 'Herbal Teas' },
        { id: 8, cimage: require('../../../../assets/CategorIcon/image1.png'), text: 'Herbal Teas' },
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
                    onPress={() => navigation.navigate('ProductListing', { selectCategoryId: category.id, selectCategoryName: category.text })}
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
        fontSize: rf(2),
        fontWeight: 'bold',
        marginBottom: rw(2),
        // marginHorizontal:rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Ensure the items wrap to the next line if needed
    },
});

export default BestSellers;
