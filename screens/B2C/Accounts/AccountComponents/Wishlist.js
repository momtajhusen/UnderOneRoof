// Import libraries
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import WishlistCard from '../../../../components/List/WishlistCard';
import ItemsList from '../../../../components/List/ItemsList';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';

// Create a component
const Wishlist = ({ navigation }) => {
    // State for loading and wishlist data
    const [isLoading, setIsLoading] = useState(true);
    const [wishlistProduct, setWishlistProduct] = useState([]);

        const {state, dispatch } = useContext(AppContext);
    

    // Fetch wishlist data from API
    const wishlistData = async () => {
        try {
            const response = await apiClient.get('/viewWishlist');
            setWishlistProduct(response.data.data.wishlistProduct);
        } catch (error) {
            console.error('Error while fetching wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch wishlist data on component mount
    useEffect(() => {
        wishlistData();
    }, [state.reFresh]);

    return (
        <View>
            <Header 
                title="Wishlist" 
                rightContent={
                    <View style={{ flexDirection: "row", gap: rw(4) }}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="cart-outline" size={rf(3)} color="black" />
                        </TouchableOpacity>
                    </View>
                } 
            />
            <View style={styles.container}>
                {/* Conditionally render wishlist data or loading message */}
                {isLoading ? (
                    <ItemsListLoader count="4" itemContainerStyle={{width:rw(42.5)}} />
                ) : (
                    <ItemsList cartbtn="true" items={wishlistProduct} layout="vertical" listContainerStyle={{width:rw(45), marginLeft:rw(1), marginBottom:rh(1)}}/>
                )}
            </View>
        </View>
    );
};

// Make this component available to the app
export default Wishlist;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(2),
        paddingLeft:rw(2.5),
        paddingBottom:rh(12)
    },
});
