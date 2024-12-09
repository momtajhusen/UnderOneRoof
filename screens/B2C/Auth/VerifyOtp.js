//import liraries
import React, {  useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButtons from '../../../components/Buttons/CustomButtons'; 
import apiClient from '../../../Service/apiClient';
import { useFocusEffect } from "@react-navigation/native";


// create a component
const VerifyOtp = ({navigation}) => {

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#f3f3f3');  ;  
  });

    const [code, setCode] = useState(['', '', '', '']);

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [timer, setTimer] = useState(10);

      const handleVerify = () => {
        navigation.navigate('ShoppingMode');
        if (code.join('').length === 4) {
          setIsLoading(true);
          const otpCode = code.join('');
          
          apiClient.post('/otp-verify', { otp: otpCode })
            .then(response => {
              setIsLoading(false);
    
              if (response.data.message === "OTP verified successfully") {
                navigation.navigate('EnterNewPassword', { email });
              } else {
                setError('Invalid verification code');
              }
            })
            .catch(error => {
              setIsLoading(false);
              setError('An error occurred, please try again');
            });
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

      

    return (
        <View style={styles.container}>
            <TouchableOpacity 
             onPress={()=> navigation.navigate('SignupOrLogin')}
            >
                <MaterialIcons 
                    name="arrow-back" 
                    size={22} 
                    style={styles.backButton}
                    />
            </TouchableOpacity>
            <View>
                <Text style={{fontWeight:"bold", fontSize:rf(2.5), color:"#272727"}}>Verify OTP</Text>
                <Text style={{marginTop:rh(1), color:"#717171"}}>Enter the OTP you received on your given mobile number.</Text>
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

            
          <CustomButtons title="Verify" onPress={handleVerify} loading={isLoading} />

          <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
             <Text>Resend OTP in</Text>
             <TouchableOpacity><Text style={styles.reSendTime}>00:59</Text></TouchableOpacity> 
          </View>

        </View>
    );
};


//make this component available to the app
export default VerifyOtp;

const styles = StyleSheet.create({
    backButton: {
       fontSize:rf(3),
       marginBottom:rh(1.5),
       marginTop:rh(2)
    },
    container: {
      padding:20
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
      inputContainer:{
        marginTop:rh(2),
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
      },
      reSendTime:{
        color:"red",
        marginLeft:5,
        fontWeight:"bold"
      }
  });
