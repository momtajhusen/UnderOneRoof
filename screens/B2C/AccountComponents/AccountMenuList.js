//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import IconBtnList from '../../../components/List/IconBtnList';
import { useNavigation } from '@react-navigation/native';

// create a component
const AccountMenuList = () => {

  const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{fontSize:rw(4.5), fontWeight:"bold", marginLeft:rw(3)}}>Other Information</Text>
            <View style={{paddingVertical:rh(1)}}>
                <IconBtnList icon="person-outline" text="Your Profile" />
                <IconBtnList icon="fmd-good" onPress={() => navigation.navigate('AddressBook')} text="Address Book" />
                <IconBtnList icon="help-outline" text="Help & Support" />
                <IconBtnList icon="receipt-long" text="Terms & Conditions" />
                <IconBtnList icon="privacy-tip" text="Privacy Policy" />
                <IconBtnList icon="person-remove" text="Delete Account" />
                <IconBtnList icon="logout" text="Logout" />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:rw(1),
        paddingVertical:rh(1),
        backgroundColor: '#FFFFFF',
        borderRadius:10,
        marginTop:rh(1.5)
    },
});

//make this component available to the app
export default AccountMenuList;
