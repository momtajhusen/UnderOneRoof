// Import necessary libraries
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';

// Create a reusable CartItemsList component
const CartItemsList = ({ itemImage, itemName, itemWeight, itemPrice, itemMRP, itemQuantity, onIncrease, onDecrease, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: itemImage }} style={styles.image} />
            <View style={styles.details}>
                <View style={{flexDirection:"row", justifyContent:"between", width:rw(65)}}>
                    <Text style={styles.itemName} numberOfLines={1}>{itemName}</Text>
                    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                        <MaterialIcons style={styles.removeIcon} name="delete-outline" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemWeight}>{itemWeight}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>₹{itemPrice}</Text>
                    <Text style={styles.itemMRP}>MRP <Text style={styles.itemMrpPrice}>₹{itemMRP}</Text></Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={onDecrease} style={styles.button}>
                <MaterialIcons style={styles.removeIcon} name="remove" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{itemQuantity}</Text>
                <TouchableOpacity onPress={onIncrease} style={styles.button}>
                    <MaterialIcons style={styles.removeIcon} name="add" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 10,
        borderRadius:rw(5),
        borderWidth:5,
        borderColor:"white",
    },
    image: {
        width: rh(8),
        height: rh(9.5),
        borderRadius: 10,
        borderWidth:1,
        borderColor:"#ddd",
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"#272727",
    },
    itemWeight: {
        fontSize: 14,
        color: '#555',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemMRP: {
        fontSize: 14,
        color: '#888',
        marginLeft: 5,
    },
    itemMrpPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:rh(4),
        backgroundColor:"#E9E9E9",
        padding:rw(1.5),
        borderRadius:10
    },
    button: {
        width: rw(8.5),
        height: rh(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
        backgroundColor:"white",
    },
    buttonText: {
        fontSize: 18,
        color: '#333',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight:"bold",
    },
    removeButton: {
        marginLeft: rw(8),
        position:"absolute",
        right:rw(1),
        top:rh(-1),
    },
    removeIcon: {
        fontSize: rf(3),
        color: '#888',
    },
});

// Make the component available to the app
export default CartItemsList;
