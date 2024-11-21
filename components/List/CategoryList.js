//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

// create a reusable component
const CategoryItem = ({ image, text }) => {
    return (
        <TouchableOpacity style={styles.listContainer}>
            <View style={styles.ImageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
            </View>
            <View style={{paddingVertical:rh(1), paddingHorizontal:rh(1)}}>
               <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default CategoryItem;

const styles = StyleSheet.create({
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width:rw(21.5),
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: rw(3),
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginRight:rw(2),
        marginBottom:rh(1),
    },
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(17),
        height: rh(10),
        backgroundColor: '#FFF4E6',
        overflow: 'hidden',
        borderRadius:10,
        marginTop:rh(0.5),
    },
    image: {
        width: rw(15),
        height: rw(15),
    },
    text: {
        fontWeight: 'bold',
        fontSize: rf(1.7),
        marginTop: rh(0.5),
        color: '#333333',
        textAlign: 'center',
    },
});
