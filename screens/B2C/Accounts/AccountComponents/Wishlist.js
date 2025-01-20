// Import libraries
import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import ItemsList from '../../../../components/List/ItemsList';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';

// Create a component
const Wishlist = ({ navigation }) => {
    // State for loading, refreshing, and wishlist data
    const [isLoading, setIsLoading] = useState(true);
    const [wishlistProduct, setWishlistProduct] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { state, dispatch } = useContext(AppContext);

    // Fetch wishlist data from API
    const fetchWishlistData = async () => {
        try {
            const response = await apiClient.get('/viewWishlist');
            setWishlistProduct(response.data.data.wishlistProduct);
        } catch (error) {
            console.error('Error while fetching wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh handler for pull-to-refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchWishlistData();
        setIsRefreshing(false);
    };

    // Fetch wishlist data on component mount
    useEffect(() => {
        fetchWishlistData();
    }, [state.reFresh]);

    return (
        <View style={{ flex: 1 }}>
            <Header
                title="Wishlist"
                rightContent={
                    <View style={{ flexDirection: 'row', gap: rw(4) }}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="cart-outline" size={rf(3)} color="black" />
                        </TouchableOpacity>
                    </View>
                }
            />
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            >
                {/* Conditionally render wishlist data or loading message */}
                {isLoading ? (
                    <ItemsListLoader count="4" itemContainerStyle={{ width: rw(42.5) }} />
                ) : (
                    <ItemsList
                        cartbtn="true"
                        items={wishlistProduct}
                        layout="vertical"
                        listContainerStyle={{
                            width: rw(45),
                            marginLeft: rw(1),
                            marginBottom: rh(1),
                        }}
                    />
                )}
            </ScrollView>
        </View>
    );
};

// Make this component available to the app
export default Wishlist;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(2),
        paddingLeft: rw(2.5),
        paddingBottom: rh(12),
    },
});
