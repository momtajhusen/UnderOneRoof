import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';
import * as Animatable from 'react-native-animatable';
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';
import { rw, rf } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';

const BestSellers = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            // Simulating API call with timeout
            setTimeout(() => {
                const fetchedCategories = [
                    { id: 1, cimage: require('../../../../assets/CategorIcon/image1.png'), text: 'Dry Fruits' },
                    { id: 2, cimage: require('../../../../assets/CategorIcon/image2.png'), text: 'Spices' },
                    { id: 3, cimage: require('../../../../assets/CategorIcon/image3.png'), text: 'Kesar' },
                    { id: 4, cimage: require('../../../../assets/CategorIcon/image4.png'), text: 'Spices' },
                    { id: 5, cimage: require('../../../../assets/CategorIcon/image5.png'), text: 'Herbal Teas' },
                    { id: 6, cimage: require('../../../../assets/CategorIcon/image6.png'), text: 'Herbal Teas' },
                    { id: 7, cimage: require('../../../../assets/CategorIcon/image7.png'), text: 'Herbal Teas' },
                    { id: 8, cimage: require('../../../../assets/CategorIcon/image1.png'), text: 'Herbal Teas' },
                ];
                setCategories(fetchedCategories);
                setLoading(false);
            }, 2000); // Simulated delay
        };
        fetchCategories();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bestsellers</Text>
            <View style={styles.categoryListContainer}>
                {loading ? (
                    // Render shimmer loaders
                    Array.from({ length: 8 }).map((_, index) => (
                        <CategoryListLoader key={index} />
                    ))
                ) : (
                    // Render categories with animation
                    categories.map((category, index) => (
                        <Animatable.View
                            key={category.id}
                            animation="fadeInUp"
                            duration={800}
                            delay={index * 20}
                        >
                            <CategoryList
                                id={category.id}
                                image={category.cimage}
                                text={category.text}
                                onPress={() =>
                                    navigation.navigate('ProductListing', {
                                        selectCategoryId: category.id,
                                        selectCategoryName: category.text,
                                    })
                                }
                            />
                        </Animatable.View>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: rw(2),
        paddingLeft: rw(5),
    },
    headerText: {
        fontSize: rf(2),
        fontWeight: 'bold',
        marginBottom: rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default BestSellers;
