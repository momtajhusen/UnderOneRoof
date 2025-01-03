//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import OrderCard from '../../../../components/List/OrderCard';
import SearchInput from '../../../../components/Search/SearchInput';
import SortbyModal from '../../../../components/Modals/SortbyModal';
import SortByBtn from '../../../../components/Buttons/SortByBtn';
import apiClient from '../../../../Service/apiClient';

// create a component
const Orders = ({ navigation }) => {
    const [orders, setOrders] = useState([]); // Orders state
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state

    // API se data fetch karne ka function
    const fetchOrders = async () => {
        try {
            const response = await apiClient.get('/orderList');

            console.log(response.data);
            if (response.data.status === 1) {
                const fetchedOrders = response.data.data.order.map(order => ({
                    status: order.order_status,
                    dateTime: `${order.order_date} | ${order.order_time}`,
                    totalAmount: order.grand_total,
                    products: order.image,
                    ctaText: order.order_status === 'Delivered' ? 'Get It Again' : 'Cancel',
                    onCTAClick: () => {
                        alert(order.order_status === 'Delivered' 
                            ? 'Reordering...' 
                            : 'Cancelling order...');
                    },
                }));
                setOrders(fetchedOrders);
            } else {
                alert('Failed to fetch orders.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Something went wrong while fetching orders.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Toggle modal visibility
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const options = [
        'All',
        'Last 7 Days',
        'Last 30 Days',
        'Last 1 Year',
        'Custom Date',
    ];

    return (
        <View>
            <Header title="Orders" />

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', gap: 3, width: rw(70) }}>
                    <SearchInput placeholder="Search here.." autoFocus={false} />
                    <SortByBtn onPress={toggleModal} />
                </View>

                <Text style={{ marginTop: rh(1.5), marginBottom: rh(0.5), fontWeight: 'bold', fontSize: rf(2) }}>
                    Recent Orders
                </Text>

                <ScrollView>


                {isLoading ? (
                    <View style={{justifyContent:"center", height:rh(80)}}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : orders.length === 0 ? (
                    <View style={{justifyContent:"center", height:rh(80)}}>
                        <Text style={{textAlign: 'center', marginTop: rh(2), fontSize: rf(2) }}>
                            No Orders Found
                        </Text>
                    </View>
                ) : (
                    orders.map((order, index) => (
                        <OrderCard
                            onPress={() => navigation.navigate('OrderDetails')}
                            key={index}
                            {...order}
                        />
                    ))
                )}
                </ScrollView>

            </View>

            {/* Sort By Modal */}
            <SortbyModal options={options} isVisible={isModalVisible} toggleModal={toggleModal} />
        </View>
    );
};

//make this component available to the app
export default Orders;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4),   
    },
    shortByBtn:{
        width:rw(20),
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#DFDFDF",
        borderRadius:10,
        backgroundColor:"white",

    }
});


