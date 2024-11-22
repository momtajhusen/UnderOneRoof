//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../Service/responsive';
import OrderOrWishlist from './AccountComponents/OrderOrWishlist';
import AccountMenuList from './AccountComponents/AccountMenuList';

// create a component
const AccountScreen = () => {
    return (
        <View>
            {/* Back Container */}
            <View style={styles.backHeader}>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={rf(4)} style={{ fontSize: rf(3) }} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: rw(2), fontSize: rw(4), fontWeight: 'bold' }}></Text>
                </View>
                <TouchableOpacity>
                  {/* <MaterialIcons name="search" size={rf(4)} style={{ fontSize: rf(3) }} /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {/* Account Profile  */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{marginRight:rw(3)}}>
                        <Image source={require('../../assets/user.png')} style={{width:rw(15), height:rh(7)}} />
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold", fontSize:rf(2.5), marginBottom:rh(0.3)}}>Aman Kumar</Text>
                        <Text style={{fontSize:rf(2), color:"#717171"}}>+91-732899374</Text>
                    </View>
                </View>
                {/* Order Or Wishlist */}
                <View>
                    <OrderOrWishlist />
                </View>
                {/* Account Menu List */}
                <View>
                    <AccountMenuList />
                     <Text style={{textAlign:"center", marginTop:rh(3), fontSize:rf(2), color:"#717171"}}>V5.54</Text>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default AccountScreen;

const styles = StyleSheet.create({
    backHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: rw(4),
        paddingTop: rh(4),
        paddingBottom:rh(2),
        justifyContent:"space-between",
        marginRight:rw(5),
    },
    container: {
        paddingHorizontal: rw(4),   
    },
});