//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import OrderOrWishlist from './AccountComponents/OrderOrWishlist';
import AccountMenuList from './AccountComponents/AccountMenuList';
import Header from '../../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../context/AppContext';
import apiClient from '../../../Service/apiClient';

// create a component
const AccountScreen = ({navigation}) => {
      const { state } = useContext(AppContext);

      const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const userId = await AsyncStorage.getItem('userId');
                const ShoppingMode = await AsyncStorage.getItem('ShoppingMode');

                console.log("User Token");
                console.log(token);

            } catch (error) {
                console.error("Error reading token:", error);
            }
        };
        checkAuthToken();
    }, [navigation]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiClient.get('/viewprofile');
            console.log(response.data);
            setProfileData(response.data.data.viewProfile);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [state.reFresh]);

    return (
        <View>
            {/* Back Container */}
             <Header />
             <ScrollView>
            <View style={styles.container}>
                {/* Account Profile  */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{marginRight:rw(3)}}>
                        <Image 
                            source={
                                profileData?.avatar
                                    ? { uri:  profileData.avatar }
                                    : require('../../../assets/account/user.png')
                            }
                          style={{width:rw(15), height:rw(15)}} 
                        />
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold", fontSize:rf(2.5), marginBottom:rh(0.3)}}>{profileData?.name || 'N/A'}</Text>
                        <Text style={{fontSize:rf(2), color:"#717171"}}>{profileData?.mobile || 'N/A'}</Text>
                    </View>
                </View>
                {/* Order Or Wishlist */}
                <View>
                    <OrderOrWishlist onPressOrder={()=>navigation.navigate('Orders')} onPressWishlist={()=>navigation.navigate('Wishlist')} />
                </View>
                {/* Account Menu List */}
                <View>
                     <AccountMenuList />
                     <Text style={{textAlign:"center", marginTop:rh(3), fontSize:rf(2), color:"#717171"}}>V5.54</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    );
};

//make this component available to the app
export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4),   
        marginTop:rh(1)
    },
});