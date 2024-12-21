//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons , } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import CategoryList from '../../../components/List/CategoryList';
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';
import apiClient from '../../../Service/apiClient';

// create a component
const CategoryScreen  = ({navigation}) => {

        const [categories, setCategories] = useState([]);
    

        // Categories array define karte hain
        // const categories = [
        //     { id: 1, image: require('../../../assets/CategorIcon/image1.png'), text: 'Dry Fruits' },
        //     { id: 2, image: require('../../../assets/CategorIcon/image2.png'), text: 'Spices' },
        //     { id: 3, image: require('../../../assets/CategorIcon/image3.png'), text: 'Kesar' },
        //     { id: 4, image: require('../../../assets/CategorIcon/image4.png'), text: 'Spices' },
        //     { id: 5, image: require('../../../assets/CategorIcon/image5.png'), text: 'Herbal Teas' },
        //     { id: 6, image: require('../../../assets/CategorIcon/image6.png'), text: 'Herbal Teas' },
        //     { id: 7, image: require('../../../assets/CategorIcon/image7.png'), text: 'Herbal Teas' },
        //     { id: 8, image: require('../../../assets/CategorIcon/image1.png'), text: 'Herbal Teas' },
        //     { id: 9, image: require('../../../assets/CategorIcon/image2.png'), text: 'Dry Fruits' },
        //     { id: 10, image: require('../../../assets/CategorIcon/image3.png'), text: 'Spices' },
        //     { id: 11, image: require('../../../assets/CategorIcon/image4.png'), text: 'Kesar' },
        //     { id: 12, image: require('../../../assets/CategorIcon/image5.png'), text: 'Spices' },
        //     { id: 13, image: require('../../../assets/CategorIcon/image6.png'), text: 'Herbal Teas' },
        //     { id: 14, image: require('../../../assets/CategorIcon/image7.png'), text: 'Herbal Teas' },
        //     { id: 15, image: require('../../../assets/CategorIcon/image1.png'), text: 'Herbal Teas' },
        //     { id: 16, image: require('../../../assets/CategorIcon/image2.png'), text: 'Herbal Teas' },
        // ];

            // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/allcategory');  
                const category = response.data.data.category;
                setCategories(category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);  
            }
        };

        fetchCategories();
    }, []);

    return (
        <View>
             {/* Back Container  */}
             <Header
                title="Categories"
                rightContent={
                    <View style={{flexDirection:"row", gap: rw(4)}}>
                      <TouchableOpacity>
                         <Image source={require('../../../assets/Search.png')} style={{width:rw(5.5), height:rw(5.5)}} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={require('../../../assets/Cart.png')} style={{width:rw(5.5), height:rw(5.5)}} />
                      </TouchableOpacity>
                    </View>
                }
            />


             {/* Category List Container  */}
             <View style={styles.categoryListContainer}>
            {categories.map((category, index) => (
                    <Animatable.View
                    key={category.sid}
                    animation="fadeInUp"  
                    duration={800} 
                    delay={index * 20}  
                >
                <CategoryList
                    cimage={category.image}  
                    text={category.cname}  
                    onPress={() => navigation.navigate('ProductListing', { selectCategoryId: category.sid, selectCategoryName: category.cname })}
                />
                </Animatable.View>
                ))}
            </View>
        </View>
    );
};

//make this component available to the app
export default CategoryScreen;


const styles = StyleSheet.create({
    categoryListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft:rw(5),
        marginTop:rh(2),
    },
});
