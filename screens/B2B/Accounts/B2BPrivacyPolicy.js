//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';

// create a component
const B2BPrivacyPolicy = ({navigation}) => {
    return (
        <View>
             <Header title="Privacy Policy" />
            <View style={styles.container}>
                <View>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                        At UnderOneRoof, your privacy is our top priority. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our app. By accessing or using the UnderOneRoof App, you consent to the practices described in this policy.
                    </Text>
                </View>

                <View style={{marginTop:rh(3)}}>
                    <Text style={{color:"#272727"}}>Information We Collect</Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                    We may collect the following types of information when you use our app:
                    Personal Information: This includes your name, email address, phone number, and any other information you provide when creating an account.
                    Usage Data: We gather information about how you interact with the app, such as your device type, operating system, IP address, and app usage patterns.
                    Location Data: With your permission, we may collect location data to enhance your experience by providing location-based features and services.
                    </Text>
                </View>

                <View style={{marginTop:rh(3)}}>
                    <Text style={{color:"#272727"}}>How We Use Your Information</Text>
                    <Text style={{marginTop:rh(1), color:"#717171", fontSize:rf(1.8)}}>
                    The information we collect is used to:
                    Provide and improve our services.
                    Customize your app experience.
                    Communicate with you about updates, promotions, and support.
                    Monitor app performance and identify potential issues.
                    Ensure compliance with legal obligations and protect against unauthorized use.
                    </Text>
                </View>

            </View>
        </View>
    );
};

//make this component available to the app
export default B2BPrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(4),   
    },
});