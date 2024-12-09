//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import OrderOrWishlist from '../../B2C/Accounts/AccountComponents/OrderOrWishlist';
import B2BAccountMenuList from './ComponentSections/B2BAccountMenuList';
import Header from '../../../components/header';

// create a component
const B2BAccountScreen = ({navigation}) => {
    return (
        <View>
            {/* Back Container */}
             <Header />
            <View style={styles.container}>
                {/* Account Profile  */}
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={{marginRight:rw(3)}}>
                        <Image source={require('../../../assets/user.png')} style={{width:rw(15), height:rw(15)}} />
                    </View>
                    <View>
                        <Text style={{fontWeight:"bold", fontSize:rf(2.5), marginBottom:rh(0.3)}}>Aman Kumar</Text>
                        <Text style={{fontSize:rf(2), color:"#717171"}}>+91-732899374</Text>
                    </View>
                </View>
 
                {/* Account Menu List */}
                <View>
                    <B2BAccountMenuList />
                     <Text style={{textAlign:"center", marginTop:rh(3), fontSize:rf(2), color:"#717171"}}>V5.54</Text>
                </View>

            </View>
        </View>
    );
};

//make this component available to the app
export default B2BAccountScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4), 
        marginTop:rh(1)
    },
});