//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../../components/Inputs/CustomInput';
import CustomButtons from '../../components/Buttons/CustomButtons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { rw, rh, rf } from '../../Service/responsive';


// create a component
const SignupOrLogin = ({navigation}) => {
    return (
        <>
        <ScrollView>
          <LinearGradient
            colors={['#FF6D6D', '#FFFFFF', '#FF6D6D']}  // Add white in the middle
            locations={[0, 0.5, 1]}                      // Position white in the center
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.backContainer}
          >
            <View style={[styles.imageContainer]}>
              <Text style={{fontSize:rf(3), fontWeight:"bold", color:"white", position:"absolute", top:rh(3)}}>Under One Roof</Text>
              <Animatable.Image
                animation="fadeInUp"
                source={require('../../assets/auth/image34.png')}
                style={{width:rh(40), height:rh(40)}}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>

            <View style={styles.signuContainer}>
                <View>
                    <Text style={{fontWeight:"bold", fontSize:rf(2.5), color:"#272727"}}>Sign Up or Login</Text>
                    <Text style={{marginTop:rh(1), color:"#717171"}}>Enter your mobile number to continue shopping</Text>
                </View>
                <View style={{marginTop:rh(2)}}>
                  <CustomInput 
                    placeholder="Enter Phone Number"
                  />
               </View>
               <View style={{marginTop:rh(2)}}>
                  <CustomButtons 
                    title="Get OTP"
                    onPress={()=> navigation.navigate('VerifyOtp')}
                  />
              <View style={{justifyContent:"center", flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                   <Text>By logging into this app, you agree to our  
                   <Text style={{ color: "#4C4CDB", fontWeight:"bold" }}> Terms of Service</Text>  and
                   <Text style={{ color: "#4C4CDB", fontWeight:"bold" }}> Privacy Policy.</Text>
                </Text>
              </View>

               </View>
            </View>
        </ScrollView>
        </>
    );
};

//make this component available to the app
export default SignupOrLogin;

const styles = StyleSheet.create({
    backContainer: {
      height:rh(100),
      position:"relative",
    },
    imageContainer:{
      alignItems:"center",
      justifyContent:"end",
      height:rh(30),
      marginTop:rh(6.1),
    },
    signuContainer: {
        backgroundColor:"#F3F3F3",
        height:rh(70),
        width:rw(100),
        position:"absolute",
        bottom:0,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        padding:rw(5),
    },
  });
