import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native';
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
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isScreenLoaded, setIsScreenLoaded] = useState(false);

    const { state, dispatch } = useContext(AppContext);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const response = await apiClient.get('/orderList');
            if (response.data.status === 1) {
                setOrders(response.data.data.order);
                setFilteredOrders(response.data.data.order);
            } else {
                Alert.alert('Error', 'Failed to fetch orders.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            Alert.alert('Error', 'Something went wrong while fetching orders.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    // Trigger API call only after screen has fully loaded
    useEffect(() => {
        if (isScreenLoaded) {
            fetchOrders();
            dispatch({
                type: 'SET_PRODUCT_FILTER',
                payload: {
                    productFilter: null,
                },
            });
        }
    }, [isScreenLoaded]);

    // Set `isScreenLoaded` to true after initial render
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScreenLoaded(true);
        }, 0); // Ensure slight delay for screen rendering
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isScreenLoaded) {
            fetchOrders();
        }
    }, [state.isOrderRefresh]);

    const filterByDateRange = (filter, orders) => {
        const today = new Date();
        let startDate;

        switch (filter) {
            case 'Last 7 Days':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                break;
            case 'Last 30 Days':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 30);
                break;
            case 'Last 1 Year':
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            case 'All':
            default:
                return orders; // No date filtering
        }

        return orders.filter(order => {
            const orderDate = new Date(order.order_date);
            return orderDate >= startDate && orderDate <= today;
        });
    };

    useEffect(() => {
        let filtered = orders;

        if (state.productFilter !== 'All') {
            filtered = filterByDateRange(state.productFilter, filtered);
        }

        if (searchQuery !== '') {
            filtered = filtered.filter(order =>
                order.product_name.some(product =>
                    product.toLowerCase().includes(searchQuery.toLowerCase())
                ) || order.order_id.toString().includes(searchQuery)
            );
        }

        setFilteredOrders(filtered);
    }, [searchQuery, state.productFilter, orders]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchOrders();
    };

    const options = ['All', 'Last 7 Days', 'Last 30 Days', 'Last 1 Year'];

    return (
        <View>
            <Header title="Orders" />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', gap: 3, width: rw(71) }}>
                    <SearchInput
                        placeholder="Search here.."
                        autoFocus={false}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                    <SortByBtn onPress={toggleModal} />
                </View>

                <Text style={{ marginTop: rh(1.5), marginBottom: rh(0.5), fontWeight: 'bold', fontSize: rf(2) }}>
                    Recent Orders
                </Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            colors={['#0000ff']}
                        />
                    }
                >
                    {isLoading ? (
                        <View style={{ justifyContent: 'center', height: rh(80) }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <OrderCard orders={filteredOrders} />
                    )}
                </ScrollView>
            </View>

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 10,
        backgroundColor: 'white',
    },
});
