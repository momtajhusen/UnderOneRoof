import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';  
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../../Service/apiClient';  
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';


const B2BBestSellers = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); 

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/home');  
                const category = response.data.data.bestcategory;
                setCategories(category);
                console.log('Shop Category');
                console.log(category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);  
            }
        };
        fetchCategories();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Shop By Category</Text>
            {/* Show loading indicator while data is being fetched */}
            {loading ? (
                <View style={styles.categoryListContainer}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CategoryListLoader key={index} />
                    ))}
                </View>
            ) : (
                <View style={styles.categoryListContainer}>
                    {categories.map((category) => (
                        <CategoryList
                            key={category.sid}
                            cimage={category.image}  
                            text={category.cname}
                            onPress={() =>
                                navigation.navigate('ProductListing', {
                                    selectCategoryId: category.sid,
                                    selectCategoryName: category.cname,
                                    selectCategorySlug: category.cslug,
                                })
                            }
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: rw(2),
        paddingLeft: rw(2),
    },
    headerText: {
        fontSize: rf(2),
        fontWeight: 'bold',
        marginBottom: rw(2),
        marginLeft: rw(2),
    },
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: rw(3),
    },
});

export default B2BBestSellers;
