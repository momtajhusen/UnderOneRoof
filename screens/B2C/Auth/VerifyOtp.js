//import liraries
import React, { useState, useRef, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButtons from '../../../components/Buttons/CustomButtons';
import apiClient from '../../../Service/apiClient';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../context/AppContext';

// create a component
const VerifyOtp = ({ navigation, route }) => {
  const { mobile } = route.params;  
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(59);

  const { dispatch } = useContext(AppContext);


  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#f3f3f3');
  });

  // Timer for Resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (code.join('').length === 4) {
      setIsLoading(true);
      const otpCode = code.join('');
      
      try {
        const response = await apiClient.post('/loginOtp', { mobile, otp: otpCode });
        setIsLoading(false);
  
        const { status, msg, data } = response.data;

        const token = response.data.data.token.token;
        const userid = response.data.data.userid;

        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', String(userid));
        await AsyncStorage.setItem('userNumber', String(mobile));
     
  
        if (status === 1 && msg === "OTP Verify") {
          navigation.replace('ShoppingMode', { mobile: mobile, userId: data.userid });
          dispatch({
            type: 'SET_USER',
            payload: {
              userId: data.userid,
              userNumber: mobile,
            },
          });

        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        setIsLoading(false);
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('Please enter the 4-digit verification code');
    }
  };
  
  const handleChange = (text, index) => {
    if (text.length > 1) text = text.slice(-1);
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    setError('');
  };

  const handleBackspace = (index) => {
    if (index > 0 && !code[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendOtp = () => {
    setTimer(59);
    setIsResendDisabled(true);
    setError('');
    // Resend OTP logic can go here
    apiClient
      .post('/resendOtp', { mobile })
      .then((response) => {
        if (response.data.status === 1) {
          setError('OTP resent successfully.');
        } else {
          setError('Failed to resend OTP. Please try again.');
        }
      })
      .catch(() => {
        setError('An error occurred while resending OTP.');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SignupOrLogin')}>
        <MaterialIcons name="arrow-back" size={22} style={styles.backButton} />
      </TouchableOpacity>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: rf(2.5), color: "#272727" }}>Verify OTP</Text>
        <Text style={{ marginTop: rh(1), color: "#717171" }}>
          Enter the OTP sent to your mobile number {mobile}.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={[
              styles.input,
              {
                borderColor: digit ? "#272727" : '#ddd',
                color: "black",
              },
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') handleBackspace(index);
            }}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <CustomButtons title="Verify" onPress={handleVerify} disabled={isLoading} loading={isLoading} />

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Text>Resend OTP in</Text>
        {isResendDisabled ? (
          <Text style={styles.reSendTime}> 00:{timer.toString().padStart(2, '0')}</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.reSendText}> Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

//make this component available to the app
export default VerifyOtp;

const styles = StyleSheet.create({
  backButton: {
    fontSize: rf(3),
    marginBottom: rh(1.5),
    marginTop: rh(2),
  },
  container: {
    padding: 20,
  },
  input: {
    height: rh(7),
    width: rw(14),
    borderWidth: 1,
    borderRadius: 5,
    fontSize: rf(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: rw(1),
  },
  inputContainer: {
    marginTop: rh(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: rh(1),
  },
  reSendTime: {
    color: "red",
    marginLeft: 5,
    fontWeight: "bold",
  },
  reSendText: {
    color: "blue",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
