//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import CustomInput from '../../../components/Inputs/CustomInput';
import CustomButtons from '../../../components/Buttons/CustomButtons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { rw, rh, rf } from '../../../Service/responsive';
import { useFocusEffect } from "@react-navigation/native";
import apiClient from '../../../Service/apiClient';  

const SignupOrLogin = ({ navigation }) => {
  const [mobile, setMobile] = useState("");  
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#FF6D6D");
  });

  // Function to validate mobile number
  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/; 
    return mobileRegex.test(mobile);
  };

  // Function to handle API call
  const handleSignupLogin = async () => {
    // if (!mobile) {
    //   setErrorMessage("Mobile number is required");
    //   return;
    // }

    if (!validateMobile(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setErrorMessage(""); 
    setLoading(true); 

    try {
      const response = await apiClient.post('/signupLogin', { mobile }); 
      const { status, msg, data, userid } = response.data;

      if (status === 1) {
        // Navigate if success
        navigation.navigate('VerifyOtp', { mobile: data.mobile, userid });
      } else {
        setErrorMessage(msg || "Something went wrong. Please try again.");  
      }
    } catch (error) {
      console.error("API Error: ", error);  // Log error for debugging
      setErrorMessage("Failed to connect to the server. Please try again later."); 
    } finally {
      setLoading(false);  
    }
  };

  return (
    <>
      <ScrollView>
        <LinearGradient
          colors={['#FF6D6D', '#FFFFFF', '#FF6D6D']}  
          locations={[0, 0.5, 1]} 
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.backContainer}
        >
          <View style={[styles.imageContainer, {position:"relative"}]}>
            <Text style={{ fontSize: rf(3), fontWeight: "bold", color: "white", position: "absolute", top: rh(3) }}>Under One Roof</Text>
            <Animatable.Image
              animation="fadeInUp"
              source={require('../../../assets/auth/image34.png')}
              style={{ width: rh(40), height: rh(40), position:"absolute", bottom:rh(-10)}}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={styles.signuContainer}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: rf(2.5), color: "#272727" }}>Sign Up or Login</Text>
            <Text style={{ marginTop: rh(1), color: "#717171" }}>Enter your mobile number to continue shopping</Text>
          </View>
          <View style={{ marginTop: rh(2) }}>
            <CustomInput
              placeholder="Enter Phone Number"
              value={mobile}
              onChangeText={(text) => setMobile(text)}  
              keyboardType="phone-pad" 
              maxLength={10} 
              errorMessage={errorMessage}  
            />
          </View>
          <View style={{ marginTop: rh(2) }}>
            <CustomButtons
              title={loading ? "Please wait..." : "Get OTP"}
              onPress={handleSignupLogin}
              disabled={loading}  
              loading={loading}
            />
            <View style={{ justifyContent: "center", flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginTop: rh(1) }}>
              <Text>By logging into this app, you agree to our
                <Text style={{ color: "#4C4CDB", fontWeight: "bold" }}> Terms of Service</Text> and
                <Text style={{ color: "#4C4CDB", fontWeight: "bold" }}> Privacy Policy.</Text>
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
    height: rh(100),
    position: "relative",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: rh(30),
    marginTop: rh(6.1),
  },
  signuContainer: {
    backgroundColor: "#F3F3F3",
    height: rh(70),
    width: rw(100),
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: rw(5),
  },
});
