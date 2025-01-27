// Import libraries
import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Text,
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

            // Add "added_to_wishlist" key with value 1 to each product
            const updatedWishlist = response.data.data.wishlistProduct.map(product => ({
                ...product,
                added_to_wishlist: 1,
            }));

            setWishlistProduct(updatedWishlist);

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
    }, [state.isCartLoader]);

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
               <View style={{paddingVertical:rh(1)}}>
                  <Text style={{fontWeight:"bold"}}>{wishlistProduct.length} items added</Text>
               </View>

                {/* Conditionally render wishlist data, empty message, or loading message */}
                {isLoading ? (
                    <ItemsListLoader count="6" itemContainerStyle={{ width: rw(42.5) }} />
                ) : wishlistProduct.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="heart-off-outline" size={rf(5)} color="gray" />
                        <Text style={styles.emptyMessage}>Your Wishlist is Empty</Text>
                        <Text style={styles.subMessage}>
                            Add your favorite items here {'\n'} for easy access later.
                        </Text>
                    </View>
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:rh(90)
    },
    emptyMessage: {
        fontSize: rf(2),
        fontWeight: 'bold',
        color: 'black',
        marginTop: rh(2),
        textAlign: 'center',
    },
    subMessage: {
        fontSize: rf(2),
        color: 'gray',
        marginTop: rh(1),
        textAlign: 'center',
        paddingHorizontal: rw(5),
    },
});
