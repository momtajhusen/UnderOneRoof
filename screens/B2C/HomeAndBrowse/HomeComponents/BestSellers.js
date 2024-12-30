import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';  
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../../Service/apiClient';  
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';
import { AppContext } from '../../../../context/AppContext';



const BestSellers = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { state, dispatch } = useContext(AppContext);

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
    }, [state.reFresh]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bestsellers</Text>
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

export default BestSellers;
