//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { useNavigation } from '@react-navigation/native';

// create a reusable component
const CategoryItem = ({ id, image, text }) => {

  const navigation = useNavigation();

    return (
        <TouchableOpacity  onPress={() => navigation.navigate('ProductListing', { selectCategoryId: id, selectCategoryName: text })} style={styles.listContainer}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.textContainer}>
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
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: rw(3),
        marginRight: rw(2),
        marginBottom: rh(1.8),
        borderWidth:2,
        borderColor:"white",
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(20),
        height: rh(8),
        backgroundColor: '#FFF4E6', // Light background color for image container
        overflow: 'hidden',
        borderRadius: rw(2),
    },
    image: {
        width: rw(22),
        height: rw(17),
    },
    textContainer: {
        paddingHorizontal: rw(1),
        alignItems: 'center',
        justifyContent:"center",
        height:rh(5.5),
    },
    text: {
        fontWeight: '600',
        fontSize: rf(1.8),
        width:rw(12),
        color: '#555555', // Slightly lighter text color as per the design
        textAlign: 'center',
    },
});