import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import { useRemoveFromCart } from '../../utility/deleteCartProductUtils';
import { useQtyUpdate } from '../../utility/QtyUpdateUtils';
import { AppContext } from '../../context/AppContext';

const CartItemsList = ({ item, deleteIconStyle }) => {

    const { pid, itemimage, name, unit, measurement, selling_price, mrp_price, moq, qty, var_id } = item;
    const [itemQuantity, setItemQuantity] = useState(qty);
    const [isUpdatingQty, setIsUpdatingQty] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { state } = useContext(AppContext);
    const {isCartDeleteLoading, removeFromCart } = useRemoveFromCart();
    const { qtyUpdate } = useQtyUpdate();

    const handleIncrease = async () => {
        setIsUpdatingQty(true);
        const newQty = itemQuantity + 1;
        await qtyUpdate(pid, newQty, var_id, moq);
        setItemQuantity(newQty);
        setIsUpdatingQty(false);
    };

    const handleDecrease = async () => {
        const minimumQty = moq != null ? moq : 1;
      
        if (itemQuantity > minimumQty) {
          setIsUpdatingQty(true);
          const newQty = itemQuantity - 1;
          await qtyUpdate(pid, newQty, var_id, moq);
          setItemQuantity(newQty);
          setIsUpdatingQty(false);
        }
      };
      

    const onRemove = async () => {
        await removeFromCart(pid, var_id);
    };

    return (
        <View style={styles.container}>
            <Image
                source={itemimage ? { uri: itemimage } : require('../../assets/location-tick.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
                    <TouchableOpacity onPress={onRemove} style={[styles.removeButton, deleteIconStyle]}>
                        {isCartDeleteLoading ? (
                            <ActivityIndicator size="small" color="#888" />
                        ) : (
                            <Image
                                source={require('../../assets/trash.png')}
                                style={{ width: rw(5), height: rw(5) }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemWeight}>{unit}{measurement} × {qty}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>
                        ₹{item.moq_price != null ? item.moq_price : item.selling_price}
                    </Text>
                    <Text style={styles.itemMRP}>
                        MRP <Text style={styles.itemMrpPrice}>₹{mrp_price}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecrease} style={styles.button} disabled={isUpdatingQty}>
                    <MaterialIcons style={styles.removeIcon} name="remove" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{itemQuantity}</Text>
                <TouchableOpacity onPress={handleIncrease} style={styles.button} disabled={isUpdatingQty}>
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
        padding: rw(3),
        paddingHorizontal: rw(2),
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
        padding: rw(1),
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
    addToCartButton: {
        marginTop: rh(2),
        backgroundColor: '#1E90FF',
        paddingVertical: rh(1),
        paddingHorizontal: rw(3),
        borderRadius: rw(2),
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: rf(2),
    },
});

export default CartItemsList;
