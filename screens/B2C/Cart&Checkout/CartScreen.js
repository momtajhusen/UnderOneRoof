import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import UserDetails from './CartComponents/userDetails';
import CartItemsList from '../../../components/List/CartItemsList';
import PriceDetails from './CartComponents/PriceDetails';
import SimilarProducts from './CartComponents/SimilarProducts';
import Header from '../../../components/header';
import ProceedDetails from './CartComponents/ProceedDetails';
import { AppContext } from '../../../context/AppContext';
import { useViewCartData } from '../../../utility/viewCardDataUtils';
import { rw, rh } from '../../../Service/responsive';


const CartScreen = ({ navigation }) => {
    const [cartData, setCartData] = useState({});
    const [cartProduct, setCartProduct] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { isViewCartLoading, viewCartData } = useViewCartData();

    const { state, dispatch } = useContext(AppContext);
    
    // Fetch cart data function
    const fetchCartDetails = async () => {
        const result = await viewCartData();
        
        if (result.success) {
            setCartProduct(result.cartProduct);
            setCartData(result.cartData);  
        } else {
            console.error('Error fetching cart data:', result.error);
        }
    };

    useEffect(() => {
        fetchCartDetails();
      }, [state.reFresh]); 

    // onRefresh function for pull-to-refresh
    const onRefresh = async () => {
        setIsRefreshing(true);
        await fetchCartDetails();
        setIsRefreshing(false);
    };

    return (
        <View style={styles.screenContainer}>
            {/* Header */}
            <Header
                title="Your Cart"
                rightContent={
                    <View style={{ flexDirection: "row", gap: rw(4) }}>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/Search.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
                        </TouchableOpacity>
                    </View>
                }
            />

            {/* Cart Data */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: rh(10), marginTop: rh(1.5) }}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.container}>
                    <UserDetails userData={state.selectAddressData} type="selected_change" />
                </View>

                {/* Cart Items */}
                <View style={{ margin: rw(3.5), backgroundColor: "white", borderRadius: rw(5) }}>
                    <FlatList
                        data={cartProduct}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                key={item.id || Math.random().toString()}
                                animation="fadeInUp"
                                duration={800}
                                delay={index * 20}
                            >
                                <CartItemsList item={item} />
                            </Animatable.View>
                        )}
                    />
                </View>

                {/* Price Details */}
                <View style={[styles.container, { marginBottom: rh(6) }]}>
                    <PriceDetails data={state.viewCartData} style={{ backgroundColor: "green" }} />
                </View>

                {/* Similar Products */}
                <View style={[styles.similarProducts, { marginBottom: rh(6) }]}>
                    <SimilarProducts />
                </View>
            </ScrollView>

            {/* Fixed Proceed Details at the bottom */}
            <View style={styles.proceedDetails}>
                <ProceedDetails
                    onPress={()=>navigation.navigate('Checkout')}
                    data={state.viewCartData}
                    btnText="Proceed"
                />
            </View>
        </View>
    );
};

export default CartScreen;


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: rw(3),
    },
    similarProducts: {
        paddingHorizontal: rw(3),
        paddingVertical: rh(1),
        marginHorizontal: rw(3),
        borderRadius: 10,
    },
    proceedDetails: {
        position: "absolute",
        bottom: rh(0),
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
});
