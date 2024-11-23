//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import CategoryList from '../../components/List/CategoryList';
import { rw, rh, rf } from '../../Service/responsive';
import Header from '../../components/header';

// create a component
const CategoryScreen  = ({navigation}) => {

        // Categories array define karte hain
        const categories = [
            { id: 1, image: require('../../assets/items/image5.png'), text: 'Dry Fruits' },
            { id: 2, image: require('../../assets/image5.png'), text: 'Spices' },
            { id: 3, image: require('../../assets/items/image5.png'), text: 'Kesar' },
            { id: 4, image: require('../../assets/image5.png'), text: 'Spices' },
            { id: 5, image: require('../../assets/items/image5.png'), text: 'Herbal Teas' },
            { id: 6, image: require('../../assets/image5.png'), text: 'Herbal Teas' },
            { id: 7, image: require('../../assets/items/image5.png'), text: 'Herbal Teas' },
            { id: 8, image: require('../../assets/image5.png'), text: 'Herbal Teas' },
            { id: 9, image: require('../../assets/items/image5.png'), text: 'Dry Fruits' },
            { id: 10, image: require('../../assets/image5.png'), text: 'Spices' },
            { id: 11, image: require('../../assets/items/image5.png'), text: 'Kesar' },
            { id: 12, image: require('../../assets/image5.png'), text: 'Spices' },
            { id: 13, image: require('../../assets/items/image5.png'), text: 'Herbal Teas' },
            { id: 14, image: require('../../assets/image5.png'), text: 'Herbal Teas' },
            { id: 15, image: require('../../assets/items/image5.png'), text: 'Herbal Teas' },
            { id: 16, image: require('../../assets/image5.png'), text: 'Herbal Teas' },
        ];

    return (
        <View>
             {/* Back Container  */}
             <Header
                title="Categories"
                rightContent={
                    <View style={{flexDirection:"row", gap: rw(4)}}>
                      <TouchableOpacity>
                         <MaterialIcons name="search" size={rf(3)} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                         <MaterialCommunityIcons  name="cart-outline" size={rf(3)} color="black" />
                      </TouchableOpacity>
                    </View>
                }
            />


             {/* Category List Container  */}
             <View style={styles.categoryListContainer}>
            {categories.map((category, index) => (
                    <Animatable.View
                    key={category.id}
                    animation="fadeInUp" // Animation type
                    duration={800} // Duration of each animation
                    delay={index * 20} // Delay based on the index
                >
                <CategoryList
                    image={category.image} // Image prop
                    text={category.text}   // Text prop
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
