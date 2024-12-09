import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';

const CartItemsList = ({
    itemImage,
    itemName,
    itemWeight,
    itemPrice,
    itemMRP,
    initialQuantity, // Initial quantity as a prop
    onRemove,
    deleteIconStyle,
}) => {
    const [itemQuantity, setItemQuantity] = useState(initialQuantity || 1); // State to track item quantity

    const handleIncrease = () => {
        setItemQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (itemQuantity > 1) {
            setItemQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={itemImage ? { uri: itemImage } : require('../../assets/location-tick.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Text style={styles.itemName} numberOfLines={1}>
                        {itemName}
                    </Text>
                    <TouchableOpacity onPress={onRemove} style={[styles.removeButton, deleteIconStyle]}>
                        <Image
                            source={require('../../assets/trash.png')}
                            style={{ width: rw(5), height: rw(5) }}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemWeight}>{itemWeight}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>₹{itemPrice}</Text>
                    <Text style={styles.itemMRP}>
                        MRP <Text style={styles.itemMrpPrice}>₹{itemMRP}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecrease} style={styles.button}>
                    <MaterialIcons style={styles.removeIcon} name="remove" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{itemQuantity}</Text>
                <TouchableOpacity onPress={handleIncrease} style={styles.button}>
                    <MaterialIcons style={styles.removeIcon} name="add" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: rw(4),
        borderRadius: rw(5),
        borderWidth: 4,
        borderColor: 'white',
    },
    image: {
        width: rw(18),
        height: rh(9),
        borderRadius: rw(3),
        borderWidth: 1,
        borderColor: '#ddd',
    },
    details: {
        flex: 1,
        marginLeft: rw(3),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: rw(65),
    },
    itemName: {
        fontSize: rf(2),
        fontWeight: 'bold',
        color: '#272727',
    },
    itemWeight: {
        fontSize: rf(1.8),
        color: '#555',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: rh(1),
    },
    itemPrice: {
        fontSize: rf(2),
        fontWeight: 'bold',
        color: '#333',
    },
    itemMRP: {
        fontSize: rf(1.8),
        color: '#888',
        marginLeft: rw(2),
    },
    itemMrpPrice: {
        textDecorationLine: 'line-through',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: rh(3),
        backgroundColor: '#E9E9E9',
        borderRadius: rw(2),
        padding:rw(1),
    },
    button: {
        width: rw(8.5),
        height: rh(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: rw(2),
    },
    quantityText: {
        fontSize: rf(2),
        marginHorizontal: rw(2),
        fontWeight: 'bold',
    },
    removeButton: {
        position: 'absolute',
        right: "2%",
        bottom: "40%",
    },
    removeIcon: {
        fontSize: rf(2.5),
        color: '#888',
    },
});

export default CartItemsList;
