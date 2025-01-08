//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { useNavigation } from '@react-navigation/native';

// create a reusable component
const CategoryItem = ({ id, cimage, text, onPress, loading }) => {

  const navigation = useNavigation();

    return (
        <TouchableOpacity  onPress={onPress} style={styles.listContainer}>
            <View style={styles.imageContainer}>
            <Image 
                source={{ uri: cimage ? cimage : 'https://via.placeholder.com/150' }} 
                style={styles.image} 
                resizeMode="cover"
            />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={2}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryItem;

const styles = StyleSheet.create({
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: rw(3),
        marginHorizontal: rw(1),
        marginBottom: rh(1.8),
        borderWidth:rw(0.5),
        borderColor:"white",
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(20),
        height: rh(8),
        backgroundColor: '#FFF4E6',
        overflow: 'hidden',
        borderRadius: rw(2),
    },
    image: {
        width: rw(20),
        height: rw(17),
    },
    textContainer: {
        alignItems: 'center',
        justifyContent:"center",
        height:rh(4.6),
        width:"100%",
    },
    text: {
        fontWeight: '600',
        fontSize: rf(1.6),
        width: rw(18),
        color: '#555555',
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden',
        textTransform: 'none',
        whiteSpace: 'nowrap',
    },
    
});