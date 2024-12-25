//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import UserDetails from './userDetails';
import Header from '../../../../components/header';
import apiClient from '../../../../Service/apiClient';


// create a component
const AddressBook = ({navigation}) => {

    

    const [addressData, setAddressData] = useState([]);

    // Fetch product data from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/viewaddress');  
                setAddressData(response.data);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };
        fetchCategories();
    }, []);
    
    return (
        <View>
            {/* Back Container */}
            <Header
              title="Address Book"
            />
 
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>navigation.navigate('EditAddress')} style={styles.addaddressbtn}>
                    <MaterialIcons name="add" size={rf(4)} style={{ fontSize: rf(3), color:"#FF3131" }} />
                    <Text style={{color:"#FF3131", fontWeight:"bold", marginLeft:rw(1)}}>Add Address</Text>
                </TouchableOpacity>
                <View style={{ gap: rh(1) }}>
                    {addressData && addressData.length > 0 ? (
                        addressData.map((address, index) => (
                            <UserDetails
                                key={index} // Unique key for each item
                                name={address.name} // Replace 'name' with the actual field
                                address={address.address} // Replace 'address' with the actual field
                                phone={address.phone} // Replace 'phone' with the actual field
                            />
                        ))
                    ) : (
                        <View style={{justifyContent:"center", alignItems:"center", height:rh(85), width:rw(93)}}>
                            <Text style={{textAlign:"center"}}>No addresses found</Text>
                        </View>
                    )}
                </View>

            </View>
        </View>
    );
};

//make this component available to the app
export default AddressBook;

const styles = StyleSheet.create({
    backHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: rh(4),
        paddingBottom:rh(2),
        paddingLeft:rw(3),
        justifyContent:"space-between",
        marginRight:rw(5),
    },
    container: {
        paddingHorizontal: rw(4),
        paddingVertical:rh(2),   
    },
    addaddressbtn:{
     alignItems:"center",
     flexDirection:"row",
     borderWidth:1,
     borderColor:"#FF3131",
     backgroundColor:"#FFEAEA",
     paddingLeft:rw(2),
     paddingVertical:rh(1),
     borderRadius:10,
     marginBottom:rh(1)
    }
});