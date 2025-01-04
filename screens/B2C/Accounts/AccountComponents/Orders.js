// Import statements remain unchanged
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, BackHandler, Alert } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import OrderCard from '../../../../components/List/OrderCard';
import SearchInput from '../../../../components/Search/SearchInput';
import SortbyModal from '../../../../components/Modals/SortbyModal';
import SortByBtn from '../../../../components/Buttons/SortByBtn';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';

const Orders = ({ navigation }) => {
    const [orders, setOrders] = useState([]);  
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalVisible, setModalVisible] = useState(false); 

    const { state, dispatch } = useContext(AppContext);

    const fetchOrders = async () => {
        try {
            const response = await apiClient.get('/orderList');
            console.log(response.data);

            if (response.data.status === 1) {
                setOrders(response.data.data.order);
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
                        <View style={{ justifyContent: "center", height: rh(80) }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <OrderCard orders={orders} />
                    )}
                </ScrollView>

            </View>

            {/* Sort By Modal */}
            <SortbyModal options={options} isVisible={isModalVisible} toggleModal={toggleModal} />
        </View>
    );
};

 
export default Orders;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4),   
    },
    shortByBtn: {
        width: rw(20),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 10,
        backgroundColor: "white",
    },
});
