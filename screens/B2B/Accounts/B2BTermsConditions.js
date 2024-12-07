//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';


// create a component
const B2BTermsConditions = ({navigation}) => {
    return (
        <View>
             <Header title="Terms & Conditions" />
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight:"bold", color:"#272727"}}>Effective Date: 12/12/2024</Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                       Welcome to the UnderOneRoof App! By using this app, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before accessing or using our services. If you do not agree with these terms, you may not use the app.
                    </Text>
                </View>

                <View style={{marginTop:rh(3)}}>
                    <Text style={{color:"#272727"}}>Eligibility</Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                        You must be at least 18 years of age to use this app. By agreeing to these terms, you confirm that you are legally capable of entering into binding agreements and meet all eligibility requirements.
                    </Text>
                </View>

                <View style={{marginTop:rh(3)}}>
                    <Text style={{color:"#272727"}}>Account Creation and Security </Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                    To access certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your login information and are fully responsible for all activities that occur under your account. If you suspect unauthorized use of your account, please notify us immediately.
                    </Text>
                </View>

                <View style={{marginTop:rh(3)}}>
                    <Text style={{color:"#272727"}}>Use of the App</Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                       UnderOneRoof App is designed to provide users with convenient access to various services and offers. You agree to use the app solely for its intended purposes and in compliance with applicable laws. Misuse of the app, such as attempting to gain unauthorized access or disrupting its functionality, is strictly prohibited.
                    </Text>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default B2BTermsConditions;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4),   
    },
});