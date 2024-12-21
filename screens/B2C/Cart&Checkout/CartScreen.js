import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import * as Animatable from 'react-native-animatable';
import UserDetails from './CartComponents/userDetails';
import CartItemsList from '../../../components/List/CartItemsList';
import PriceDetails from './CartComponents/PriceDetails';
import SimilarProducts from './CartComponents/SimilarProducts';
import Header from '../../../components/header';
import ProceedDetails from './CartComponents/ProceedDetails';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../Service/apiClient';


const cartItemsData = [
    // Sample cart data
    {
        id: '1',
        itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
        itemName: 'Premium Roasted Almonds',
        itemWeight: '250g',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 1,
    },
    {
        id: '2',
        itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
        itemName: 'Premium Roasted Almonds Roasted Almonds Roasted Almonds',
        itemWeight: '250g x 2',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 2,
    },
    {
        id: '3',
        itemImage: 'https://www.jiomart.com/images/product/original/rv7xhpoeoi/farmfave-cold-pressed-groundnut-oil-5-litre-wood-pressed-100-natural-peanut-oil-for-cooking-product-images-orv7xhpoeoi-p592184502-0-202206232308.png?im=Resize=(420,420)',
        itemName: 'Premium Roasted Almonds',
        itemWeight: '250g x 2',
        itemPrice: 299,
        itemMRP: 350,
        itemQuantity: 2,
    },
];



const CartScreen = ({ navigation }) => {
    
    const handleIncrease = (id) => {
        console.log(`Increase quantity for item ${id}`);
    };

    const handleDecrease = (id) => {
        console.log(`Decrease quantity for item ${id}`);
    };

    const handleRemove = (id) => {
        console.log(`Remove item ${id}`);
    };

    // Fetch product data from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/viewCart');  
                const cartProduct = response.data.data.cartProduct;  // cartProduct ko access karna
                console.log(cartProduct);  // cartProduct ka data console me dekho
                // Ab tum cartProduct ko state me store ya kisi aur kaam me use kar sakte ho
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <View style={styles.screenContainer}>
            {/* Header */}
            <Header
                title="Your Cart"
                rightContent={
                    <View style={{ flexDirection: "row", gap: rw(4) }}>
                        <TouchableOpacity>
                            {/* <MaterialIcons name="search" size={rf(3)} color="black" /> */}
                           <Image source={require('../../../assets/Search.png')} style={{width:rw(5.5), height:rw(5.5)}} />
                        </TouchableOpacity>
                    </View>
                }
            />

            <ScrollView contentContainerStyle={{ paddingBottom: rh(10), marginTop:rh(1.5) }}>
                <View style={styles.container}>
                    <UserDetails type="show" />
                </View>

                {/* Cart Items */}
                <View style={{ margin: rw(3.5), backgroundColor: "white", borderRadius: rw(5) }}>
                    <FlatList
                        data={cartItemsData}
                        vertical={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                key={item.id}
                                animation="fadeInUp"
                                duration={800}
                                delay={index * 20}
                            >
                                <CartItemsList
                                    itemImage={item.itemImage}
                                    itemName={item.itemName}
                                    itemWeight={item.itemWeight}
                                    itemPrice={item.itemPrice}
                                    itemMRP={item.itemMRP}
                                    itemQuantity={item.itemQuantity}
                                    onIncrease={() => handleIncrease(item.id)}
                                    onDecrease={() => handleDecrease(item.id)}
                                    onRemove={() => handleRemove(item.id)}
                                />
                            </Animatable.View>
                        )}
                    />
                </View>

                {/* Price Details */}
                <View style={[styles.container, { marginBottom: rh(6) }]}>
                    <PriceDetails style={{backgroundColor:"green"}} />
                </View>

                {/* Similar Products */}
                <View style={[styles.similarProducts, { marginBottom: rh(6) }]}>
                    <SimilarProducts />
                </View>
            </ScrollView>

            {/* Fixed Proceed Details at the bottom */}
            <View style={styles.proceedDetails}>
                <ProceedDetails btnText="Proceed" onPress={()=>navigation.navigate('Checkout')} />
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
        backgroundColor: "white",
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
