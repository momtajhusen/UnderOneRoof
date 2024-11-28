//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import OrderCard from '../../../../components/List/OrderCard';
import SearchInput from '../../../../components/Search/SearchInput';
import SortbyModal from '../../../../components/Modals/SortbyModal';
import SortByBtn  from '../../../../components/Buttons/SortByBtn';


// create a component
const Orders = ({navigation}) => {

    const orders = [
        {
          status: 'Delivered',
          dateTime: '01 June, 2024 | 12:00 AM',
          totalAmount: 7485,
          products: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          ctaText: 'Get It Again',
          onCTAClick: () => alert('Reordering...'),
        },
        {
          status: 'Canceled',
          dateTime: '01 June, 2024 | 12:00 AM',
          totalAmount: 7485,
          products: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          ctaText: 'Get It Again',
          onCTAClick: () => alert('Reordering canceled item...'),
        },
        {
          status: 'On The Way',
          dateTime: '01 June, 2024 | 12:00 AM',
          totalAmount: 7485,
          products: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
          ctaText: 'Cancel',
          onCTAClick: () => alert('Cancelling order...'),
        },
    ];

      // Sort By Options 
        const options = [
            'All',
            'Last 7 Days',
            'Last 30 Days',
            'Last 1 Year',
            'Custom Date',
        ];

        // Function to toggle modal visibility
        const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };

    return (
        <View>
             <Header title="Orders" />

             <View style={styles.container}>
                <View style={{ flexDirection: "row", gap:3, width:rw(70)}}>
                    <SearchInput placeholder="Search here.." autoFocus={false} />
                    <SortByBtn onPress={toggleModal} />
                </View>

                <Text style={{marginTop:rh(1.5), marginBottom:rh(0.5),  fontWeight:"bold", fontSize:rf(2)}}>Recent Orders</Text>
            
                {orders.map((order, index) => (
                    <OrderCard onPress={()=>navigation.navigate('OrderDetails')} key={index} {...order} />
                ))}
            </View>


           {/* Sort By Modal Method Modal */}
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


